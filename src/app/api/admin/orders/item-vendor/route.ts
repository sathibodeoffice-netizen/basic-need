import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { orderId, itemId, vendor } = await req.json();

    if (!orderId || !itemId || !vendor) {
      return NextResponse.json({ message: 'Order ID, Item ID, and vendor are required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    const item = order.orderItems.id(itemId);
    if (!item) {
      return NextResponse.json({ message: 'Item not found in order' }, { status: 404 });
    }

    item.vendor = vendor;
    await order.save();

    return NextResponse.json({ message: 'Vendor updated successfully', order });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
