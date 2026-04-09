'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CategoryList } from '@/components/category/CategoryList';
import { CategoryForm } from '@/components/category/CategoryForm';
import { Button } from '@/components/ui/button';
import { Plus, Tag, LayoutGrid } from 'lucide-react';
import { Category } from '@/types';

export default function FurnitureCategoryPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    if (confirm(`Are you sure you want to delete category "${category.name}"?`)) {
      console.log('Deleting category:', category.id);
    }
  };

  const handleToggleStatus = (category: Category) => {
    console.log('Toggling status for category:', category.id);
  };

  const handleSaveCategory = (categoryData: Partial<Category>) => {
    console.log('Saving category:', categoryData);
    setIsFormOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight">Furniture Categories</h1>
              <p className="text-gray-500 mt-1">Organize your furniture products into logical groups for better management.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={handleCreateCategory}>
              <Plus className="w-4 h-4" /> Add Category
            </Button>
          </div>
        </div>

        <CategoryList 
          type="furniture"
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          onToggleStatus={handleToggleStatus}
        />

        <CategoryForm 
          key={editingCategory?.id || 'form'}
          category={editingCategory}
          type="furniture"
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveCategory}
        />
      </div>
    </DashboardLayout>
  );
}
