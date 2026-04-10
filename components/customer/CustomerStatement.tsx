'use client';

import React, { useState, useMemo } from 'react';
import { 
  Printer, 
  Download, 
  Search, 
  Calendar as CalendarIcon,
  Filter,
  FileText,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency, cn } from '@/lib/utils';
import { mockCustomerStatements } from '@/data/mock-data';
import { Customer, CustomerStatementEntry } from '@/types';
import { motion } from 'motion/react';

import { useCustomers } from '@/lib/context/CustomerContext';

export function CustomerStatement() {
  const { customers } = useCustomers();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const selectedCustomer = useMemo(() => {
    return customers.find(c => c.id === selectedCustomerId);
  }, [selectedCustomerId, customers]);

  const statementData = useMemo(() => {
    if (!selectedCustomerId || !selectedCustomer) return [];
    
    let filtered = mockCustomerStatements.filter(entry => entry.customerId === selectedCustomerId);
    
    // If the customer has an openingBalance and there's no explicit OB entry in mock data, 
    // we can prepend one. Or we can just use the customer's openingBalance as the starting point.
    // For simplicity, let's prepend an OB entry if the customer has an openingBalance > 0
    // and there isn't already an OB entry.
    const hasOBEntry = filtered.some(entry => entry.reference === 'OB');
    if (!hasOBEntry && selectedCustomer.openingBalance) {
      filtered = [
        {
          id: `ob-${selectedCustomer.id}`,
          customerId: selectedCustomer.id,
          date: selectedCustomer.createdAt || new Date().toISOString().split('T')[0],
          reference: 'OB',
          description: 'Initial Opening Balance',
          debit: selectedCustomer.openingBalance > 0 ? selectedCustomer.openingBalance : 0,
          credit: selectedCustomer.openingBalance < 0 ? Math.abs(selectedCustomer.openingBalance) : 0,
          balance: selectedCustomer.openingBalance
        },
        ...filtered
      ];
    }
    
    if (startDate) {
      filtered = filtered.filter(entry => entry.date >= startDate);
    }
    
    if (endDate) {
      filtered = filtered.filter(entry => entry.date <= endDate);
    }
    
    // Recalculate balances based on chronological order
    const sorted = filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let runningBalance = 0;
    return sorted.map(entry => {
      runningBalance = runningBalance + entry.debit - entry.credit;
      return { ...entry, balance: runningBalance };
    });
  }, [selectedCustomerId, selectedCustomer, startDate, endDate]);

  const summary = useMemo(() => {
    const totalDebit = statementData.reduce((sum, entry) => sum + entry.debit, 0);
    const totalCredit = statementData.reduce((sum, entry) => sum + entry.credit, 0);
    const openingBalance = statementData.length > 0 ? statementData[0].balance - statementData[0].debit + statementData[0].credit : 0;
    const closingBalance = statementData.length > 0 ? statementData[statementData.length - 1].balance : 0;

    return {
      totalDebit,
      totalCredit,
      openingBalance,
      closingBalance
    };
  }, [statementData]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6 border-none shadow-sm print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <Label>Select Customer</Label>
            <select 
              className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
            >
              <option value="">Choose a customer...</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>{customer.name} ({customer.phone})</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label>From Date</Label>
            <Input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>To Date</Label>
            <Input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-orange-500 hover:bg-orange-600 gap-2"
              disabled={!selectedCustomerId}
              onClick={handlePrint}
            >
              <Printer className="w-4 h-4" /> Print
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={() => {
                setSelectedCustomerId('');
                setStartDate('');
                setEndDate('');
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Statement View */}
      {selectedCustomer ? (
        <Card className="border-none shadow-sm overflow-hidden bg-white print:shadow-none print:border print:m-0">
          {/* Statement Header (Print only) */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900 font-display uppercase tracking-tight">Customer Statement</h1>
                <p className="text-sm text-gray-500">Aranya Furniture & Wood Ledger</p>
              </div>
              <div className="text-right space-y-1">
                <div className="text-lg font-bold text-orange-600">Aranya Furniture</div>
                <p className="text-xs text-gray-500">Mirpur, Dhaka, Bangladesh</p>
                <p className="text-xs text-gray-500">Phone: +880 1700-000000</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="space-y-3">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer Details</h3>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-gray-900">{selectedCustomer.name}</p>
                  <p className="text-sm text-gray-600">{selectedCustomer.address}</p>
                  <p className="text-sm text-gray-600">{selectedCustomer.area}, {selectedCustomer.district}</p>
                  <p className="text-sm text-gray-600">Phone: {selectedCustomer.phone}</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end space-y-2">
                <div className="flex gap-4 text-sm">
                  <span className="text-gray-500">Statement Period:</span>
                  <span className="font-bold text-gray-900">
                    {startDate || 'Beginning'} <ArrowRight className="inline w-3 h-3 mx-1" /> {endDate || 'Today'}
                  </span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-gray-500">Report Date:</span>
                  <span className="font-bold text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statement Summary Cards */}
          <div className="grid grid-cols-4 divide-x divide-gray-100 bg-gray-50/50 border-b border-gray-100">
            <div className="p-6 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Opening Balance</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(summary.openingBalance)}</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total Debit (Invoices)</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(summary.totalDebit)}</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Total Credit (Payments)</p>
              <p className="text-lg font-bold text-green-600">{formatCurrency(summary.totalCredit)}</p>
            </div>
            <div className="p-6 text-center bg-orange-50/30">
              <p className="text-[10px] font-bold text-orange-400 uppercase mb-1">Closing Balance</p>
              <p className="text-xl font-black text-orange-600">{formatCurrency(summary.closingBalance)}</p>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Debit (৳)</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Credit (৳)</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Balance (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {statementData.length > 0 ? (
                  statementData.map((entry, index) => (
                    <tr key={entry.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600">{entry.date}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{entry.reference}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{entry.description}</td>
                      <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                        {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-medium text-green-600">
                        {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-bold text-gray-900">
                        {formatCurrency(entry.balance)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">
                      No transactions found for the selected period.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50/50 font-bold border-t border-gray-200">
                  <td colSpan={3} className="px-6 py-4 text-sm text-gray-900 text-right">Period Totals</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900">{formatCurrency(summary.totalDebit)}</td>
                  <td className="px-6 py-4 text-sm text-right text-green-600">{formatCurrency(summary.totalCredit)}</td>
                  <td className="px-6 py-4 text-sm text-right text-orange-600">{formatCurrency(summary.closingBalance)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer (Print only) */}
          <div className="p-12 mt-8 hidden print:block">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <div className="w-48 border-t border-gray-300 pt-2 text-center text-xs text-gray-500">
                  Customer Signature
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-48 border-t border-gray-300 pt-2 text-center text-xs text-gray-500">
                  Authorized Signature
                </div>
              </div>
            </div>
            <div className="mt-12 text-center text-[10px] text-gray-400 italic">
              This is a computer-generated statement and does not require a physical signature.
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-20 flex flex-col items-center justify-center border-dashed border-2 border-gray-200 bg-gray-50/50">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No Customer Selected</h3>
          <p className="text-sm text-gray-500 mt-1">Please select a customer from the dropdown above to view their statement.</p>
        </Card>
      )}
    </div>
  );
}
