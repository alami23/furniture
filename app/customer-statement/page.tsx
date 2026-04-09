'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CustomerStatement } from '@/components/customer/CustomerStatement';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CustomerStatementPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight">Customer Statement</h1>
              <p className="text-gray-500 mt-1">Generate and print detailed transaction ledgers for your clients.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export Excel
            </Button>
          </div>
        </div>

        <CustomerStatement />
      </div>
    </DashboardLayout>
  );
}
