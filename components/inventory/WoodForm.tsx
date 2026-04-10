'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  TreePine
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { WoodItem, useWood } from '@/lib/context/WoodContext';

interface WoodFormProps {
  item: WoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Partial<WoodItem>) => void;
}

export function WoodForm({ item, isOpen, onClose, onSave }: WoodFormProps) {
  const { categories, carNos, tags } = useWood();
  
  const [formData, setFormData] = useState<Partial<WoodItem>>(() => {
    if (item) return item;
    return {
      category: '',
      carNo: '',
      tag: '',
      treeNo: '',
      width: 0,
      length: 0,
      cft: 0,
      buyPrice: 0,
      sellPrice: 0,
    };
  });

  // Update form data when item prop changes (for editing)
  useEffect(() => {
    if (isOpen) {
      if (item) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData(item);
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData({
          category: '',
          carNo: '',
          tag: '',
          treeNo: '',
          width: 0,
          length: 0,
          cft: 0,
          buyPrice: 0,
          sellPrice: 0,
        });
      }
    }
  }, [item, isOpen]);

  const handleChange = (field: keyof WoodItem, value: any) => {
    const updatedData = { ...formData, [field]: value };
    
    // Auto calculate CFT if dimensions change
    if (field === 'width' || field === 'length') {
      const w = field === 'width' ? parseFloat(value) || 0 : formData.width || 0;
      const l = field === 'length' ? parseFloat(value) || 0 : formData.length || 0;
      
      // CFT = (WIDTH * WIDTH * LENGTH) / 2304
      updatedData.cft = (w * w * l) / 2304;
    }
    
    // Auto update Sell Price if Tag changes
    if (field === 'tag') {
      const selectedTag = tags.find(t => t.code === value);
      if (selectedTag) {
        updatedData.sellPrice = selectedTag.price;
      }
    }

    // Auto update Tag if Sell Price changes
    if (field === 'sellPrice') {
      const matchingTag = tags.find(t => Number(t.price) === Number(value));
      if (matchingTag) {
        updatedData.tag = matchingTag.code;
      } else {
        updatedData.tag = 'Custom';
      }
    }
    
    setFormData(updatedData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[820px] w-[95vw] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <DialogHeader className="p-6 bg-gray-50 border-b border-gray-100 flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold font-display flex items-center gap-2">
            <TreePine className="w-5 h-5 text-orange-500" />
            {item ? 'Edit Wood Item' : 'Add New Wood Item'}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="p-6 md:p-8 space-y-6">
          {/* 1st Line: Category, Car No, Tag */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(val) => handleChange('category', val)}
              >
                <SelectTrigger className="w-full rounded-xl border-gray-200 h-11 [&>span]:truncate">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Car No</Label>
              <Select 
                value={formData.carNo} 
                onValueChange={(val) => handleChange('carNo', val)}
              >
                <SelectTrigger className="w-full rounded-xl border-gray-200 h-11 [&>span]:truncate">
                  <SelectValue placeholder="Select Car No" />
                </SelectTrigger>
                <SelectContent>
                  {carNos.map(car => (
                    <SelectItem key={car.id} value={car.number}>{car.number}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Tag</Label>
              <Select 
                value={formData.tag} 
                onValueChange={(val) => handleChange('tag', val)}
              >
                <SelectTrigger className="w-full rounded-xl border-gray-200 h-11 [&>span]:truncate">
                  <SelectValue placeholder="Select Tag" />
                </SelectTrigger>
                <SelectContent>
                  {tags.map(t => (
                    <SelectItem key={t.id} value={t.code}>
                      {t.code} - ৳{t.price}
                    </SelectItem>
                  ))}
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 2nd Line: Tree No, Width, Length */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Tree No</Label>
              <Input 
                placeholder="e.g. 101" 
                value={formData.treeNo || ''}
                onChange={(e) => handleChange('treeNo', e.target.value)}
                className="w-full rounded-xl border-gray-200 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Width (inches)</Label>
              <Input 
                type="number" 
                placeholder="0"
                value={formData.width || ''}
                onChange={(e) => handleChange('width', e.target.value)}
                className="w-full rounded-xl border-gray-200 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Length (feet)</Label>
              <Input 
                type="number" 
                placeholder="0"
                value={formData.length || ''}
                onChange={(e) => handleChange('length', e.target.value)}
                className="w-full rounded-xl border-gray-200 h-11"
              />
            </div>
          </div>

          {/* 3rd Line: CFT, Buy Price, Sell Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">CFT</Label>
              <Input 
                type="text" 
                value={formData.cft?.toFixed(5) || '0.00000'}
                readOnly
                className="w-full rounded-xl border-gray-200 h-11 bg-gray-50 font-bold text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Buy Price (৳)</Label>
              <Input 
                type="number" 
                placeholder="0"
                value={formData.buyPrice || ''}
                onChange={(e) => handleChange('buyPrice', parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border-gray-200 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Sell Price (৳)</Label>
              <Input 
                type="number" 
                placeholder="0"
                value={formData.sellPrice || ''}
                onChange={(e) => handleChange('sellPrice', parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border-gray-200 h-11"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100">
          <Button variant="outline" onClick={onClose} className="rounded-xl border-gray-200">Cancel</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 rounded-xl gap-2 text-white" onClick={() => onSave(formData)}>
            <Save className="w-4 h-4" /> {item ? 'Update Item' : 'Save Item'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
