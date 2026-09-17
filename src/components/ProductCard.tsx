'use client';

import React from 'react';
import Link from 'next/link';
import Button from './ui/Button';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    discountPrice?: number;
    image?: string;
    unit: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if clicking add inside a Link (though it's not inside Link here)
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image || '',
      quantity: 1,
    });
    // Optional: show a quick toast or alert, but the cart number updates automatically.
  };

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full group">
      <Link href={`/product/${product._id}`} className="block relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            Sale
          </div>
        )}
        {/* Placeholder for image */}
        <div className="text-gray-400 group-hover:scale-110 transition-transform duration-300">
          No Image
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product._id}`}>
          <h3 className="font-medium text-text-main hover:text-primary line-clamp-2 min-h-[40px] mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-text-light mb-3">{product.unit}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div>
            {hasDiscount ? (
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary">৳{product.discountPrice}</span>
                <span className="text-sm text-text-light line-through">৳{product.price}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-text-main">৳{product.price}</span>
            )}
          </div>
          <Button size="sm" className="px-3" onClick={handleAddToCart}>Add</Button>
        </div>
      </div>
    </div>
  );
}
