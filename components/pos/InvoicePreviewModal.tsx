import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer, FileText, LayoutGrid, List, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  deliveryDate?: string;
  type: 'wood' | 'furniture';
  customer: {
    name: string;
    phone: string;
    address: string;
    previousDue?: number;
  };
  items: {
    id: string;
    name: string;
    description?: string;
    quantity: number;
    rate: number;
    amount: number;
    // Wood specific fields
    carNo?: string;
    treeNo?: string;
    size?: string;
    cft?: number;
  }[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paid: number;
  due: number;
  netDue?: number;
}

interface InvoicePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvoiceData | null;
  onPrintComplete?: () => void;
}

type FormatType = 'A4' | 'A5' | 'POS' | 'Chalan';

export function InvoicePreviewModal({ isOpen, onClose, data, onPrintComplete }: InvoicePreviewModalProps) {
  const [format, setFormat] = useState<FormatType>('POS');
  
  const handlePrint = () => {
    window.print();
    if (onPrintComplete) {
      onPrintComplete();
    }
  };

  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[100vw] w-screen h-screen flex flex-col p-0 overflow-hidden bg-white border-none shadow-none print:max-w-none print:h-auto print:bg-white print:p-0 rounded-none">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page {
              margin: 0;
              size: auto;
            }
            body {
              margin: 0;
              -webkit-print-color-adjust: exact;
            }
            .print-container {
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            ${format === 'POS' ? `
              @page {
                size: 80mm auto;
                margin: 0;
              }
              .pos-print {
                width: 80mm !important;
                padding: 4mm !important;
                margin: 0 auto !important;
              }
            ` : ''}
          }
        `}} />
        
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0 print:hidden">
          <div>
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">Invoice Preview</DialogTitle>
            <p className="text-sm text-slate-500 font-medium">Select format and print your invoice</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
              {(['A4', 'A5', 'POS', 'Chalan'] as FormatType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-black transition-all duration-200",
                    format === f 
                      ? "bg-[#E8751A] text-white shadow-lg shadow-orange-200" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                  )}
                >
                  {f === 'A4' && <FileText className="w-4 h-4" />}
                  {f === 'A5' && <FileText className="w-4 h-4" />}
                  {f === 'POS' && <LayoutGrid className="w-4 h-4" />}
                  {f === 'Chalan' && <List className="w-4 h-4" />}
                  {f} Size
                </button>
              ))}
            </div>
            <Button 
              onClick={handlePrint} 
              className="bg-slate-900 hover:bg-black text-white px-8 py-6 rounded-xl font-black text-base gap-3 shadow-xl transition-all active:scale-95"
            >
              <Printer className="w-5 h-5" /> Print Invoice
            </Button>
            <button 
              onClick={onClose} 
              className="p-3 hover:bg-slate-100 rounded-full transition-all active:rotate-90"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-12 bg-gray-50 print:bg-white print:p-0 print:overflow-visible">
          <div className={cn(
            "bg-white shadow-xl mx-auto print:shadow-none print:m-0 print-container",
            format === 'A4' && "w-[210mm] min-h-[297mm] p-12 print:w-full",
            format === 'A5' && "w-[148mm] min-h-[210mm] p-8 print:w-full",
            format === 'POS' && "w-[80mm] min-h-[100mm] p-4 pos-print print:w-[80mm]",
            format === 'Chalan' && "w-[210mm] min-h-[297mm] p-12 print:w-full"
          )}>
            {format === 'A4' && <A4Format data={data} />}
            {format === 'A5' && <A5Format data={data} />}
            {format === 'POS' && <POSFormat data={data} />}
            {format === 'Chalan' && <ChalanFormat data={data} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FormatButton({ active, onClick, icon, title, desc }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 p-3 rounded-xl border text-left transition-all",
        active 
          ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500" 
          : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
      )}
    >
      <div className={cn("mt-0.5", active ? "text-blue-600" : "text-gray-500")}>
        {icon}
      </div>
      <div>
        <div className={cn("font-medium", active ? "text-blue-900" : "text-gray-900")}>{title}</div>
        <div className={cn("text-xs", active ? "text-blue-600/80" : "text-gray-500")}>{desc}</div>
      </div>
    </button>
  );
}

function A4Format({ data }: { data: InvoiceData }) {
  return (
    <div className="text-gray-900 font-sans">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-black text-[#E8751A] mb-1">INVOICE</h1>
          <p className="text-gray-500 font-medium tracking-wider">#{data.invoiceNo}</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Furniture Business</h2>
          <p className="text-sm text-gray-500">123 Business Street, City, Country</p>
          <p className="text-sm text-gray-500">Phone: +880 1234 567890</p>
          <p className="text-sm text-gray-500">Email: contact@furniturebiz.com</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div className="bg-slate-50 p-6 rounded-2xl">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Customer Details</h3>
          <p className="text-lg font-bold text-gray-900 mb-1">{data.customer.name}</p>
          <p className="text-gray-600 mb-1">{data.customer.phone}</p>
          <p className="text-gray-600 leading-relaxed">{data.customer.address}</p>
        </div>
        <div className="flex flex-col justify-center items-end space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">Date:</span>
            <span className="text-lg font-bold">{data.date}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">Type:</span>
            <span className="text-lg font-bold capitalize">{data.type}</span>
          </div>
          {data.deliveryDate && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">Delivery:</span>
              <span className="text-lg font-bold">{data.deliveryDate}</span>
            </div>
          )}
        </div>
      </div>

      <table className="w-full mb-12">
        <thead>
          <tr className="border-b-2 border-gray-900">
            {data.type === 'wood' ? (
              <>
                <th className="py-4 text-left text-xs font-black uppercase tracking-widest">No</th>
                <th className="py-4 text-left text-xs font-black uppercase tracking-widest">Car</th>
                <th className="py-4 text-left text-xs font-black uppercase tracking-widest">Tree No</th>
                <th className="py-4 text-left text-xs font-black uppercase tracking-widest">Size (W-L)</th>
                <th className="py-4 text-center text-xs font-black uppercase tracking-widest">CFT</th>
                <th className="py-4 text-right text-xs font-black uppercase tracking-widest">Price</th>
                <th className="py-4 text-right text-xs font-black uppercase tracking-widest">Total</th>
              </>
            ) : (
              <>
                <th className="py-4 text-left text-xs font-black uppercase tracking-widest">Item</th>
                <th className="py-4 text-center text-xs font-black uppercase tracking-widest">Qty</th>
                <th className="py-4 text-right text-xs font-black uppercase tracking-widest">Rate</th>
                <th className="py-4 text-right text-xs font-black uppercase tracking-widest">Amount</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.items.map((item, i) => (
            <tr key={i}>
              {data.type === 'wood' ? (
                <>
                  <td className="py-4 text-sm font-medium text-slate-500">{i + 1}</td>
                  <td className="py-4 text-sm font-bold">{item.carNo || '-'}</td>
                  <td className="py-4 text-sm font-bold">{item.treeNo || '-'}</td>
                  <td className="py-4 text-sm font-bold">{item.size || '-'}</td>
                  <td className="py-4 text-center text-sm font-black">{item.cft || item.quantity}</td>
                  <td className="py-4 text-right text-sm font-bold">{formatCurrency(item.rate)}</td>
                  <td className="py-4 text-right text-sm font-black text-[#E8751A]">{formatCurrency(item.amount)}</td>
                </>
              ) : (
                <>
                  <td className="py-4">
                    <div className="font-bold text-gray-900">{item.name}</div>
                    {item.description && <div className="text-xs text-slate-500 mt-0.5">{item.description}</div>}
                  </td>
                  <td className="py-4 text-center text-sm font-black">{item.quantity}</td>
                  <td className="py-4 text-right text-sm font-bold">{formatCurrency(item.rate)}</td>
                  <td className="py-4 text-right text-sm font-black text-[#E8751A]">{formatCurrency(item.amount)}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-80 space-y-3">
          <div className="flex justify-between text-sm font-medium text-slate-500">
            <span>Previous Due</span>
            <span>{formatCurrency(data.customer.previousDue || 0)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-slate-500">
            <span>Current Due</span>
            <span>{formatCurrency(data.due)}</span>
          </div>
          <div className="flex justify-between font-black text-lg pt-3 border-t-2 border-slate-100">
            <span>Total Due</span>
            <span>{formatCurrency((data.customer.previousDue || 0) + data.due)}</span>
          </div>
          
          <div className="pt-6 space-y-2">
            <div className="flex justify-between text-sm font-medium text-slate-500">
              <span>Subtotal</span>
              <span>{formatCurrency(data.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm font-black uppercase tracking-wider">
              <span>Total Price</span>
              <span>{formatCurrency(data.subtotal)}</span>
            </div>
            <div className="flex justify-between font-black text-2xl pt-4 border-t-4 border-gray-900">
              <span>Grand Total</span>
              <span className="text-[#E8751A]">{formatCurrency(data.total + (data.customer.previousDue || 0))}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-emerald-600 pt-2">
              <span>Paid Amount</span>
              <span>{formatCurrency(data.paid)}</span>
            </div>
            <div className="flex justify-between font-black text-xl text-rose-600 pt-2 border-t border-slate-100">
              <span>Net Due</span>
              <span>{formatCurrency(data.due + (data.customer.previousDue || 0) - data.paid)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 pt-12 border-t-2 border-slate-100 flex justify-between items-end">
        <div className="max-w-md">
          <p className="text-lg font-black text-[#E8751A] mb-2 uppercase tracking-tight">Thank you for choosing Furniture Business!</p>
          <p className="text-sm text-slate-400 italic leading-relaxed">
            This is a computer generated invoice and does not require a physical signature.
          </p>
        </div>
        <div className="text-center">
          <div className="w-56 border-b-2 border-gray-900 mb-3"></div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Authorized Signature</p>
        </div>
      </div>
    </div>
  );
}

function A5Format({ data }: { data: InvoiceData }) {
  return (
    <div className="text-gray-900 font-sans text-[10px]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#E8751A] mb-0.5">INVOICE</h1>
          <p className="text-slate-500 font-bold tracking-wider text-[9px]">#{data.invoiceNo}</p>
        </div>
        <div className="text-right">
          <h2 className="text-base font-black text-gray-900 uppercase tracking-tight">Furniture Business</h2>
          <p className="text-[9px] text-slate-500">123 Business Street, City, Country</p>
          <p className="text-[9px] text-slate-500">Phone: +880 1234 567890</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-50 p-4 rounded-xl">
          <h3 className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2">Customer Details</h3>
          <p className="text-sm font-bold text-gray-900 mb-0.5">{data.customer.name}</p>
          <p className="text-slate-600 mb-0.5">{data.customer.phone}</p>
          <p className="text-slate-600 leading-tight line-clamp-2">{data.customer.address}</p>
        </div>
        <div className="flex flex-col justify-center items-end space-y-1.5">
          <div className="flex items-center gap-3">
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Date:</span>
            <span className="text-sm font-bold">{data.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Type:</span>
            <span className="text-sm font-bold capitalize">{data.type}</span>
          </div>
        </div>
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="border-b border-gray-900">
            {data.type === 'wood' ? (
              <>
                <th className="py-2 text-left text-[8px] font-black uppercase tracking-widest">No</th>
                <th className="py-2 text-left text-[8px] font-black uppercase tracking-widest">Car</th>
                <th className="py-2 text-left text-[8px] font-black uppercase tracking-widest">Tree</th>
                <th className="py-2 text-left text-[8px] font-black uppercase tracking-widest">Size</th>
                <th className="py-2 text-center text-[8px] font-black uppercase tracking-widest">CFT</th>
                <th className="py-2 text-right text-[8px] font-black uppercase tracking-widest">Price</th>
                <th className="py-2 text-right text-[8px] font-black uppercase tracking-widest">Total</th>
              </>
            ) : (
              <>
                <th className="py-2 text-left text-[8px] font-black uppercase tracking-widest">Item</th>
                <th className="py-2 text-center text-[8px] font-black uppercase tracking-widest">Qty</th>
                <th className="py-2 text-right text-[8px] font-black uppercase tracking-widest">Rate</th>
                <th className="py-2 text-right text-[8px] font-black uppercase tracking-widest">Amount</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.items.map((item, i) => (
            <tr key={i}>
              {data.type === 'wood' ? (
                <>
                  <td className="py-2 text-[9px] font-medium text-slate-500">{i + 1}</td>
                  <td className="py-2 text-[9px] font-bold">{item.carNo || '-'}</td>
                  <td className="py-2 text-[9px] font-bold">{item.treeNo || '-'}</td>
                  <td className="py-2 text-[9px] font-bold">{item.size || '-'}</td>
                  <td className="py-2 text-center text-[9px] font-black">{item.cft || item.quantity}</td>
                  <td className="py-2 text-right text-[9px] font-bold">{formatCurrency(item.rate)}</td>
                  <td className="py-2 text-right text-[9px] font-black text-[#E8751A]">{formatCurrency(item.amount)}</td>
                </>
              ) : (
                <>
                  <td className="py-2">
                    <div className="font-bold text-gray-900">{item.name}</div>
                    {item.description && <div className="text-[8px] text-slate-500 mt-0.5">{item.description}</div>}
                  </td>
                  <td className="py-2 text-center text-[9px] font-black">{item.quantity}</td>
                  <td className="py-2 text-right text-[9px] font-bold">{formatCurrency(item.rate)}</td>
                  <td className="py-2 text-right text-[9px] font-black text-[#E8751A]">{formatCurrency(item.amount)}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-56 space-y-2">
          <div className="flex justify-between text-[9px] font-medium text-slate-500">
            <span>Previous Due</span>
            <span>{formatCurrency(data.customer.previousDue || 0)}</span>
          </div>
          <div className="flex justify-between text-[9px] font-medium text-slate-500">
            <span>Current Due</span>
            <span>{formatCurrency(data.due)}</span>
          </div>
          <div className="flex justify-between font-black text-xs pt-2 border-t border-slate-100">
            <span>Total Due</span>
            <span>{formatCurrency((data.customer.previousDue || 0) + data.due)}</span>
          </div>
          
          <div className="pt-4 space-y-1.5">
            <div className="flex justify-between text-[9px] font-medium text-slate-500">
              <span>Subtotal</span>
              <span>{formatCurrency(data.subtotal)}</span>
            </div>
            <div className="flex justify-between font-black text-sm pt-2 border-t-2 border-gray-900">
              <span>Grand Total</span>
              <span className="text-[#E8751A]">{formatCurrency(data.total + (data.customer.previousDue || 0))}</span>
            </div>
            <div className="flex justify-between text-[9px] font-bold text-emerald-600 pt-1">
              <span>Paid Amount</span>
              <span>{formatCurrency(data.paid)}</span>
            </div>
            <div className="flex justify-between font-black text-xs text-rose-600 pt-1 border-t border-slate-100">
              <span>Net Due</span>
              <span>{formatCurrency(data.due + (data.customer.previousDue || 0) - data.paid)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-6 border-t border-slate-100 flex justify-between items-end">
        <div className="max-w-[200px]">
          <p className="text-xs font-black text-[#E8751A] mb-1 uppercase tracking-tight">Thank you!</p>
          <p className="text-[8px] text-slate-400 italic leading-tight">
            Computer generated invoice.
          </p>
        </div>
        <div className="text-center">
          <div className="w-32 border-b border-gray-900 mb-2"></div>
          <p className="text-[7px] font-black uppercase tracking-widest text-slate-400">Signature</p>
        </div>
      </div>
    </div>
  );
}

function POSFormat({ data }: { data: InvoiceData }) {
  return (
    <div className="text-gray-900 font-mono text-[11px] leading-tight pos-print bg-white p-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-black text-[#E8751A] uppercase tracking-wider mb-1">Furniture Business</h2>
        <p className="text-[10px] font-medium">123 Business Street, City, Country</p>
        <p className="text-[10px] font-medium">Phone: +880 1234 567890</p>
        <p className="text-[10px] font-medium">Email: contact@furniturebiz.com</p>
      </div>

      <div className="space-y-1 mb-4 text-[10px] border-b border-slate-100 pb-3">
        <div className="flex gap-2">
          <span className="font-bold text-slate-400 uppercase">Invoice ID:</span>
          <span className="font-bold">#{data.invoiceNo}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold text-slate-400 uppercase">Date:</span>
          <span className="font-bold">{data.date}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold text-slate-400 uppercase">Type:</span>
          <span className="font-bold capitalize">{data.type}</span>
        </div>
      </div>

      <div className="mb-4 text-[10px]">
        <h3 className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">Customer Details</h3>
        <p className="font-black text-gray-900 text-[12px]">{data.customer.name}</p>
        <p className="font-bold text-slate-600">{data.customer.phone}</p>
        {data.deliveryDate && <p className="font-bold text-slate-600 mt-1">Delivery Date: {data.deliveryDate}</p>}
      </div>

      <div className="border-t border-b border-dashed border-gray-300 py-3 mb-4">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="text-[9px] font-black uppercase tracking-tighter text-slate-400">
              <th className="text-left pb-2">No</th>
              <th className="text-left pb-2">Car</th>
              <th className="text-left pb-2">(Tree-W-L) = Size</th>
              <th className="text-right pb-2">Price</th>
              <th className="text-right pb-2">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dashed divide-gray-100">
            {data.items.map((item, i) => (
              <tr key={i}>
                <td className="py-2 align-top font-bold text-slate-400">{i + 1}</td>
                <td className="py-2 align-top font-bold">{item.carNo || '-'}</td>
                <td className="py-2 align-top font-bold">
                  {data.type === 'wood' ? (
                    <span>({item.treeNo || '-'}-{item.size || '-'}) = {item.cft || '0.00'}</span>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </td>
                <td className="py-2 text-right align-top font-bold">৳{item.rate.toLocaleString()}</td>
                <td className="py-2 text-right align-top font-black">৳{item.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-1.5 border-b border-dashed border-gray-300 pb-3 mb-3 text-[10px]">
        <div className="flex justify-between text-slate-500">
          <span>Prev. Due:</span>
          <span className="font-bold">৳{(data.customer.previousDue || 0).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Curr. Due:</span>
          <span className="font-bold">৳{data.due.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-black border-t border-dotted border-gray-300 pt-2 mt-1 text-[11px]">
          <span>Total Due:</span>
          <span>৳{((data.customer.previousDue || 0) + data.due).toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-2 text-[10px]">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span className="font-bold">৳{data.subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-[11px] font-black uppercase tracking-tight mt-2">
          <span>Total Price</span>
          <span>৳{data.subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Previous Due</span>
          <span className="font-bold">৳{(data.customer.previousDue || 0).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-[13px] font-black border-t-2 border-gray-900 pt-2 mt-2">
          <span>Grand Total</span>
          <span className="text-[#E8751A]">৳{(data.total + (data.customer.previousDue || 0)).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-emerald-600 font-bold text-[11px] pt-1">
          <span>Paid Amount</span>
          <span>৳{data.paid.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-rose-600 font-black text-[12px] pt-1 border-t border-slate-100">
          <span>Net Due</span>
          <span>৳{(data.due + (data.customer.previousDue || 0) - data.paid).toLocaleString()}</span>
        </div>
      </div>

      <div className="text-center mt-10 pt-6 border-t border-dashed border-gray-300">
        <p className="font-black text-[11px] text-[#E8751A] uppercase tracking-tight">Thank you for choosing Furniture Business!</p>
        <p className="mt-2 text-[9px] text-slate-400 italic leading-tight px-4">
          This is a computer generated invoice and does not require a physical signature.
        </p>
      </div>
    </div>
  );
}

function ChalanFormat({ data }: { data: InvoiceData }) {
  return (
    <div className="text-gray-900 font-sans">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-black text-[#E8751A] mb-1 uppercase tracking-tight">CHALAN</h1>
          <p className="text-slate-500 font-bold tracking-wider">#{data.invoiceNo}</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Furniture Business</h2>
          <p className="text-sm text-slate-500 font-medium">123 Business Street, City, Country</p>
          <p className="text-sm text-slate-500 font-medium">Phone: +880 1234 567890</p>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-3xl mb-12">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4">Delivery To</h3>
            <p className="text-xl font-black text-gray-900 mb-1">{data.customer.name}</p>
            <p className="text-lg font-bold text-slate-600 mb-2">{data.customer.phone}</p>
            <p className="text-slate-500 leading-relaxed font-medium">{data.customer.address}</p>
          </div>
          <div className="flex flex-col justify-center items-end space-y-4">
            <div className="flex items-center gap-6">
              <span className="text-xs text-slate-300 font-black uppercase tracking-widest">Date:</span>
              <span className="text-xl font-black">{data.date}</span>
            </div>
            {data.deliveryDate && (
              <div className="flex items-center gap-6">
                <span className="text-xs text-slate-300 font-black uppercase tracking-widest">Delivery:</span>
                <span className="text-xl font-black">{data.deliveryDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <table className="w-full mb-12">
        <thead>
          <tr className="border-b-4 border-gray-900">
            <th className="py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">S/N</th>
            <th className="py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">Item Description</th>
            {data.type === 'wood' && (
              <>
                <th className="py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">Car</th>
                <th className="py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">Tree</th>
                <th className="py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">Size</th>
              </>
            )}
            <th className="py-5 text-center text-xs font-black uppercase tracking-widest text-slate-400">Quantity/CFT</th>
            <th className="py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">Remarks</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-slate-50">
          {data.items.map((item, i) => (
            <tr key={i}>
              <td className="py-6 text-sm font-black text-slate-300">{i + 1}</td>
              <td className="py-6">
                <div className="text-lg font-black text-gray-900">{item.name}</div>
                {item.description && <div className="text-sm font-bold text-slate-400 mt-1">{item.description}</div>}
              </td>
              {data.type === 'wood' && (
                <>
                  <td className="py-6 text-base font-bold">{item.carNo || '-'}</td>
                  <td className="py-6 text-base font-bold">{item.treeNo || '-'}</td>
                  <td className="py-6 text-base font-bold">{item.size || '-'}</td>
                </>
              )}
              <td className="py-6 text-center text-xl font-black text-[#E8751A]">{item.cft || item.quantity}</td>
              <td className="py-6"></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-48 flex justify-between items-end">
        <div className="text-center">
          <div className="w-64 border-b-4 border-gray-900 mb-4"></div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Receiver&apos;s Signature & Date</p>
        </div>
        <div className="text-center">
          <div className="w-64 border-b-4 border-gray-900 mb-4"></div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Authorized Signature</p>
        </div>
      </div>
    </div>
  );
}
