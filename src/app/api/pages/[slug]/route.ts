import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import PageContent from '@/models/PageContent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    await connectToDatabase();
    const pageContent = await PageContent.findOne({ slug });

    if (!pageContent) {
      return NextResponse.json({ content: null }, { status: 404 });
    }

    return NextResponse.json({ content: pageContent.content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = (await params).slug;
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const pageContent = await PageContent.findOneAndUpdate(
      { slug },
      { content },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, pageContent });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
