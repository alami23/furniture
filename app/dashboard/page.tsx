'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { SalesChart, CategoryPerformance } from '@/components/dashboard/Charts';
import { RecentInvoices, LowStockAlerts } from '@/components/dashboard/DashboardWidgets';
import { 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Users, 
  UserCog, 
  Receipt, 
  Package, 
  Truck,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Business Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back, here&apos;s what&apos;s happening with Aranya Furniture today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Card className="border-none shadow-sm bg-white px-4 py-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Receivable</p>
                <p className="text-sm font-bold">{formatCurrency(185000)}</p>
              </div>
            </Card>
            <Card className="border-none shadow-sm bg-white px-4 py-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <ArrowDownRight className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 leading-none">Payable</p>
                <p className="text-sm font-bold">{formatCurrency(42000)}</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Summary Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard 
            title="Total Sales" 
            value={formatCurrency(1245000)} 
            icon={TrendingUp} 
            trend={{ value: 12, isPositive: true }}
            colorClass="bg-orange-50"
            iconColorClass="text-orange-500"
          />
          <StatCard 
            title="Total Invoices" 
            value="142" 
            icon={FileText} 
            trend={{ value: 8, isPositive: true }}
            colorClass="bg-blue-50"
            iconColorClass="text-blue-500"
          />
          <StatCard 
            title="Paid Invoices" 
            value="98" 
            icon={CheckCircle2} 
            colorClass="bg-green-50"
            iconColorClass="text-green-500"
          />
          <StatCard 
            title="Unpaid Invoices" 
            value="24" 
            icon={AlertCircle} 
            colorClass="bg-red-50"
            iconColorClass="text-red-500"
          />
          <StatCard 
            title="Partial Invoices" 
            value="20" 
            icon={Clock} 
            colorClass="bg-yellow-50"
            iconColorClass="text-yellow-500"
          />
          <StatCard 
            title="Total Customers" 
            value="850" 
            icon={Users} 
            colorClass="bg-indigo-50"
            iconColorClass="text-indigo-500"
          />
          <StatCard 
            title="Total Staff" 
            value="24" 
            icon={UserCog} 
            colorClass="bg-purple-50"
            iconColorClass="text-purple-500"
          />
          <StatCard 
            title="Total Bills" 
            value={formatCurrency(85000)} 
            icon={Receipt} 
            colorClass="bg-pink-50"
            iconColorClass="text-pink-500"
          />
          <StatCard 
            title="Low Stock Items" 
            value="12" 
            icon={Package} 
            colorClass="bg-rose-50"
            iconColorClass="text-rose-500"
          />
          <StatCard 
            title="Pending Deliveries" 
            value="8" 
            icon={Truck} 
            colorClass="bg-cyan-50"
            iconColorClass="text-cyan-500"
          />
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <SalesChart />
          <CategoryPerformance />
          <RecentInvoices />
          <LowStockAlerts />
        </div>
      </div>
    </DashboardLayout>
  );
}
