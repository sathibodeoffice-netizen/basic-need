import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET all orders for Admin
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// PUT to update order status
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ message: 'Order ID and status are required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    order.status = status;
    if (status === 'Delivered' && !order.isDelivered) {
      order.isDelivered = true;
      order.deliveredAt = new Date();
      if (!order.isPaid && order.paymentMethod === 'Cash on Delivery') {
        order.isPaid = true;
        order.paidAt = new Date();
      }
    }

    const updatedOrder = await order.save();
    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
