'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Filter,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Eye,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/utils';
import { mockStaff } from '@/data/mock-data';
import { Staff } from '@/types';
import { motion, AnimatePresence } from 'motion/react';

interface StaffListProps {
  onEdit: (staff: Staff) => void;
  onDelete: (staff: Staff) => void;
  onView: (staff: Staff) => void;
}

export function StaffList({ onEdit, onDelete, onView }: StaffListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const departments = useMemo(() => {
    const unique = Array.from(new Set(mockStaff.map(s => s.department)));
    return ['all', ...unique];
  }, []);

  const filteredStaff = useMemo(() => {
    return mockStaff.filter(staff => {
      const matchesSearch = 
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.phone.includes(searchQuery);
      
      const matchesDept = departmentFilter === 'all' || staff.department === departmentFilter;
      
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, departmentFilter]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4 border-none shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search by name or phone..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.filter(d => d !== 'all').map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <Button variant="outline" onClick={() => { setSearchQuery(''); setDepartmentFilter('all'); }}>
            Reset
          </Button>
        </div>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredStaff.map((staff) => (
            <motion.div
              key={staff.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
            >
              <Card className="p-6 border-none shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <User className="w-7 h-7" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="gap-2" onClick={() => onView(staff)}>
                        <Eye className="w-4 h-4" /> View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2" onClick={() => onEdit(staff)}>
                        <Edit className="w-4 h-4" /> Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-red-600" onClick={() => onDelete(staff)}>
                        <Trash2 className="w-4 h-4" /> Delete Staff
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">{staff.name}</h3>
                    <Badge className={cn(
                      "text-[10px] uppercase px-1.5 py-0 border-none",
                      staff.status === 'active' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    )}>
                      {staff.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-orange-600">{staff.designation}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">{staff.department}</p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{staff.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{staff.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Joined: {staff.joiningDate}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Monthly Salary</p>
                    <p className="text-lg font-black text-gray-900">{formatCurrency(staff.salary)}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 text-xs font-bold"
                    onClick={() => onView(staff)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
