'use client';

import React from 'react';
import { 
  ArrowRightLeft, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Wallet,
  Calendar,
  Tag
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/utils';
import { mockTransactions } from '@/data/mock-data';

const monthlyTransactions = [
  { month: 'Jan', income: 45000, expense: 32000 },
  { month: 'Feb', income: 52000, expense: 38000 },
  { month: 'Mar', income: 48000, expense: 41000 },
  { month: 'Apr', income: 61000, expense: 45000 },
];

export function TransactionReportView() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-sm bg-green-50/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowUpCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-700 font-medium">Total Income</p>
            <h3 className="text-2xl font-bold text-green-900 mt-1">৳2,45,000</h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-red-50/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <ArrowDownCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-red-700 font-medium">Total Expense</p>
            <h3 className="text-2xl font-bold text-red-900 mt-1">৳1,12,000</h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-blue-50/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-blue-700 font-medium">Net Balance</p>
            <h3 className="text-2xl font-bold text-blue-900 mt-1">৳1,33,000</h3>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold font-display">Income vs Expense Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTransactions}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  tickFormatter={(value) => `৳${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value: any) => [`৳${Number(value).toLocaleString()}`]}
                />
                <Legend verticalAlign="top" align="right" height={36}/>
                <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Table */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold font-display">Transaction Log</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="font-bold">DATE</TableHead>
                <TableHead className="font-bold">TYPE</TableHead>
                <TableHead className="font-bold">CATEGORY</TableHead>
                <TableHead className="font-bold">ACCOUNT</TableHead>
                <TableHead className="font-bold text-right">AMOUNT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.slice(0, 8).map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-sm text-gray-500">{tx.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={cn(
                        "border-none",
                        tx.type === 'Income' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                      )}
                    >
                      {tx.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{tx.category}</TableCell>
                  <TableCell className="text-sm text-gray-500">{tx.account}</TableCell>
                  <TableCell className={cn(
                    "text-right font-bold",
                    tx.type === 'Income' ? "text-green-600" : "text-red-600"
                  )}>
                    {tx.type === 'Income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
