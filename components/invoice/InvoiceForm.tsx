'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  UserPlus, 
  Calendar,
  Calculator,
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
      <DialogContent className="max-w-[100vw] w-screen h-screen flex flex-col p-0 overflow-hidden bg-white border-none shadow-none rounded-none">
        <DialogHeader className="p-4 lg:p-6 bg-white border-b border-gray-100 flex-row items-center justify-between space-y-0 shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold font-display tracking-tight">
                  {invoice ? 'Edit Invoice' : 'Create New Invoice'}
                </DialogTitle>
                <p className="text-sm text-gray-500 font-medium">#{formData.invoiceNo}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 pr-4">
            <Button variant="outline" className="gap-2 rounded-xl border-gray-200 hover:bg-gray-50" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2 rounded-xl shadow-lg shadow-orange-200" onClick={() => onSave(formData)}>
              <Save className="w-4 h-4" /> {invoice ? 'Update Invoice' : 'Save Invoice'}
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto bg-gray-50/50 p-4 lg:p-12">
          <div className="max-w-5xl mx-auto bg-white shadow-2xl shadow-gray-200/50 rounded-3xl overflow-hidden border border-gray-100">
            {/* Top Banner */}
            <div className="h-2 bg-orange-500 w-full" />
            
            <div className="p-8 lg:p-12 space-y-10">
              {/* Basic Info Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-orange-600">
                  <Calculator className="w-5 h-5" />
                  <h3 className="font-bold font-display text-lg">General Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Invoice Number</Label>
                    <Input value={formData.invoiceNo} readOnly className="bg-gray-50 font-bold border-gray-200 rounded-xl h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</Label>
                    <Select value={formData.customerId} onValueChange={handleCustomerChange}>
                      <SelectTrigger className="rounded-xl h-11 border-gray-200">
                        <SelectValue placeholder="Select Customer" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {mockCustomers.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Invoice Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <Input 
                        type="date" 
                        className="pl-10 rounded-xl h-11 border-gray-200"
                        value={formData.date} 
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Delivery Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <Input 
                        type="date" 
                        className="pl-10 rounded-xl h-11 border-gray-200"
                        value={formData.deliveryDate} 
                        onChange={(e) => setFormData(prev => ({ ...prev, deliveryDate: e.target.value }))} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2 text-orange-600">
                    <Plus className="w-5 h-5" />
                    <h3 className="font-bold font-display text-lg">Invoice Items</h3>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addItem} className="gap-2 text-orange-600 border-orange-200 hover:bg-orange-50 rounded-xl px-4">
                    <Plus className="w-4 h-4" /> Add New Item
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {formData.items?.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 items-end bg-gray-50/50 p-6 rounded-2xl border border-gray-100 group transition-all hover:bg-white hover:shadow-lg hover:shadow-gray-200/50">
                      <div className="col-span-12 lg:col-span-5 space-y-2">
                        <Label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Product / Service</Label>
                        <Select value={item.productId} onValueChange={(val) => updateItem(index, 'productId', val || '')}>
                          <SelectTrigger className="rounded-xl h-11 bg-white border-gray-200">
                            <SelectValue placeholder="Select Product" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {mockProducts.map(p => (
                              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-4 lg:col-span-2 space-y-2">
                        <Label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Quantity</Label>
                        <Input 
                          type="number" 
                          className="rounded-xl h-11 bg-white border-gray-200"
                          value={item.quantity} 
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)} 
                        />
                      </div>
                      <div className="col-span-4 lg:col-span-2 space-y-2">
                        <Label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Unit Price</Label>
                        <Input 
                          type="number" 
                          className="rounded-xl h-11 bg-white border-gray-200"
                          value={item.price} 
                          onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)} 
                        />
                      </div>
                      <div className="col-span-3 lg:col-span-2 space-y-2">
                        <Label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Total</Label>
                        <div className="h-11 flex items-center px-4 bg-white border border-gray-200 rounded-xl font-bold text-gray-900 shadow-sm">
                          {formatCurrency(item.total)}
                        </div>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeItem(index)}
                          className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl h-11 w-11"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {formData.items?.length === 0 && (
                    <div className="text-center py-16 border-2 border-dashed rounded-3xl border-gray-100 text-gray-400 bg-gray-50/30">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Plus className="w-8 h-8 text-gray-300" />
                      </div>
                      <p className="font-medium">No items added yet.</p>
                      <p className="text-sm">Click &quot;Add New Item&quot; to start building your invoice.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Totals and Notes Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <FileText className="w-5 h-5" />
                    <Label className="font-bold text-gray-900">Notes & Special Instructions</Label>
                  </div>
                  <Textarea 
                    placeholder="Enter any special instructions, terms, or notes for the customer..." 
                    className="min-h-[160px] rounded-2xl border-gray-200 p-4 resize-none focus:ring-orange-500"
                    value={formData.note}
                    onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                  />
                </div>
                
                <div className="bg-gray-900 rounded-[2rem] p-8 text-white shadow-2xl shadow-gray-300 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Discount</Label>
                      <Input 
                        type="number" 
                        className="bg-white/10 border-white/10 text-white rounded-xl h-11 focus:ring-orange-500"
                        value={formData.discount} 
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setFormData(prev => ({ ...prev, discount: val }));
                          calculateTotals(formData.items || [], val, formData.deliveryCharge || 0, formData.tax || 0, formData.paidAmount || 0);
                        }} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Delivery Charge</Label>
                      <Input 
                        type="number" 
                        className="bg-white/10 border-white/10 text-white rounded-xl h-11 focus:ring-orange-500"
                        value={formData.deliveryCharge} 
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setFormData(prev => ({ ...prev, deliveryCharge: val }));
                          calculateTotals(formData.items || [], formData.discount || 0, val, formData.tax || 0, formData.paidAmount || 0);
                        }} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Subtotal</span>
                      <span className="font-bold text-white">{formatCurrency(formData.subtotal || 0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-200">Grand Total</span>
                      <span className="text-4xl font-bold text-orange-400 font-display">{formatCurrency(formData.totalAmount || 0)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Paid Amount</Label>
                      <Input 
                        type="number" 
                        className="bg-green-500/10 border-green-500/20 text-green-400 rounded-xl h-11 focus:ring-green-500"
                        value={formData.paidAmount} 
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setFormData(prev => ({ ...prev, paidAmount: val }));
                          calculateTotals(formData.items || [], formData.discount || 0, formData.deliveryCharge || 0, formData.tax || 0, val);
                        }} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Balance Due</Label>
                      <div className="h-11 flex items-center px-4 bg-red-500/10 border border-red-500/20 rounded-xl font-bold text-red-400 shadow-inner">
                        {formatCurrency(formData.dueAmount || 0)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
