'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  UserPlus, 
  Calendar,
  Calculator
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
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/utils';
import { Invoice, InvoiceItem, Customer, Product } from '@/types';
import { mockCustomers, mockProducts } from '@/data/mock-data';

interface InvoiceFormProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: Partial<Invoice>) => void;
}

export function InvoiceForm({ invoice, isOpen, onClose, onSave }: InvoiceFormProps) {
  const [formData, setFormData] = useState<Partial<Invoice>>(() => {
    if (invoice) return invoice;
    return {
      invoiceNo: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: '',
      customerName: '',
      date: new Date().toISOString().split('T')[0],
      deliveryDate: '',
      items: [],
      subtotal: 0,
      discount: 0,
      deliveryCharge: 0,
      tax: 0,
      totalAmount: 0,
      paidAmount: 0,
      dueAmount: 0,
      status: 'unpaid',
      note: ''
    };
  });

  // Remove the useEffect that was causing the lint error
  // useEffect(() => { ... }, [invoice, isOpen]);

  const calculateTotals = (items: InvoiceItem[], discount: number, delivery: number, tax: number, paid: number) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const total = subtotal - discount + delivery + tax;
    const due = total - paid;
    let status: Invoice['status'] = 'unpaid';
    if (paid >= total && total > 0) status = 'paid';
    else if (paid > 0) status = 'partial';

    setFormData(prev => ({
      ...prev,
      items,
      subtotal,
      totalAmount: total,
      dueAmount: due,
      status
    }));
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      productId: '',
      name: '',
      quantity: 1,
      price: 0,
      total: 0
    };
    const newItems = [...(formData.items || []), newItem];
    calculateTotals(newItems, formData.discount || 0, formData.deliveryCharge || 0, formData.tax || 0, formData.paidAmount || 0);
  };

  const removeItem = (index: number) => {
    const newItems = (formData.items || []).filter((_, i) => i !== index);
    calculateTotals(newItems, formData.discount || 0, formData.deliveryCharge || 0, formData.tax || 0, formData.paidAmount || 0);
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...(formData.items || [])];
    const item = { ...newItems[index] };
    
    if (field === 'productId') {
      const product = mockProducts.find(p => p.id === value);
      if (product) {
        item.productId = product.id;
        item.name = product.name;
        item.price = product.price;
      }
    } else {
      (item as any)[field] = value;
    }
    
    item.total = item.quantity * item.price;
    newItems[index] = item;
    calculateTotals(newItems, formData.discount || 0, formData.deliveryCharge || 0, formData.tax || 0, formData.paidAmount || 0);
  };

  const handleCustomerChange = (customerId: string | null) => {
    if (!customerId) return;
    const customer = mockCustomers.find(c => c.id === customerId);
    setFormData(prev => ({
      ...prev,
      customerId,
      customerName: customer?.name || ''
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0 gap-0 border-none shadow-2xl">
        <DialogHeader className="p-6 bg-gray-50 border-b border-gray-100 flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold font-display">
            {invoice ? 'Edit Invoice' : 'Create New Invoice'}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Invoice Number</Label>
              <Input value={formData.invoiceNo} readOnly className="bg-gray-50 font-bold" />
            </div>
            <div className="space-y-2">
              <Label>Customer</Label>
              <Select value={formData.customerId} onValueChange={handleCustomerChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Invoice Date</Label>
              <Input 
                type="date" 
                value={formData.date} 
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))} 
              />
            </div>
            <div className="space-y-2">
              <Label>Delivery Date</Label>
              <Input 
                type="date" 
                value={formData.deliveryDate} 
                onChange={(e) => setFormData(prev => ({ ...prev, deliveryDate: e.target.value }))} 
              />
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-sm font-bold text-gray-900">Invoice Items</h3>
              <Button type="button" variant="outline" size="sm" onClick={addItem} className="gap-2 text-orange-600 border-orange-200 hover:bg-orange-50">
                <Plus className="w-4 h-4" /> Add Item
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.items?.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-end bg-gray-50 p-3 rounded-lg border border-gray-100 group">
                  <div className="col-span-12 md:col-span-5 space-y-1.5">
                    <Label className="text-[10px] uppercase text-gray-400">Product / Service</Label>
                    <Select value={item.productId} onValueChange={(val) => updateItem(index, 'productId', val || '')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProducts.map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-4 md:col-span-2 space-y-1.5">
                    <Label className="text-[10px] uppercase text-gray-400">Quantity</Label>
                    <Input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)} 
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2 space-y-1.5">
                    <Label className="text-[10px] uppercase text-gray-400">Rate</Label>
                    <Input 
                      type="number" 
                      value={item.price} 
                      onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)} 
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2 space-y-1.5">
                    <Label className="text-[10px] uppercase text-gray-400">Total</Label>
                    <div className="h-9 flex items-center px-3 bg-white border rounded-md font-bold text-gray-900">
                      {formatCurrency(item.total)}
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-end pb-1">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeItem(index)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {formData.items?.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-xl border-gray-100 text-gray-400">
                  No items added yet. Click &quot;Add Item&quot; to start.
                </div>
              )}
            </div>
          </div>

          {/* Totals and Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <Label>Notes / Terms</Label>
              <Textarea 
                placeholder="Enter any special instructions or terms..." 
                className="min-h-[120px]"
                value={formData.note}
                onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
              />
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Discount</Label>
                  <Input 
                    type="number" 
                    value={formData.discount} 
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setFormData(prev => ({ ...prev, discount: val }));
                      calculateTotals(formData.items || [], val, formData.deliveryCharge || 0, formData.tax || 0, formData.paidAmount || 0);
                    }} 
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Delivery Charge</Label>
                  <Input 
                    type="number" 
                    value={formData.deliveryCharge} 
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setFormData(prev => ({ ...prev, deliveryCharge: val }));
                      calculateTotals(formData.items || [], formData.discount || 0, val, formData.tax || 0, formData.paidAmount || 0);
                    }} 
                  />
                </div>
              </div>
              
              <div className="space-y-3 pt-2 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatCurrency(formData.subtotal || 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Grand Total</span>
                  <span className="text-2xl font-bold text-orange-600">{formatCurrency(formData.totalAmount || 0)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-green-600">Paid Amount</Label>
                  <Input 
                    type="number" 
                    className="border-green-200 focus-visible:ring-green-500"
                    value={formData.paidAmount} 
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setFormData(prev => ({ ...prev, paidAmount: val }));
                      calculateTotals(formData.items || [], formData.discount || 0, formData.deliveryCharge || 0, formData.tax || 0, val);
                    }} 
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-red-600">Due Amount</Label>
                  <div className="h-9 flex items-center px-3 bg-red-50 border border-red-100 rounded-md font-bold text-red-600">
                    {formatCurrency(formData.dueAmount || 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={() => onSave(formData)}>
            <Save className="w-4 h-4" /> {invoice ? 'Update Invoice' : 'Save Invoice'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
