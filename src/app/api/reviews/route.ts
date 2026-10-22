import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, authorName, rating, comment } = body;

    if (!productId || !authorName || !comment || !rating) {
      return NextResponse.json(
        { success: false, error: 'Please provide all review fields' },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        productId,
        authorName,
        rating: Number(rating),
        comment,
      },
    });

    // Update product rating and review count
    const allReviews = await prisma.review.findMany({
      where: { productId },
    });

    const avgRating =
      allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: parseFloat(avgRating.toFixed(1)),
        reviewCount: allReviews.length,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}

