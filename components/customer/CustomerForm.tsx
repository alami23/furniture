'use client';

import React, { useState, useRef } from 'react';
import { 
  X, 
  Save, 
  Upload,
  Image as ImageIcon
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
import { Customer } from '@/types';
import Image from 'next/image';

interface CustomerFormProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Partial<Customer>) => void;
}

export function CustomerForm({ customer, isOpen, onClose, onSave }: CustomerFormProps) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(customer?.photo || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<Customer>>(() => {
    if (customer) return customer;
    return {
      id: `CUS-${Math.floor(1000 + Math.random() * 9000)}`,
      name: '',
      phone: '',
      fullAddress: '',
      openingBalance: 0,
      photo: '',
      // Keeping required fields for type compatibility
      address: '',
      area: '',
      district: '',
      totalOrders: 0,
      totalSpent: 0,
      dueAmount: 0,
      creditLimit: 0,
      lastOrderDate: '',
      createdAt: new Date().toISOString().split('T')[0],
    };
  });

  const handleChange = (field: keyof Customer, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, photo: 'Only image files are allowed' }));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        handleChange('photo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (formData.phone.length < 11) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (isNaN(Number(formData.openingBalance))) {
      newErrors.openingBalance = 'Opening Balance must be a number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 border-none shadow-2xl rounded-2xl overflow-hidden">
        <DialogHeader className="p-6 bg-gray-50 border-b border-gray-100 flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold font-display">
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="p-8 space-y-6">
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-700 font-semibold">Name <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="e.g. Rahim Traders" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`rounded-xl border-gray-200 h-11 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700 font-semibold">Phone <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="017XXXXXXXX" 
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`rounded-xl border-gray-200 h-11 ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Row 2: Full Address */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-semibold">Full Address</Label>
            <Textarea 
              placeholder="House, road, area, district..." 
              value={formData.fullAddress || formData.address}
              onChange={(e) => handleChange('fullAddress', e.target.value)}
              className="rounded-xl border-gray-200 min-h-[100px] resize-none"
            />
          </div>

          {/* Row 3: Opening Balance & Photo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-700 font-semibold">Initial Opening Balance (৳)</Label>
              <Input 
                type="number"
                placeholder="0" 
                value={formData.openingBalance === undefined ? '' : formData.openingBalance}
                onChange={(e) => handleChange('openingBalance', parseFloat(e.target.value) || 0)}
                className={`rounded-xl border-gray-200 h-11 ${errors.openingBalance ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.openingBalance && <p className="text-xs text-red-500 mt-1">{errors.openingBalance}</p>}
              <p className="text-xs text-gray-500 mt-1">Previous due or credit amount.</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-700 font-semibold">Upload Photo</Label>
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0"
                >
                  {photoPreview ? (
                    <Image src={photoPreview} alt="Preview" width={64} height={64} className="object-cover w-full h-full" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="rounded-xl border-gray-200 h-11 w-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" /> Choose Image
                  </Button>
                  {errors.photo && <p className="text-xs text-red-500 mt-1">{errors.photo}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose} className="rounded-xl h-11 px-6">Cancel</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 rounded-xl h-11 px-8 gap-2 shadow-lg shadow-orange-500/25" onClick={handleSave}>
            <Save className="w-4 h-4" /> {customer ? 'Update Customer' : 'Save Customer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
