import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, createSessionToken } from '@/lib/auth';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email, displayName, photoURL, uid } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required from Firebase auth' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists in database
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // Create user in database with generated random password
      const randomPass = crypto.randomBytes(16).toString('hex');
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          name: displayName || normalizedEmail.split('@')[0],
          avatar: photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName || 'User')}`,
          password: hashPassword(randomPass),
        },
      });
    } else {
      // Update avatar if not present
      if (!user.avatar && photoURL) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { avatar: photoURL },
        });
      }
    }

    // Create session token
    const token = createSessionToken(user.id);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };

    const response = NextResponse.json({
      success: true,
      user: safeUser,
      message: 'Firebase sync successful!',
    });

    response.cookies.set('subsphere_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Firebase sync error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Firebase sync failed' },
      { status: 500 }
    );
  }
}

