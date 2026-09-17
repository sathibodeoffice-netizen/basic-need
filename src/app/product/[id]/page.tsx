import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  await connectToDatabase();
  let product;
  
  try {
    product = await Product.findById(id).populate('category');
  } catch (e) {
    return notFound();
  }

  if (!product) {
    return notFound();
  }

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative">
                {hasDiscount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-md z-10">
                    Sale
                  </div>
                )}
                <div className="text-gray-400 text-xl">No Image Available</div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <div className="mb-2">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {product.category?.name || 'Uncategorized'}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-text-main mb-2">{product.name}</h1>
                {product.banglaName && (
                  <h2 className="text-xl text-text-light mb-4">{product.banglaName}</h2>
                )}

                <div className="text-sm text-text-light mb-6 flex gap-4">
                  <span>Unit: <span className="font-medium text-text-main">{product.unit}</span></span>
                  {product.sku && <span>SKU: <span className="font-medium text-text-main">{product.sku}</span></span>}
                  {product.brand && <span>Brand: <span className="font-medium text-text-main">{product.brand}</span></span>}
                </div>

                <div className="mb-8">
                  {hasDiscount ? (
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-primary">৳{product.discountPrice}</span>
                      <span className="text-xl text-text-light line-through">৳{product.price}</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-bold text-text-main">৳{product.price}</span>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-text-main mb-2">Description</h3>
                  <p className="text-text-light leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-medium ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      size="lg" 
                      className="flex-1"
                      disabled={product.stockQuantity <= 0}
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
