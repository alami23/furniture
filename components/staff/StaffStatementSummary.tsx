'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  PlusCircle, 
  MinusCircle,
  Clock
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { StaffStatementEntry } from '@/types';

interface StaffStatementSummaryProps {
  entries: StaffStatementEntry[];
}

export function StaffStatementSummary({ entries }: StaffStatementSummaryProps) {
  const summary = entries.reduce((acc, entry) => {
    acc.totalSalary += entry.amount;
    acc.totalDeductions += entry.deduction;
    acc.totalBonus += entry.bonus;
    acc.totalPaid += entry.paid;
    acc.totalDue += entry.due;
    return acc;
  }, {
    totalSalary: 0,
    totalDeductions: 0,
    totalBonus: 0,
    totalPaid: 0,
    totalDue: 0
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <Card className="p-6 border-none shadow-sm bg-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Gross Salary</p>
            <h3 className="text-lg font-black text-gray-900">{formatCurrency(summary.totalSalary)}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-none shadow-sm bg-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Bonus</p>
            <h3 className="text-lg font-black text-gray-900">{formatCurrency(summary.totalBonus)}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-none shadow-sm bg-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
            <MinusCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deductions</p>
            <h3 className="text-lg font-black text-gray-900">{formatCurrency(summary.totalDeductions)}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-none shadow-sm bg-orange-500 text-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Total Paid</p>
            <h3 className="text-lg font-black">{formatCurrency(summary.totalPaid)}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-none shadow-sm bg-white border-l-4 border-l-red-500">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Due</p>
            <h3 className="text-lg font-black text-red-600">{formatCurrency(summary.totalDue)}</h3>
          </div>
        </div>
      </Card>
    </div>
  );
}
