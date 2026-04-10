'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CustomerList } from '@/components/customer/CustomerList';
import { CustomerForm } from '@/components/customer/CustomerForm';
import { CustomerProfile } from '@/components/customer/CustomerProfile';
import { Button } from '@/components/ui/button';
import { UserPlus, Download, Users } from 'lucide-react';
import { Customer } from '@/types';
import { useCustomers } from '@/lib/context/CustomerContext';

export default function CustomerPage() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const handleViewProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsProfileOpen(true);
  };

  const handleCreateCustomer = () => {
    setEditingCustomer(null);
    setIsFormOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsFormOpen(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      deleteCustomer(customer.id);
    }
  };

  const handleSaveCustomer = (customerData: Partial<Customer>) => {
    if (editingCustomer) {
      updateCustomer({ ...editingCustomer, ...customerData } as Customer);
    } else {
      addCustomer(customerData as Customer);
    }
    setIsFormOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight">Customers</h1>
              <p className="text-gray-500 mt-1">Manage your business clients, credit limits, and contact info.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={handleCreateCustomer}>
              <UserPlus className="w-4 h-4" /> Add Customer
            </Button>
          </div>
        </div>

        <CustomerList 
          customers={customers}
          onView={handleViewProfile}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
        />

        <CustomerProfile 
          key={selectedCustomer?.id || 'profile'}
          customer={selectedCustomer}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />

        <CustomerForm 
          key={editingCustomer?.id || 'form'}
          customer={editingCustomer}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveCustomer}
        />
      </div>
    </DashboardLayout>
  );
}
