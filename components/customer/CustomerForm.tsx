'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  UserPlus, 
  Phone, 
  Mail, 
  MapPin, 
  Globe,
  MessageCircle,
  MessageSquare
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

interface CustomerFormProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Partial<Customer>) => void;
}

export function CustomerForm({ customer, isOpen, onClose, onSave }: CustomerFormProps) {
  const [formData, setFormData] = useState<Partial<Customer>>(() => {
    if (customer) return customer;
    return {
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: '',
      phone: '',
      whatsapp: '',
      imo: '',
      email: '',
      address: '',
      area: '',
      district: '',
      totalOrders: 0,
      totalSpent: 0,
      dueAmount: 0,
      creditLimit: 50000,
      lastOrderDate: '',
      createdAt: new Date().toISOString().split('T')[0],
      notes: ''
    };
  });

  const handleChange = (field: keyof Customer, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-none shadow-2xl">
        <DialogHeader className="p-6 bg-gray-50 border-b border-gray-100 flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold font-display">
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name / Shop Name</Label>
              <Input 
                placeholder="e.g. Rahim Traders" 
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Customer ID</Label>
              <Input value={formData.id} readOnly className="bg-gray-50 font-bold" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" /> Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input 
                  placeholder="017XXXXXXXX" 
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-green-500" /> WhatsApp
                </Label>
                <Input 
                  placeholder="WhatsApp Number" 
                  value={formData.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-500" /> IMO
                </Label>
                <Input 
                  placeholder="IMO Number" 
                  value={formData.imo}
                  onChange={(e) => handleChange('imo', e.target.value)}
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <Label>Email Address</Label>
                <Input 
                  type="email" 
                  placeholder="customer@example.com" 
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" /> Location Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Area / Locality</Label>
                <Input 
                  placeholder="e.g. Mirpur 10" 
                  value={formData.area}
                  onChange={(e) => handleChange('area', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>District</Label>
                <Input 
                  placeholder="e.g. Dhaka" 
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Full Address</Label>
                <Textarea 
                  placeholder="House, Road, Block..." 
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-orange-500" /> Business Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Credit Limit (BDT)</Label>
                <Input 
                  type="number" 
                  value={formData.creditLimit}
                  onChange={(e) => handleChange('creditLimit', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Initial Due Balance (if any)</Label>
                <Input 
                  type="number" 
                  value={formData.dueAmount}
                  onChange={(e) => handleChange('dueAmount', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Notes</Label>
                <Textarea 
                  placeholder="Special preferences, payment behavior, etc." 
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={() => onSave(formData)}>
            <Save className="w-4 h-4" /> {customer ? 'Update Customer' : 'Save Customer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
