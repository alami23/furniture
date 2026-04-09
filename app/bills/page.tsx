'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BillList } from '@/components/bill/BillList';
import { BillForm } from '@/components/bill/BillForm';
import { BillSummary } from '@/components/bill/BillSummary';
import { Button } from '@/components/ui/button';
import { Plus, Download, Receipt } from 'lucide-react';
import { Bill } from '@/types';

export default function BillsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);

  const handleCreateBill = () => {
    setEditingBill(null);
    setIsFormOpen(true);
  };

  const handleEditBill = (bill: Bill) => {
    setEditingBill(bill);
    setIsFormOpen(true);
  };

  const handleDeleteBill = (bill: Bill) => {
    if (confirm(`Are you sure you want to delete bill ${bill.billNo}?`)) {
      console.log('Deleting bill:', bill.id);
    }
  };

  const handleToggleStatus = (bill: Bill) => {
    console.log('Toggling status for bill:', bill.id);
  };

  const handleSaveBill = (billData: Partial<Bill>) => {
    console.log('Saving bill:', billData);
    setIsFormOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight">Bills & Expenses</h1>
              <p className="text-gray-500 mt-1">Track your business overheads, material costs, and utility payments.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export Report
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={handleCreateBill}>
              <Plus className="w-4 h-4" /> Record Bill
            </Button>
          </div>
        </div>

        <BillSummary />

        <BillList 
          onEdit={handleEditBill}
          onDelete={handleDeleteBill}
          onToggleStatus={handleToggleStatus}
        />

        <BillForm 
          key={editingBill?.id || 'form'}
          bill={editingBill}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveBill}
        />
      </div>
    </DashboardLayout>
  );
}
