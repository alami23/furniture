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
      <DialogContent className="max-w-[100vw] w-screen h-screen flex flex-col p-0 overflow-hidden bg-white border-none shadow-none rounded-none">
        <DialogHeader className="p-4 lg:p-6 bg-white border-b border-gray-100 flex-row items-center justify-between space-y-0 shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold font-display tracking-tight">Invoice Details</DialogTitle>
                <p className="text-sm text-gray-500 font-medium">#{invoice.invoiceNo}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 pr-4">
            <Button variant="outline" className="gap-2 rounded-xl border-gray-200 hover:bg-gray-50" onClick={handlePrint}>
              <Printer className="w-4 h-4" /> Print
            </Button>
            <Button variant="outline" className="gap-2 rounded-xl border-gray-200 hover:bg-gray-50">
              <Download className="w-4 h-4" /> PDF
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2 rounded-xl shadow-lg shadow-orange-200" onClick={handlePrint}>
              <CreditCard className="w-4 h-4" /> Record Payment
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto bg-gray-50/50 p-4 lg:p-12">
          <div className="max-w-5xl mx-auto bg-white shadow-2xl shadow-gray-200/50 rounded-3xl overflow-hidden border border-gray-100" id="printable-invoice">
            {/* Top Banner */}
            <div className="h-2 bg-orange-500 w-full" />
            
            <div className="p-8 lg:p-16 space-y-12">
              {/* Header Info */}
              <div className="flex flex-col md:flex-row justify-between gap-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">A</div>
                    <div>
                      <h2 className="text-2xl font-bold font-display tracking-tight">Aranya Furniture & Wood</h2>
                      <p className="text-orange-500 font-semibold text-sm tracking-wider uppercase">Premium ERP Solutions</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <div className="flex items-start gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-900">Headquarters</p>
                        <p className="text-sm leading-relaxed">Plot 12, Block C, Main Road,<br />Banani, Dhaka-1213, Bangladesh</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                      <p className="text-sm font-medium">+880 1711-223344</p>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                      <p className="text-sm font-medium">billing@aranya.com</p>
                    </div>
                  </div>
                </div>

                <div className="text-left md:text-right space-y-6">
                  <div className="inline-block px-6 py-2 bg-orange-50 rounded-full border border-orange-100">
                    <p className="text-orange-600 font-bold text-sm tracking-wide uppercase">Invoice Status: {invoice.status.toUpperCase()}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Bill To</h3>
                      <div className="space-y-1">
                        <p className="font-bold text-3xl text-gray-900 leading-tight">{invoice.customerName}</p>
                        <p className="text-lg text-gray-600 font-medium">{customer?.phone || 'N/A'}</p>
                        <p className="text-gray-500 max-w-xs md:ml-auto">{customer?.address || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Meta Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-3xl border border-gray-100 overflow-hidden bg-gray-50/30">
                <div className="p-6 border-r border-b md:border-b-0 border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Invoice Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <p className="text-sm font-bold text-gray-900">{invoice.date}</p>
                  </div>
                </div>
                <div className="p-6 border-r border-b md:border-b-0 border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Delivery Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <p className="text-sm font-bold text-gray-900">{invoice.deliveryDate || 'Not Scheduled'}</p>
                  </div>
                </div>
                <div className="p-6 border-r border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Payment Method</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-orange-500" />
                    <p className="text-sm font-bold text-gray-900">Cash / Digital</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Reference No</p>
                  <p className="text-sm font-bold text-gray-900">REF-{invoice.id.slice(0, 8).toUpperCase()}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-bold text-gray-900 font-display">Order Summary</h3>
                  <Badge variant="outline" className="rounded-lg px-3 py-1 border-gray-200 text-gray-600 font-medium">
                    {invoice.items.length} Items Total
                  </Badge>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                        <th className="pb-6 pl-4">#</th>
                        <th className="pb-6">Item Description</th>
                        <th className="pb-6 text-center">Quantity</th>
                        <th className="pb-6 text-right">Unit Price</th>
                        <th className="pb-6 text-right pr-4">Total Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {invoice.items.map((item, idx) => (
                        <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                          <td className="py-6 pl-4 text-sm text-gray-400 font-medium">{idx + 1}</td>
                          <td className="py-6">
                            <p className="font-bold text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">Premium Quality Selection</p>
                          </td>
                          <td className="py-6 text-center">
                            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-bold text-gray-700">
                              {item.quantity}
                            </span>
                          </td>
                          <td className="py-6 text-right text-sm font-medium text-gray-600">{formatCurrency(item.price)}</td>
                          <td className="py-6 text-right pr-4 font-bold text-gray-900 text-base">{formatCurrency(item.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals Section */}
              <div className="flex flex-col md:flex-row justify-between gap-12 pt-8">
                <div className="flex-1 max-w-md">
                  {invoice.note && (
                    <div className="p-6 bg-orange-50/50 rounded-3xl border border-orange-100/50 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100/30 rounded-full -mr-8 -mt-8" />
                      <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-2">Special Instructions</p>
                      <p className="text-sm text-gray-700 leading-relaxed italic">&quot;{invoice.note}&quot;</p>
                    </div>
                  )}
                  
                  <div className="mt-8 p-6 rounded-3xl border border-gray-100 bg-gray-50/30">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Terms & Conditions</p>
                    <ul className="text-[10px] text-gray-500 space-y-2 list-disc pl-4">
                      <li>Goods once sold are not returnable.</li>
                      <li>Warranty valid only with original invoice.</li>
                      <li>Payment due within 15 days of invoice date.</li>
                    </ul>
                  </div>
                </div>

                <div className="w-full max-w-sm space-y-4">
                  <div className="space-y-3 px-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Subtotal</span>
                      <span className="font-bold text-gray-900">{formatCurrency(invoice.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Discount</span>
                      <span className="font-bold text-red-500">-{formatCurrency(invoice.discount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Delivery Charge</span>
                      <span className="font-bold text-gray-900">{formatCurrency(invoice.deliveryCharge)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Tax (0%)</span>
                      <span className="font-bold text-gray-900">{formatCurrency(invoice.tax)}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-gray-900 rounded-3xl text-white shadow-xl shadow-gray-200 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-400">Grand Total</span>
                      <span className="text-3xl font-bold font-display">{formatCurrency(invoice.totalAmount)}</span>
                    </div>
                    <div className="h-px bg-white/10 w-full" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-400">Amount Paid</span>
                      <span className="text-xl font-bold text-green-400">{formatCurrency(invoice.paidAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-2xl border border-red-500/20">
                      <span className="text-sm font-bold text-red-400">Balance Due</span>
                      <span className="text-xl font-bold text-red-400">{formatCurrency(invoice.dueAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-16 text-center space-y-4 border-t border-gray-100">
                <div className="flex justify-center gap-12">
                  <div className="text-center">
                    <div className="w-32 h-px bg-gray-200 mb-2 mx-auto" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer Signature</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-px bg-gray-200 mb-2 mx-auto" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Authorized By</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-900 italic pt-4">Thank you for choosing Aranya Furniture & Wood!</p>
                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                  <span>Computer Generated</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>Official Document</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span>{new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
