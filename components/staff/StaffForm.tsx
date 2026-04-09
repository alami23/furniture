'use client';

import React, { useState } from 'react';
import { 
  X, 
  Save, 
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Calendar as CalendarIcon,
  CreditCard,
  FileText
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Staff } from '@/types';

interface StaffFormProps {
  staff: Staff | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (staff: Partial<Staff>) => void;
}

export function StaffForm({ staff, isOpen, onClose, onSave }: StaffFormProps) {
  const [formData, setFormData] = useState<Partial<Staff>>(() => {
    if (staff) return staff;
    return {
      name: '',
      phone: '',
      email: '',
      address: '',
      designation: '',
      department: '',
      salary: 0,
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'active',
      nid: '',
      notes: ''
    };
  });

  const handleChange = (field: keyof Staff, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-gray-50 border-b border-gray-100 flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold font-display flex items-center gap-2">
            <User className="w-5 h-5 text-orange-500" />
            {staff ? 'Edit Staff Member' : 'Add New Staff Member'}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-orange-500" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input 
                  placeholder="e.g. Alamin Hossain" 
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input 
                  placeholder="e.g. 01711223344" 
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input 
                  type="email"
                  placeholder="e.g. alamin@aranya.com" 
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>NID / ID Number</Label>
                <Input 
                  placeholder="e.g. 1990123456789" 
                  value={formData.nid}
                  onChange={(e) => handleChange('nid', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input 
                placeholder="e.g. Mirpur-10, Dhaka" 
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </div>
          </div>

          {/* Employment Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-orange-500" /> Employment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Designation</Label>
                <Input 
                  placeholder="e.g. General Manager" 
                  value={formData.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <select 
                  className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                >
                  <option value="">Select Department</option>
                  <option value="Management">Management</option>
                  <option value="Sales">Sales</option>
                  <option value="Production">Production</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Accounts">Accounts</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Monthly Salary (৳)</Label>
                <Input 
                  type="number" 
                  value={formData.salary}
                  onChange={(e) => handleChange('salary', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Joining Date</Label>
                <Input 
                  type="date" 
                  value={formData.joiningDate}
                  onChange={(e) => handleChange('joiningDate', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="status" 
                    value="active" 
                    checked={formData.status === 'active'}
                    onChange={() => handleChange('status', 'active')}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="status" 
                    value="inactive" 
                    checked={formData.status === 'inactive'}
                    onChange={() => handleChange('status', 'inactive')}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium">Inactive</span>
                </label>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea 
              placeholder="Add any additional details about this staff member..." 
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={() => onSave(formData)}>
            <Save className="w-4 h-4" /> {staff ? 'Update Staff' : 'Save Staff'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
