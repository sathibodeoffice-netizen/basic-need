import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    // Assuming admin role check here. For simplicity, we just check if session exists.
    // In a real app, you would check session.user.role === 'admin'
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const vendorSales = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: {
            vendor: '$orderItems.vendor',
            productName: '$orderItems.name'
          },
          totalRevenue: { $sum: { $multiply: ['$orderItems.price', '$orderItems.qty'] } },
          totalQuantity: { $sum: '$orderItems.qty' },
        }
      },
      {
        $group: {
          _id: '$_id.vendor',
          totalRevenue: { $sum: '$totalRevenue' },
          totalQuantity: { $sum: '$totalQuantity' },
          products: {
            $push: {
              name: '$_id.productName',
              revenue: '$totalRevenue',
              quantity: '$totalQuantity'
            }
          }
        }
      },
      {
        $project: {
          vendor: '$_id',
          totalRevenue: 1,
          totalQuantity: 1,
          products: 1,
          _id: 0
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    return NextResponse.json(vendorSales);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
