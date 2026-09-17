'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface EditablePageContentProps {
  slug: string;
  defaultHtmlContent: string;
}

export default function EditablePageContent({ slug, defaultHtmlContent }: EditablePageContentProps) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  const [content, setContent] = useState(defaultHtmlContent);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(defaultHtmlContent);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/pages/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.content) {
          setContent(data.content);
          setEditContent(data.content);
        }
      })
      .catch((err) => console.error('Failed to load page content:', err))
      .finally(() => setIsLoading(false));
  }, [slug]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/pages/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (res.ok) {
        setContent(editContent);
        setIsEditing(false);
      } else {
        alert('Failed to save content');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving content');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-64 rounded-xl w-full"></div>;
  }

  return (
    <div className="relative group">
      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-96 p-4 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="Enter HTML content..."
          />
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditContent(content);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-text-main"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="bg-surface p-8 rounded-xl border border-border shadow-sm space-y-6 text-text-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {isAdmin && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-accent-lime text-white text-sm font-semibold rounded-lg shadow hover:bg-primary transition-colors"
              >
                Edit Content
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
