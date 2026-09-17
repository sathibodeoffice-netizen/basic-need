import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = await req.json();

    if (orderItems && orderItems.length === 0) {
      return NextResponse.json({ message: 'No order items' }, { status: 400 });
    }

    await connectToDatabase();
    
    // Simulate payment validation for Bank/bKash mock
    const isPaid = paymentMethod !== 'Cash on Delivery';
    
    const order = new Order({
      orderItems,
      user: session.user.id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt: isPaid ? Date.now() : undefined,
    });

    const createdOrder = await order.save();

    return NextResponse.json(createdOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
