import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Category from '@/models/Category';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    await connectToDatabase();
    let categories = await Category.find({}).sort({ createdAt: -1 });
    
    // Auto-seed default categories if empty
    if (categories.length === 0) {
      const defaultCategories = [
        { name: 'Grocery', slug: 'grocery' },
        { name: 'Fresh Food', slug: 'fresh-food' },
        { name: 'Personal Care', slug: 'personal-care' },
        { name: 'Home & Cleaning', slug: 'home-cleaning' },
        { name: 'Baby Care', slug: 'baby-care' },
        { name: 'Emergency', slug: 'emergency' }
      ];
      await Category.insertMany(defaultCategories);
      categories = await Category.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { name, banglaName, slug, image } = await req.json();

    if (!name || !slug) {
      return NextResponse.json({ message: 'Name and slug are required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json({ message: 'Category with this slug already exists' }, { status: 409 });
    }

    const category = await Category.create({
      name,
      banglaName,
      slug,
      image,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
