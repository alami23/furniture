'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { InvoiceList } from '@/components/invoice/InvoiceList';
import { InvoiceDetails } from '@/components/invoice/InvoiceDetails';
import { InvoiceForm } from '@/components/invoice/InvoiceForm';
import { Button } from '@/components/ui/button';
import { Plus, Download, Filter } from 'lucide-react';
import { Invoice } from '@/types';
import { mockInvoices } from '@/data/mock-data';

export default function InvoicePage() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDetailsOpen(true);
  };

  const handleCreateInvoice = () => {
    setEditingInvoice(null);
    setIsFormOpen(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setIsFormOpen(true);
  };

  const handleSaveInvoice = (invoiceData: Partial<Invoice>) => {
    console.log('Saving invoice:', invoiceData);
    // In a real app, this would call an API
    setIsFormOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Invoices</h1>
            <p className="text-gray-500 mt-1">Manage billing, payments, and customer invoices.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={handleCreateInvoice}>
              <Plus className="w-4 h-4" /> Create Invoice
            </Button>
          </div>
        </div>

        <InvoiceList 
          onView={handleViewDetails} 
          onEdit={handleEditInvoice} 
        />

        <InvoiceDetails 
          key={selectedInvoice?.id || 'details'}
          invoice={selectedInvoice} 
          isOpen={isDetailsOpen} 
          onClose={() => setIsDetailsOpen(false)} 
        />

        <InvoiceForm 
          key={editingInvoice?.id || 'form'}
          invoice={editingInvoice} 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSaveInvoice}
        />
      </div>
    </DashboardLayout>
  );
}
