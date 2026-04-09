'use client';

import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Receipt,
  Calendar as CalendarIcon,
  User,
  Tag,
  DollarSign,
  FileText
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
import { Bill } from '@/types';

interface BillFormProps {
  bill: Bill | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (bill: Partial<Bill>) => void;
}

export function BillForm({ bill, isOpen, onClose, onSave }: BillFormProps) {
  const [formData, setFormData] = useState<Partial<Bill>>(() => {
    if (bill) return bill;
    return {
      billNo: `BILL-${Math.floor(5000 + Math.random() * 1000)}`,
      vendorName: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Miscellaneous',
      amount: 0,
      paidAmount: 0,
      dueAmount: 0,
      status: 'unpaid',
      notes: ''
    };
  });

  const categories = [
    'Rent', 'Salary', 'Electricity', 'Internet', 'Transport', 
    'Material Purchase', 'Maintenance', 'Marketing', 'Miscellaneous'
  ];

  const handleChange = (field: keyof Bill, value: any) => {
    const updatedData = { ...formData, [field]: value };
    
    // Auto calculate due amount
    if (field === 'amount' || field === 'paidAmount') {
      const amount = field === 'amount' ? parseFloat(value) || 0 : formData.amount || 0;
      const paid = field === 'paidAmount' ? parseFloat(value) || 0 : formData.paidAmount || 0;
      updatedData.dueAmount = Math.max(0, amount - paid);
      
      if (paid === 0) updatedData.status = 'unpaid';
      else if (paid >= amount) updatedData.status = 'paid';
      else updatedData.status = 'partial';
    }
    
    setFormData(updatedData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-gray-50 border-b border-gray-100 flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold font-display flex items-center gap-2">
            <Receipt className="w-5 h-5 text-orange-500" />
            {bill ? 'Edit Bill' : 'Record New Bill'}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Bill Number</Label>
              <Input 
                value={formData.billNo} 
                onChange={(e) => handleChange('billNo', e.target.value)}
                placeholder="e.g. BILL-5001"
              />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input 
                type="date" 
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Vendor / Payee Name</Label>
              <Input 
                placeholder="e.g. DESCO, Hardware Mart" 
                value={formData.vendorName}
                onChange={(e) => handleChange('vendorName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select 
                className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Total Amount (৳)</Label>
              <Input 
                type="number" 
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Paid Amount (৳)</Label>
              <Input 
                type="number" 
                value={formData.paidAmount}
                onChange={(e) => handleChange('paidAmount', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Due Amount (৳)</Label>
              <Input 
                type="number" 
                value={formData.dueAmount}
                readOnly
                className="bg-gray-50 font-bold text-red-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notes / Description</Label>
            <Textarea 
              placeholder="Add any additional details about this expense..." 
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={() => onSave(formData)}>
            <Save className="w-4 h-4" /> {bill ? 'Update Bill' : 'Save Bill'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
