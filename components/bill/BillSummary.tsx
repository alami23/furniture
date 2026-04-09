'use client';

import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2,
  Receipt
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { mockBills } from '@/data/mock-data';

export function BillSummary() {
  const stats = useMemo(() => {
    const totalAmount = mockBills.reduce((sum, bill) => sum + bill.amount, 0);
    const totalPaid = mockBills.reduce((sum, bill) => sum + bill.paidAmount, 0);
    const totalDue = mockBills.reduce((sum, bill) => sum + bill.dueAmount, 0);
    const unpaidCount = mockBills.filter(bill => bill.status === 'unpaid').length;
    
    return {
      totalAmount,
      totalPaid,
      totalDue,
      unpaidCount
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="p-6 border-none shadow-sm bg-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Expenses</p>
            <h3 className="text-xl font-black text-gray-900">{formatCurrency(stats.totalAmount)}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-none shadow-sm bg-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Paid</p>
            <h3 className="text-xl font-black text-green-600">{formatCurrency(stats.totalPaid)}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-none shadow-sm bg-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Due</p>
            <h3 className="text-xl font-black text-red-600">{formatCurrency(stats.totalDue)}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-none shadow-sm bg-orange-500 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Unpaid Bills</p>
            <h3 className="text-xl font-black">{stats.unpaidCount} Bills</h3>
          </div>
        </div>
      </Card>
    </div>
  );
}
