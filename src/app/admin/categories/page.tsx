'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Loader2 } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [banglaName, setBanglaName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, banglaName, slug }),
      });
      if (res.ok) {
        fetchCategories();
        setName('');
        setBanglaName('');
        setSlug('');
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
        <h1 className="text-2xl font-bold text-text-main">Categories</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Category Form */}
        <div className="lg:col-span-1 bg-surface p-6 rounded-lg border border-border shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name (English)"
              required
              value={name}
              onChange={handleNameChange}
              placeholder="e.g. Grocery"
            />
            <Input
              label="Name (Bangla)"
              value={banglaName}
              onChange={(e) => setBanglaName(e.target.value)}
              placeholder="e.g. মুদিখানা"
            />
            <Input
              label="Slug"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Add Category
            </Button>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-lg border border-border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Category List</h2>
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
                    <th className="py-3 px-4 font-semibold text-text-light">Bangla Name</th>
                    <th className="py-3 px-4 font-semibold text-text-light">Slug</th>
                    <th className="py-3 px-4 font-semibold text-text-light text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(categories) ? categories : []).map((category) => (
                    <tr key={category._id} className="border-b border-border hover:bg-black/5 dark:hover:bg-white/5">
                      <td className="py-3 px-4">{category.name}</td>
                      <td className="py-3 px-4">{category.banglaName || '-'}</td>
                      <td className="py-3 px-4">{category.slug}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm" className="text-primary mr-2">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                      </td>
                    </tr>
                  ))}
                  {categories.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-text-light">
                        No categories found.
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
