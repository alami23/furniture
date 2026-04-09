'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TransactionFilter } from '@/components/transactions/TransactionFilter';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { Button } from '@/components/ui/button';
import { History, Download, Plus, ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';
import { mockTransactions } from '@/data/mock-data';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [accountFilter, setAccountFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(tx => {
      const matchesSearch = tx.referenceNo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || tx.type === typeFilter || tx.referenceType === typeFilter;
      const matchesAccount = accountFilter === 'all' || tx.account === accountFilter;
      
      const txDate = new Date(tx.date);
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;
      
      const matchesDate = (!startDate || txDate >= startDate) && (!endDate || txDate <= endDate);
      
      return matchesSearch && matchesType && matchesAccount && matchesDate;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchQuery, typeFilter, accountFilter, dateRange]);

  const stats = useMemo(() => {
    const totalIncome = filteredTransactions
      .filter(tx => tx.type === 'income' && tx.status === 'completed')
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    const totalExpense = filteredTransactions
      .filter(tx => tx.type === 'expense' && tx.status === 'completed')
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
  }, [filteredTransactions]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight">Transactions</h1>
              <p className="text-gray-500 mt-1">Monitor all income and expense records across all accounts.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
              <Plus className="w-4 h-4" /> New Transaction
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-none shadow-sm bg-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                <ArrowDownLeft className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Income</p>
                <h3 className="text-xl font-black text-green-600">{formatCurrency(stats.totalIncome)}</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-none shadow-sm bg-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Expense</p>
                <h3 className="text-xl font-black text-red-600">{formatCurrency(stats.totalExpense)}</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-none shadow-sm bg-orange-500 text-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Net Balance</p>
                <h3 className="text-xl font-black">{formatCurrency(stats.balance)}</h3>
              </div>
            </div>
          </Card>
        </div>

        <TransactionFilter 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          accountFilter={accountFilter}
          onAccountChange={setAccountFilter}
          dateRange={dateRange}
          onDateChange={setDateRange}
        />

        <TransactionTable transactions={filteredTransactions} />
      </div>
    </DashboardLayout>
  );
}
