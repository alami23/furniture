'use client';

import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Tag,
  FileText,
  Activity
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Category, ProductType } from '@/types';

interface CategoryFormProps {
  category: Category | null;
  type: ProductType;
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Partial<Category>) => void;
}

export function CategoryForm({ category, type, isOpen, onClose, onSave }: CategoryFormProps) {
  const [formData, setFormData] = useState<Partial<Category>>(() => {
    if (category) return category;
    return {
      name: '',
      type: type,
      description: '',
      status: 'active',
      itemCount: 0
    };
  });

  const handleChange = (field: keyof Category, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-gray-50 border-b border-gray-100 flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold font-display flex items-center gap-2">
            <Tag className="w-5 h-5 text-orange-500" />
            {category ? 'Edit Category' : `Add New ${type === 'furniture' ? 'Furniture' : 'Wood'} Category`}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <Label>Category Name</Label>
            <Input 
              placeholder="e.g. Bed, Sofa, Teak Wood" 
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="status" 
                  value="active" 
                  checked={formData.status === 'active'}
                  onChange={() => handleChange('status', 'active')}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                />
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  formData.status === 'active' ? "text-orange-600" : "text-gray-500"
                )}>Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="status" 
                  value="inactive" 
                  checked={formData.status === 'inactive'}
                  onChange={() => handleChange('status', 'inactive')}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                />
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  formData.status === 'inactive' ? "text-orange-600" : "text-gray-500"
                )}>Inactive</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              placeholder="Briefly describe what items belong in this category..." 
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={() => onSave(formData)}>
            <Save className="w-4 h-4" /> {category ? 'Update Category' : 'Save Category'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper for cn in this file since it's used
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
