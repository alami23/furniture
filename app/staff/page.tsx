'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StaffList } from '@/components/staff/StaffList';
import { StaffForm } from '@/components/staff/StaffForm';
import { StaffDetails } from '@/components/staff/StaffDetails';
import { Button } from '@/components/ui/button';
import { Plus, UserCog, Download } from 'lucide-react';
import { Staff } from '@/types';

export default function StaffPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const handleCreateStaff = () => {
    setSelectedStaff(null);
    setIsFormOpen(true);
  };

  const handleEditStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsFormOpen(true);
  };

  const handleViewStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsDetailsOpen(true);
  };

  const handleDeleteStaff = (staff: Staff) => {
    if (confirm(`Are you sure you want to delete staff member "${staff.name}"?`)) {
      console.log('Deleting staff:', staff.id);
    }
  };

  const handleSaveStaff = (staffData: Partial<Staff>) => {
    console.log('Saving staff:', staffData);
    setIsFormOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <UserCog className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight">Staff Management</h1>
              <p className="text-gray-500 mt-1">Manage your employees, roles, departments, and payroll information.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export Staff List
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={handleCreateStaff}>
              <Plus className="w-4 h-4" /> Add Staff Member
            </Button>
          </div>
        </div>

        <StaffList 
          onEdit={handleEditStaff}
          onDelete={handleDeleteStaff}
          onView={handleViewStaff}
        />

        <StaffForm 
          key={selectedStaff?.id || 'form'}
          staff={selectedStaff}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveStaff}
        />

        <StaffDetails 
          staff={selectedStaff}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
