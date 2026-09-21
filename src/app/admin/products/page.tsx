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
  const [stockQuantity, setStockQuantity] = useState('100');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // File states
  const [images, setImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);

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
      let uploadedImageUrls = [...images];
      let uploadedVideoUrl = videoUrl;

      // Upload images
      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach(file => formData.append('files', file));
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (res.ok) {
          const data = await res.json();
          uploadedImageUrls = [...uploadedImageUrls, ...data.urls];
        } else {
          const error = await res.json();
          throw new Error(error.message || 'Failed to upload images');
        }
      }

      // Upload video
      if (videoFile) {
        const formData = new FormData();
        formData.append('files', videoFile);
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (res.ok) {
          const data = await res.json();
          uploadedVideoUrl = data.urls[0];
        } else {
          const error = await res.json();
          throw new Error(error.message || 'Failed to upload video');
        }
      }

      const url = editId ? `/api/products/${editId}` : '/api/products';
      const method = editId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          price: Number(price), 
          category,
          description: description || 'No description provided.',
          stockQuantity: Number(stockQuantity) || 0,
          images: uploadedImageUrls,
          videoUrl: uploadedVideoUrl
        }),
      });

      if (res.ok) {
        setName('');
        setPrice('');
        setCategory('');
        setDescription('');
        setStockQuantity('100');
        setImages([]);
        setVideoUrl('');
        setImageFiles([]);
        setVideoFile(null);
        setEditId(null);
        fetchProducts();
      } else {
        const error = await res.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: any) => {
    setEditId(product._id);
    setName(product.name);
    setPrice(product.price.toString());
    setCategory(product.category?._id || product.category || '');
    setDescription(product.description || '');
    setStockQuantity(product.stockQuantity?.toString() || '100');
    setImages(product.images || []);
    setVideoUrl(product.videoUrl || '');
    setImageFiles([]);
    setVideoFile(null);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{editId ? 'Edit Product' : 'Add New Product'}</h2>
            {editId && (
              <Button variant="ghost" size="sm" onClick={() => {
                setEditId(null);
                setName('');
                setPrice('');
                setCategory('');
                setDescription('');
                setStockQuantity('100');
                setImages([]);
                setVideoUrl('');
                setImageFiles([]);
                setVideoFile(null);
              }}>
                Cancel Edit
              </Button>
            )}
          </div>
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
            <Input
              label="Stock Quantity"
              type="number"
              required
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
            <div className="w-full">
              <label className="block text-sm font-medium text-text-main mb-1">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setImageFiles(Array.from(e.target.files));
                  }
                }}
                className="flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {images.length > 0 && <p className="text-xs text-text-light mt-1">{images.length} existing image(s)</p>}
              {imageFiles.length > 0 && <p className="text-xs text-text-light mt-1">{imageFiles.length} new image(s) selected</p>}
            </div>
            
            <div className="w-full">
              <label className="block text-sm font-medium text-text-main mb-1">Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setVideoFile(e.target.files[0]);
                  } else {
                    setVideoFile(null);
                  }
                }}
                className="flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {videoUrl && <p className="text-xs text-text-light mt-1">Existing video: {videoUrl.split('/').pop()}</p>}
              {videoFile && <p className="text-xs text-text-light mt-1">New video selected: {videoFile.name}</p>}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-text-main mb-1">Description</label>
              <textarea
                className="flex w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              {editId ? 'Update Product' : 'Add Product'}
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
                  {(Array.isArray(products) ? products : []).map((product) => (
                    <tr key={product._id} className="border-b border-border hover:bg-black/5 dark:hover:bg-white/5">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.category?.name || '-'}</td>
                      <td className="py-3 px-4">৳{product.price}</td>
                      <td className="py-3 px-4">{product.stockQuantity}</td>
                      <td className="py-3 px-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary mr-2"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </Button>
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
