'use client';

import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard,
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
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { Invoice } from '@/types';
import { mockCustomers } from '@/data/mock-data';

interface InvoiceDetailsProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceDetails({ invoice, isOpen, onClose }: InvoiceDetailsProps) {
  if (!invoice) return null;

  const customer = mockCustomers.find(c => c.id === invoice.customerId);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-none shadow-2xl">
        <DialogHeader className="p-6 bg-gray-50 border-b border-gray-100 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold font-display">Invoice Details</DialogTitle>
              <p className="text-sm text-gray-500">#{invoice.invoiceNo}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 pr-8">
            <Button variant="outline" size="sm" className="gap-2" onClick={handlePrint}>
              <Printer className="w-4 h-4" /> Print
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> PDF
            </Button>
          </div>
        </DialogHeader>

        <div className="p-8 space-y-8" id="printable-invoice">
          {/* Header Info */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">From</h3>
                <div className="space-y-1">
                  <p className="font-bold text-lg">Aranya Furniture & Wood</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Dhaka, Bangladesh
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Phone className="w-3 h-3" /> +880 1711-223344
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> sales@aranya.com
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right space-y-4">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Bill To</h3>
                <div className="space-y-1">
                  <p className="font-bold text-lg text-orange-600">{invoice.customerName}</p>
                  <p className="text-sm text-gray-600">{customer?.address || 'N/A'}</p>
                  <p className="text-sm text-gray-600">{customer?.phone || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Meta */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div>
              <p className="text-[10px] font-bold text-orange-400 uppercase">Invoice Date</p>
              <p className="text-sm font-bold text-gray-900">{invoice.date}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-orange-400 uppercase">Delivery Date</p>
              <p className="text-sm font-bold text-gray-900">{invoice.deliveryDate || 'N/A'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-orange-400 uppercase">Payment Status</p>
              <div className="mt-1">
                {invoice.status === 'paid' && <Badge className="bg-green-500">Paid</Badge>}
                {invoice.status === 'partial' && <Badge className="bg-yellow-500">Partial</Badge>}
                {invoice.status === 'unpaid' && <Badge className="bg-red-500">Due</Badge>}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-orange-400 uppercase">Payment Method</p>
              <p className="text-sm font-bold text-gray-900">Cash / bKash</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2">Order Items</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-bold text-gray-400 uppercase">
                  <th className="pb-4">Item Description</th>
                  <th className="pb-4 text-center">Qty</th>
                  <th className="pb-4 text-right">Rate</th>
                  <th className="pb-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="text-sm">
                    <td className="py-4 font-medium text-gray-900">{item.name}</td>
                    <td className="py-4 text-center text-gray-600">{item.quantity}</td>
                    <td className="py-4 text-right text-gray-600">{formatCurrency(item.price)}</td>
                    <td className="py-4 text-right font-bold text-gray-900">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span className="text-red-500">-{formatCurrency(invoice.discount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Charge</span>
                <span className="font-medium">{formatCurrency(invoice.deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax (0%)</span>
                <span className="font-medium">{formatCurrency(invoice.tax)}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">Grand Total</span>
                <span className="text-xl font-bold text-orange-600">{formatCurrency(invoice.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-gray-500">Paid Amount</span>
                <span className="font-bold text-green-600">{formatCurrency(invoice.paidAmount)}</span>
              </div>
              <div className="flex justify-between text-sm bg-red-50 p-2 rounded-lg">
                <span className="text-red-600 font-bold">Due Amount</span>
                <span className="font-bold text-red-600">{formatCurrency(invoice.dueAmount)}</span>
              </div>
            </div>
          </div>

          {/* Note Section */}
          {invoice.note && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Note</p>
              <p className="text-sm text-gray-600 italic">{invoice.note}</p>
            </div>
          )}

          {/* Footer */}
          <div className="pt-12 text-center space-y-2 border-t border-dashed border-gray-200">
            <p className="text-sm font-bold text-gray-900 italic">Thank you for your business!</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">This is a computer generated invoice</p>
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={handlePrint}>
            <Printer className="w-4 h-4" /> Print Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
