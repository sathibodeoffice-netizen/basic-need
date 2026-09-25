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
      trxId,
    } = await req.json();

    if (orderItems && orderItems.length === 0) {
      return NextResponse.json({ message: 'No order items' }, { status: 400 });
    }

    await connectToDatabase();

    // Fetch products to get the current vendor for each item
    const Product = (await import('@/models/Product')).default;
    const enrichedOrderItems = await Promise.all(
      orderItems.map(async (item: any) => {
        const product = await Product.findById(item.product);
        return {
          ...item,
          vendor: product?.vendor || 'Other'
        };
      })
    );
    
    // Manual payment validation
    const isPaid = false; // Manual payments need admin verification
    
    const order = new Order({
      orderItems: enrichedOrderItems,
      user: session.user.id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paymentResult: trxId ? { id: trxId, status: 'Pending Verification' } : undefined,
    });

    const createdOrder = await order.save();

    return NextResponse.json(createdOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
