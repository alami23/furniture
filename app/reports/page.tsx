'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Calendar,
  ChevronDown,
  TrendingUp,
  Users,
  Package,
  AlertTriangle,
  Receipt,
  CreditCard,
  ArrowRightLeft,
  DollarSign
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
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
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SalesReportView } from '@/components/reports/SalesReportView';
import { InventoryReportView } from '@/components/reports/InventoryReportView';
import { TransactionReportView } from '@/components/reports/TransactionReportView';
import { GenericReportView } from '@/components/reports/GenericReportView';

// Report Types
type ReportType = 
  | 'sales' 
  | 'invoice' 
  | 'due' 
  | 'customer' 
  | 'inventory' 
  | 'low-stock' 
  | 'bills' 
  | 'staff-payment' 
  | 'transaction';

export default function ReportsPage() {
  const [reportType, setReportType] = useState<ReportType>('sales');
  const [dateRange, setDateRange] = useState('month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const reportOptions = [
    { id: 'sales', label: 'Sales Report', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'invoice', label: 'Invoice Report', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'due', label: 'Due Report', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'customer', label: 'Customer Report', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'inventory', label: 'Inventory Report', icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'low-stock', label: 'Low Stock Report', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'bills', label: 'Bills Report', icon: Receipt, color: 'text-pink-600', bg: 'bg-pink-50' },
    { id: 'staff-payment', label: 'Staff Payment Report', icon: CreditCard, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { id: 'transaction', label: 'Transaction Report', icon: ArrowRightLeft, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const renderReport = () => {
    switch (reportType) {
      case 'sales':
        return <SalesReportView />;
      case 'inventory':
      case 'low-stock':
        return <InventoryReportView />;
      case 'transaction':
        return <TransactionReportView />;
      case 'invoice':
      case 'due':
      case 'customer':
      case 'bills':
      case 'staff-payment':
        return <GenericReportView type={reportType} />;
      default:
        return (
          <div className="p-12 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Report Ready</h3>
              <p className="text-gray-500 max-w-xs">Select a report type and period to view detailed analytics and data.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-gray-900">Business Reports</h1>
            <p className="text-gray-500 text-sm">Analyze your business performance and data</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-1.5 flex-1 min-w-[240px]">
                <label className="text-xs font-bold uppercase text-gray-400">Report Type</label>
                <Select value={reportType} onValueChange={(val) => setReportType(val as ReportType)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Report" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportOptions.map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        <div className="flex items-center gap-2">
                          <opt.icon className={cn("w-4 h-4", opt.color)} />
                          {opt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 w-[180px]">
                <label className="text-xs font-bold uppercase text-gray-400">Period</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {dateRange === 'custom' && (
                <>
                  <div className="space-y-1.5 w-[150px]">
                    <label className="text-xs font-bold uppercase text-gray-400">From</label>
                    <Input 
                      type="date" 
                      value={startDate} 
                      onChange={(e) => setStartDate(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-1.5 w-[150px]">
                    <label className="text-xs font-bold uppercase text-gray-400">To</label>
                    <Input 
                      type="date" 
                      value={endDate} 
                      onChange={(e) => setEndDate(e.target.value)} 
                    />
                  </div>
                </>
              )}

              <Button variant="secondary" className="bg-gray-100 hover:bg-gray-200">
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Content */}
        <div className="grid grid-cols-1 gap-6">
          {renderReport()}
        </div>
      </div>
    </DashboardLayout>
  );
}
