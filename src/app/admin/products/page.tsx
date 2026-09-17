'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Loader2 } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          price: Number(price), 
          category,
          description: description || 'No description provided.',
          stockQuantity: 100 // Default for now
        }),
      });
      if (res.ok) {
        fetchProducts();
        setName('');
        setPrice('');
        setCategory('');
        setDescription('');
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-main">Products</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Product Form */}
        <div className="lg:col-span-1 bg-surface p-6 rounded-lg border border-border shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="w-full">
              <label className="block text-sm font-medium text-text-main mb-1">Category</label>
              <select
                className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <Input
              label="Price (৳)"
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="w-full">
              <label className="block text-sm font-medium text-text-main mb-1">Description</label>
              <textarea
                className="flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Add Product
            </Button>
          </form>
        </div>

        {/* Products List */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Product List</h2>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="animate-spin text-primary w-8 h-8" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 font-semibold text-text-light">Name</th>
                    <th className="py-3 px-4 font-semibold text-text-light">Category</th>
                    <th className="py-3 px-4 font-semibold text-text-light">Price</th>
                    <th className="py-3 px-4 font-semibold text-text-light">Stock</th>
                    <th className="py-3 px-4 font-semibold text-text-light text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b border-border hover:bg-gray-50">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.category?.name || '-'}</td>
                      <td className="py-3 px-4">৳{product.price}</td>
                      <td className="py-3 px-4">{product.stockQuantity}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm" className="text-primary mr-2">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-text-light">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
