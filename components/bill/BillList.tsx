'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpDown
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/utils';
import { mockBills } from '@/data/mock-data';
import { Bill } from '@/types';
import { motion, AnimatePresence } from 'motion/react';

interface BillListProps {
  onEdit: (bill: Bill) => void;
  onDelete: (bill: Bill) => void;
  onToggleStatus: (bill: Bill) => void;
}

export function BillList({ onEdit, onDelete, onToggleStatus }: BillListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [
    'Rent', 'Salary', 'Electricity', 'Internet', 'Transport', 
    'Material Purchase', 'Maintenance', 'Marketing', 'Miscellaneous'
  ];

  const filteredBills = useMemo(() => {
    return mockBills.filter(bill => {
      const matchesSearch = 
        bill.billNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || bill.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, statusFilter, categoryFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Paid</Badge>;
      case 'partial':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">Partial</Badge>;
      case 'unpaid':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Unpaid</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4 border-none shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search by bill no or vendor..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select 
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <Button variant="outline" onClick={() => { setSearchQuery(''); setStatusFilter('all'); setCategoryFilter('all'); }}>
            Reset
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bill No & Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Vendor / Payee</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Amount (৳)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Paid / Due (৳)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredBills.map((bill) => (
                  <motion.tr 
                    key={bill.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">{bill.billNo}</div>
                      <div className="text-[10px] text-gray-400 uppercase">{bill.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{bill.vendorName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="text-[10px] font-medium uppercase border-gray-200">
                        {bill.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(bill.amount)}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-xs text-green-600 font-medium">P: {formatCurrency(bill.paidAmount)}</div>
                      <div className="text-xs text-red-600 font-medium">D: {formatCurrency(bill.dueAmount)}</div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(bill.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="gap-2" onClick={() => onToggleStatus(bill)}>
                            {bill.status === 'paid' ? (
                              <><XCircle className="w-4 h-4 text-red-500" /> Mark as Unpaid</>
                            ) : (
                              <><CheckCircle2 className="w-4 h-4 text-green-500" /> Mark as Paid</>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2" onClick={() => onEdit(bill)}>
                            <Edit className="w-4 h-4" /> Edit Bill
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-red-600" onClick={() => onDelete(bill)}>
                            <Trash2 className="w-4 h-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
