'use client';

import React, { useState } from 'react';
import { 
  X, 
  Save, 
  TreePine,
  Ruler,
  Tag,
  Layers,
  Info,
  Truck
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
import { WoodInventoryItem } from '@/types';

interface WoodFormProps {
  item: WoodInventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Partial<WoodInventoryItem>) => void;
}

export function WoodForm({ item, isOpen, onClose, onSave }: WoodFormProps) {
  const [formData, setFormData] = useState<Partial<WoodInventoryItem>>(() => {
    if (item) return item;
    return {
      itemNo: `W-${Math.floor(100 + Math.random() * 900)}`,
      carNo: '',
      treeNo: '',
      woodType: '',
      width: 0,
      length: 0,
      thickness: 0,
      cft: 0,
      unit: 'cft',
      stockQty: 0,
      purchaseRate: 0,
      saleRate: 0,
      category: 'Log',
      notes: ''
    };
  });

  const handleChange = (field: keyof WoodInventoryItem, value: any) => {
    const updatedData = { ...formData, [field]: value };
    
    // Auto calculate CFT if dimensions change
    if (['width', 'length', 'thickness'].includes(field)) {
      const w = field === 'width' ? parseFloat(value) || 0 : formData.width || 0;
      const l = field === 'length' ? parseFloat(value) || 0 : formData.length || 0;
      const t = field === 'thickness' ? parseFloat(value) || 0 : formData.thickness || 0;
      
      // Basic CFT calculation: (Width" * Length' * Thickness") / 144
      // Note: This is a simplified version, real wood calculation might vary
      updatedData.cft = parseFloat(((w * l * t) / 144).toFixed(2));
    }
    
    setFormData(updatedData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-gray-50 border-b border-gray-100 flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold font-display flex items-center gap-2">
            <TreePine className="w-5 h-5 text-orange-500" />
            {item ? 'Edit Wood Item' : 'Add New Wood Item'}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Tracking Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Item Number</Label>
              <Input 
                placeholder="e.g. W-101" 
                value={formData.itemNo}
                onChange={(e) => handleChange('itemNo', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-gray-400" /> Car Number
              </Label>
              <Input 
                placeholder="e.g. D-101" 
                value={formData.carNo}
                onChange={(e) => handleChange('carNo', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Tree Number</Label>
              <Input 
                placeholder="e.g. T-505" 
                value={formData.treeNo}
                onChange={(e) => handleChange('treeNo', e.target.value)}
              />
            </div>
          </div>

          {/* Classification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Wood Type</Label>
              <Input 
                placeholder="e.g. Burma Teak, Mahogany" 
                value={formData.woodType}
                onChange={(e) => handleChange('woodType', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select 
                className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="Log">Log</option>
                <option value="Plank">Plank</option>
                <option value="Slab">Slab</option>
                <option value="Plywood">Plywood</option>
                <option value="MDF">MDF</option>
              </select>
            </div>
          </div>

          {/* Dimensions */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-orange-500" /> Dimensions & CFT
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label>Width (inches)</Label>
                <Input 
                  type="number" 
                  value={formData.width}
                  onChange={(e) => handleChange('width', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Length (feet)</Label>
                <Input 
                  type="number" 
                  value={formData.length}
                  onChange={(e) => handleChange('length', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Thickness (inches)</Label>
                <Input 
                  type="number" 
                  value={formData.thickness}
                  onChange={(e) => handleChange('thickness', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Total CFT</Label>
                <Input 
                  type="number" 
                  value={formData.cft}
                  readOnly
                  className="bg-gray-50 font-bold text-orange-600"
                />
              </div>
            </div>
          </div>

          {/* Inventory & Pricing */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-orange-500" /> Inventory & Pricing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label>Stock Qty</Label>
                <Input 
                  type="number" 
                  value={formData.stockQty}
                  onChange={(e) => handleChange('stockQty', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Input 
                  value={formData.unit}
                  onChange={(e) => handleChange('unit', e.target.value)}
                  placeholder="e.g. cft, sft, pcs"
                />
              </div>
              <div className="space-y-2">
                <Label>Purchase Rate (৳)</Label>
                <Input 
                  type="number" 
                  value={formData.purchaseRate}
                  onChange={(e) => handleChange('purchaseRate', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Sale Rate (৳)</Label>
                <Input 
                  type="number" 
                  value={formData.saleRate}
                  onChange={(e) => handleChange('saleRate', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-2">
            <Label>Notes / Supplier Reference</Label>
            <Textarea 
              placeholder="Add any additional details or supplier info..." 
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={() => onSave(formData)}>
            <Save className="w-4 h-4" /> {item ? 'Update Item' : 'Save Item'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
