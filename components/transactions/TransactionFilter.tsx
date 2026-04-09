'use client';

import React from 'react';
import { Search, Filter, Calendar, CreditCard, ArrowUpDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface TransactionFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  typeFilter: string;
  onTypeChange: (type: string) => void;
  accountFilter: string;
  onAccountChange: (account: string) => void;
  dateRange: { start: string; end: string };
  onDateChange: (range: { start: string; end: string }) => void;
}

export function TransactionFilter({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeChange,
  accountFilter,
  onAccountChange,
  dateRange,
  onDateChange
}: TransactionFilterProps) {
  return (
    <Card className="p-6 border-none shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Search className="w-3 h-3" /> Search Reference
          </Label>
          <Input 
            placeholder="e.g. INV-1001, PAY-102..." 
            className="bg-gray-50 border-gray-200"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <ArrowUpDown className="w-3 h-3" /> Transaction Type
          </Label>
          <select 
            className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={typeFilter}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="Sale">Sale</option>
            <option value="Customer Payment">Customer Payment</option>
            <option value="Bill Payment">Bill Payment</option>
            <option value="Salary Payment">Salary Payment</option>
            <option value="Purchase">Purchase</option>
            <option value="Adjustment">Adjustment</option>
            <option value="Expense">Other Expense</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-3 h-3" /> Account
          </Label>
          <select 
            className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={accountFilter}
            onChange={(e) => onAccountChange(e.target.value)}
          >
            <option value="all">All Accounts</option>
            <option value="Cash Account">Cash Account</option>
            <option value="City Bank">City Bank</option>
            <option value="bKash Merchant">bKash Merchant</option>
            <option value="Nagad Personal">Nagad Personal</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-3 h-3" /> Date Range
          </Label>
          <div className="flex items-center gap-2">
            <Input 
              type="date" 
              className="bg-gray-50 border-gray-200 text-xs"
              value={dateRange.start}
              onChange={(e) => onDateChange({ ...dateRange, start: e.target.value })}
            />
            <span className="text-gray-400">-</span>
            <Input 
              type="date" 
              className="bg-gray-50 border-gray-200 text-xs"
              value={dateRange.end}
              onChange={(e) => onDateChange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-gray-500 hover:text-orange-600"
          onClick={() => {
            onSearchChange('');
            onTypeChange('all');
            onAccountChange('all');
            onDateChange({ start: '', end: '' });
          }}
        >
          Clear All Filters
        </Button>
      </div>
    </Card>
  );
}
