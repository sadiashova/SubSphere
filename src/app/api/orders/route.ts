import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      city,
      paymentMethod,
      items,
      discountAmount = 0,
    } = body;

    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !items?.length) {
      return NextResponse.json(
        { success: false, error: 'Missing required checkout information.' },
        { status: 400 }
      );
    }

    // Calculate total amount
    let total = 0;
    for (const item of items) {
      const price = item.isSubscribed ? item.product.subscriptionPrice : item.product.price;
      total += price * item.quantity;
    }
    const finalAmount = Math.max(0, total - discountAmount);
    const orderNumber = `SUB-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: userId || null,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city: city || 'Dhaka',
        totalAmount: finalAmount,
        discountAmount,
        paymentMethod: paymentMethod || 'cash_on_delivery',
        paymentStatus: paymentMethod === 'card' ? 'PAID' : 'PENDING',
        orderStatus: 'PROCESSING',
        items: {
          create: items.map((item: any) => ({
            productId: item.product.id,
            isSubscribed: item.isSubscribed || false,
            frequency: item.selectedPlan || item.product.frequency || 'Monthly',
            quantity: item.quantity,
            unitPrice: item.isSubscribed ? item.product.subscriptionPrice : item.product.price,
            subtotal: (item.isSubscribed ? item.product.subscriptionPrice : item.product.price) * item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    // If any items are subscriptions, automatically create Subscription records
    for (const item of items) {
      if (item.isSubscribed) {
        const nextBilling = new Date();
        nextBilling.setMonth(nextBilling.getMonth() + 1);

        await prisma.subscription.create({
          data: {
            userId: userId || null,
            productId: item.product.id,
            plan: item.selectedPlan || 'MONTHLY',
            status: 'ACTIVE',
            price: item.product.subscriptionPrice,
            address: shippingAddress,
            customerName,
            customerEmail,
            nextBilling,
          },
        });
      }
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const where: any = {};
    if (email) {
      where.customerEmail = email;
    }

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

