'use client';

import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Package,
  Image as ImageIcon,
  Tag,
  Layers,
  Info
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
import { Product } from '@/types';

interface FurnitureFormProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
}

export function FurnitureForm({ product, isOpen, onClose, onSave }: FurnitureFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>(() => {
    if (product) return product;
    return {
      sku: `FUR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: '',
      category: '',
      subCategory: '',
      type: 'furniture',
      material: '',
      color: '',
      size: '',
      price: 0,
      cost: 0,
      stock: 0,
      unit: 'pcs',
      reorderLevel: 2,
      status: 'in-stock',
      note: ''
    };
  });

  const handleChange = (field: keyof Product, value: any) => {
    const updatedData = { ...formData, [field]: value };
    
    // Auto update status based on stock and reorder level
    if (field === 'stock' || field === 'reorderLevel') {
      const stock = field === 'stock' ? parseInt(value) || 0 : formData.stock || 0;
      const reorder = field === 'reorderLevel' ? parseInt(value) || 0 : formData.reorderLevel || 0;
      
      if (stock === 0) updatedData.status = 'out-of-stock';
      else if (stock <= reorder) updatedData.status = 'low-stock';
      else updatedData.status = 'in-stock';
    }
    
    setFormData(updatedData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-gray-50 border-b border-gray-100 flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold font-display flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-500" />
            {product ? 'Edit Furniture Item' : 'Add New Furniture'}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input 
                placeholder="e.g. Royal King Size Bed" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>SKU / Product ID</Label>
              <Input 
                value={formData.sku} 
                onChange={(e) => handleChange('sku', e.target.value)}
                placeholder="FUR-XXX-000"
              />
            </div>
          </div>

          {/* Categorization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Category</Label>
              <Input 
                placeholder="e.g. Bed, Living, Dining" 
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Sub-Category</Label>
              <Input 
                placeholder="e.g. Luxury, Sofa Set" 
                value={formData.subCategory}
                onChange={(e) => handleChange('subCategory', e.target.value)}
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-500" /> Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Material</Label>
                <Input 
                  placeholder="e.g. Teak Wood" 
                  value={formData.material}
                  onChange={(e) => handleChange('material', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <Input 
                  placeholder="e.g. Antique Polish" 
                  value={formData.color}
                  onChange={(e) => handleChange('color', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Size</Label>
                <Input 
                  placeholder="e.g. 6ft x 7ft" 
                  value={formData.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-orange-500" /> Inventory & Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label>Selling Price (৳)</Label>
                <Input 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Cost Price (৳)</Label>
                <Input 
                  type="number" 
                  value={formData.cost}
                  onChange={(e) => handleChange('cost', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Stock Qty</Label>
                <Input 
                  type="number" 
                  value={formData.stock}
                  onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Reorder Level</Label>
                <Input 
                  type="number" 
                  value={formData.reorderLevel}
                  onChange={(e) => handleChange('reorderLevel', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea 
              placeholder="Add any additional details about this product..." 
              value={formData.note}
              onChange={(e) => handleChange('note', e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={() => onSave(formData)}>
            <Save className="w-4 h-4" /> {product ? 'Update Item' : 'Save Item'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
