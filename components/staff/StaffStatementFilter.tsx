'use client';

import React from 'react';
import { Search, User, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockStaff } from '@/data/mock-data';

interface StaffStatementFilterProps {
  selectedStaffId: string;
  onStaffChange: (id: string) => void;
  dateRange: { start: string; end: string };
  onDateChange: (range: { start: string; end: string }) => void;
}

export function StaffStatementFilter({ 
  selectedStaffId, 
  onStaffChange, 
  dateRange, 
  onDateChange 
}: StaffStatementFilterProps) {
  return (
    <Card className="p-6 border-none shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <User className="w-3 h-3" /> Select Staff Member
          </Label>
          <select 
            className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={selectedStaffId}
            onChange={(e) => onStaffChange(e.target.value)}
          >
            <option value="">Choose a staff...</option>
            {mockStaff.map(staff => (
              <option key={staff.id} value={staff.id}>{staff.name} ({staff.designation})</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-3 h-3" /> Start Date
          </Label>
          <Input 
            type="date" 
            className="bg-gray-50 border-gray-200"
            value={dateRange.start}
            onChange={(e) => onDateChange({ ...dateRange, start: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-3 h-3" /> End Date
          </Label>
          <Input 
            type="date" 
            className="bg-gray-50 border-gray-200"
            value={dateRange.end}
            onChange={(e) => onDateChange({ ...dateRange, end: e.target.value })}
          />
        </div>
      </div>
    </Card>
  );
}
