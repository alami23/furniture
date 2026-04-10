'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Printer, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/utils';
import { mockInvoices, mockCustomers } from '@/data/mock-data';
import { Invoice } from '@/types';
import { motion, AnimatePresence } from 'motion/react';

interface InvoiceListProps {
  onView: (invoice: Invoice) => void;
  onEdit: (invoice: Invoice) => void;
}

export function InvoiceList({ onView, onEdit }: InvoiceListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [customerFilter, setCustomerFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  
  const filteredInvoices = useMemo(() => {
    return mockInvoices.filter(invoice => {
      const matchesSearch = invoice.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
      const matchesCustomer = customerFilter === 'all' || invoice.customerId === customerFilter;
      const matchesDate = !dateFilter || invoice.date === dateFilter;
      
      return matchesSearch && matchesStatus && matchesCustomer && matchesDate;
    });
  }, [searchQuery, statusFilter, customerFilter, dateFilter]);

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Paid</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none">Partial</Badge>;
      case 'unpaid':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Due</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Filters Card */}
      <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-[2rem] overflow-hidden">
        <CardContent className="p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-6">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input 
                placeholder="Search invoice number or customer..." 
                className="pl-12 h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={customerFilter} onValueChange={(val) => setCustomerFilter(val || 'all')}>
              <SelectTrigger className="w-[220px] h-12 rounded-2xl border-gray-100 bg-gray-50/50">
                <SelectValue placeholder="Filter by Customer" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">All Customers</SelectItem>
                {mockCustomers.map(customer => (
                  <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || 'all')}>
              <SelectTrigger className="w-[160px] h-12 rounded-2xl border-gray-100 bg-gray-50/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="unpaid">Due</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input 
                type="date" 
                className="pl-12 h-12 w-[200px] rounded-2xl border-gray-100 bg-gray-50/50"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <Button variant="ghost" className="h-12 px-6 rounded-2xl text-gray-500 hover:text-orange-600 hover:bg-orange-50" onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setCustomerFilter('all');
              setDateFilter('');
            }}>
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-[2rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Invoice No</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Date & Delivery</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Customer</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Total Amount</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Paid</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Balance Due</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredInvoices.map((invoice) => (
                  <motion.tr 
                    key={invoice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="hover:bg-gray-50/50 transition-all group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 font-bold text-xs">#</div>
                        <span className="font-bold text-gray-900 tracking-tight">{invoice.invoiceNo}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-gray-900">{invoice.date}</div>
                      {invoice.deliveryDate && (
                        <div className="flex items-center gap-1.5 text-[10px] text-orange-500 font-bold mt-1 uppercase tracking-wider">
                          <Clock className="w-3 h-3" /> {invoice.deliveryDate}
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-gray-900">{invoice.customerName}</div>
                      <div className="text-[10px] text-gray-400 font-medium mt-0.5">Premium Client</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-base font-bold text-gray-900">{formatCurrency(invoice.totalAmount)}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
                        {formatCurrency(invoice.paidAmount)}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={cn(
                        "text-sm font-bold px-3 py-1 rounded-full inline-block",
                        invoice.dueAmount > 0 ? "text-red-600 bg-red-50" : "text-gray-400 bg-gray-50"
                      )}>
                        {formatCurrency(invoice.dueAmount)}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-white hover:shadow-md transition-all">
                            <MoreHorizontal className="w-5 h-5 text-gray-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-2xl border-gray-100">
                          <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer" onClick={() => onView(invoice)}>
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                              <Eye className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer" onClick={() => onEdit(invoice)}>
                            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
                              <Edit className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">Edit Invoice</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer" onClick={() => onView(invoice)}>
                            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                              <Printer className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">Print Invoice</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-2" />
                          <DropdownMenuItem className="gap-3 p-3 rounded-xl cursor-pointer text-red-600 hover:bg-red-50">
                            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </div>
                            <span className="font-bold text-sm">Delete Permanent</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 text-gray-300">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-10 h-10" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-bold text-gray-400">No invoices found</p>
                        <p className="text-sm">Try adjusting your search or filters to find what you&apos;re looking for.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
