'use client';

import React from 'react';
import { 
  FileText, 
  AlertTriangle, 
  Users, 
  Receipt, 
  CreditCard,
  TrendingUp,
  DollarSign
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
  LineChart,
  Line
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
import { mockInvoices, mockBills, mockCustomers, mockStaff } from '@/data/mock-data';

interface GenericReportViewProps {
  type: string;
}

export function GenericReportView({ type }: GenericReportViewProps) {
  const getReportConfig = () => {
    switch (type) {
      case 'invoice':
        return {
          title: 'Invoice Report',
          icon: FileText,
          color: 'text-purple-600',
          bg: 'bg-purple-50',
          stats: [
            { label: 'Total Invoices', value: mockInvoices.length, icon: FileText },
            { label: 'Paid Invoices', value: mockInvoices.filter(i => i.status === 'paid').length, icon: TrendingUp },
            { label: 'Unpaid Invoices', value: mockInvoices.filter(i => i.status === 'unpaid').length, icon: AlertTriangle },
            { label: 'Total Revenue', value: '৳' + mockInvoices.reduce((s, i) => s + i.totalAmount, 0).toLocaleString(), icon: DollarSign },
          ],
          data: mockInvoices.slice(0, 10),
          columns: ['INVOICE NO', 'CUSTOMER', 'DATE', 'AMOUNT', 'STATUS']
        };
      case 'due':
        const dueInvoices = mockInvoices.filter(i => i.dueAmount > 0);
        return {
          title: 'Due Report',
          icon: AlertTriangle,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
          stats: [
            { label: 'Total Due Amount', value: '৳' + dueInvoices.reduce((s, i) => s + i.dueAmount, 0).toLocaleString(), icon: DollarSign },
            { label: 'Due Invoices', value: dueInvoices.length, icon: FileText },
            { label: 'Overdue (>30 days)', value: '3', icon: AlertTriangle },
            { label: 'Collection Rate', value: '82%', icon: TrendingUp },
          ],
          data: dueInvoices,
          columns: ['INVOICE NO', 'CUSTOMER', 'DUE DATE', 'DUE AMOUNT', 'STATUS']
        };
      case 'customer':
        return {
          title: 'Customer Report',
          icon: Users,
          color: 'text-green-600',
          bg: 'bg-green-50',
          stats: [
            { label: 'Total Customers', value: mockCustomers.length, icon: Users },
            { label: 'Active Customers', value: '45', icon: TrendingUp },
            { label: 'New This Month', value: '8', icon: Users },
            { label: 'Avg. Lifetime Value', value: '৳45,000', icon: DollarSign },
          ],
          data: mockCustomers.slice(0, 10),
          columns: ['NAME', 'PHONE', 'ADDRESS', 'TOTAL ORDERS', 'BALANCE']
        };
      case 'bills':
        return {
          title: 'Bills Report',
          icon: Receipt,
          color: 'text-pink-600',
          bg: 'bg-pink-50',
          stats: [
            { label: 'Total Bills', value: mockBills.length, icon: Receipt },
            { label: 'Paid Bills', value: mockBills.filter(b => b.status === 'paid').length, icon: TrendingUp },
            { label: 'Pending Bills', value: mockBills.filter(b => b.status === 'unpaid').length, icon: AlertTriangle },
            { label: 'Total Payable', value: '৳' + mockBills.reduce((s, b) => s + b.dueAmount, 0).toLocaleString(), icon: DollarSign },
          ],
          data: mockBills.slice(0, 10),
          columns: ['BILL NO', 'VENDOR', 'DATE', 'AMOUNT', 'STATUS']
        };
      case 'staff-payment':
        return {
          title: 'Staff Payment Report',
          icon: CreditCard,
          color: 'text-cyan-600',
          bg: 'bg-cyan-50',
          stats: [
            { label: 'Total Staff', value: mockStaff.length, icon: Users },
            { label: 'Monthly Payroll', value: '৳1,50,000', icon: DollarSign },
            { label: 'Advance Payments', value: '৳12,000', icon: CreditCard },
            { label: 'Pending Salaries', value: '৳45,000', icon: AlertTriangle },
          ],
          data: mockStaff.slice(0, 10),
          columns: ['NAME', 'DESIGNATION', 'SALARY', 'JOIN DATE', 'STATUS']
        };
      default:
        return null;
    }
  };

  const config = getReportConfig();
  if (!config) return null;

  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {config.stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", config.bg)}>
                  <stat.icon className={cn("w-5 h-5", config.color)} />
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold font-display">{config.title} Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={config.color.includes('blue') ? '#3b82f6' : config.color.includes('purple') ? '#8b5cf6' : '#10b981'} 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold font-display">{config.title} Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                {config.columns.map(col => (
                  <TableHead key={col} className="font-bold">{col}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {config.data.map((item: any, idx: number) => (
                <TableRow key={idx}>
                  {type === 'invoice' && (
                    <>
                      <TableCell className="font-medium">{item.invoiceNo}</TableCell>
                      <TableCell>{item.customerName}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="font-bold">{formatCurrency(item.totalAmount)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("border-none", item.status === 'paid' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
                          {item.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                    </>
                  )}
                  {type === 'due' && (
                    <>
                      <TableCell className="font-medium">{item.invoiceNo}</TableCell>
                      <TableCell>{item.customerName}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="font-bold text-red-600">{formatCurrency(item.dueAmount)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-none">
                          DUE
                        </Badge>
                      </TableCell>
                    </>
                  )}
                  {type === 'customer' && (
                    <>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell className="font-bold">৳0</TableCell>
                    </>
                  )}
                  {type === 'bills' && (
                    <>
                      <TableCell className="font-medium">{item.billNo}</TableCell>
                      <TableCell>{item.vendorName}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="font-bold">{formatCurrency(item.amount)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("border-none", item.status === 'paid' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
                          {item.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                    </>
                  )}
                  {type === 'staff-payment' && (
                    <>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.designation}</TableCell>
                      <TableCell className="font-bold">{formatCurrency(item.salary)}</TableCell>
                      <TableCell>{item.joinDate}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-50 text-green-700 border-none">
                          ACTIVE
                        </Badge>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
