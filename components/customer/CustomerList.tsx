'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Phone, 
  MessageSquare, 
  MapPin,
  UserPlus,
  Filter,
  ArrowUpDown,
  MessageCircle
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
import { mockCustomers } from '@/data/mock-data';
import { Customer } from '@/types';
import { motion, AnimatePresence } from 'motion/react';

interface CustomerListProps {
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export function CustomerList({ onView, onEdit, onDelete }: CustomerListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');

  const districts = useMemo(() => {
    const uniqueDistricts = Array.from(new Set(mockCustomers.map(c => c.district)));
    return ['all', ...uniqueDistricts];
  }, []);

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(customer => {
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery) ||
        customer.district.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDistrict = districtFilter === 'all' || customer.district === districtFilter;
      
      return matchesSearch && matchesDistrict;
    });
  }, [searchQuery, districtFilter]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-none shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search by name, phone, or district..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
            >
              {districts.map(d => (
                <option key={d} value={d}>{d === 'all' ? 'All Districts' : d}</option>
              ))}
            </select>
          </div>

          <Button variant="outline" onClick={() => { setSearchQuery(''); setDistrictFilter('all'); }}>
            Reset
          </Button>
        </div>
      </Card>

      {/* Table */}
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <AnimatePresence mode="popLayout">
                {filteredCustomers.map((customer) => (
                  <motion.tr 
                    key={customer.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{customer.name}</div>
                          <div className="text-[10px] text-gray-400 uppercase font-medium">ID: {customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3 h-3" /> {customer.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          {customer.whatsapp && (
                            <div className="w-5 h-5 rounded bg-green-100 flex items-center justify-center text-green-600" title="WhatsApp">
                              <MessageCircle className="w-3 h-3" />
                            </div>
                          )}
                          {customer.imo && (
                            <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center text-blue-600" title="IMO">
                              <MessageSquare className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">{customer.district}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {customer.area}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">{customer.totalOrders}</div>
                      <div className="text-[10px] text-gray-400 uppercase">Total: {formatCurrency(customer.totalSpent)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn(
                        "text-sm font-bold",
                        customer.dueAmount > 0 ? "text-red-600" : "text-green-600"
                      )}>
                        {formatCurrency(customer.dueAmount)}
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase">Limit: {formatCurrency(customer.creditLimit)}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="gap-2" onClick={() => onView(customer)}>
                            <Eye className="w-4 h-4" /> Profile View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2" onClick={() => onEdit(customer)}>
                            <Edit className="w-4 h-4" /> Edit Info
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-red-600" onClick={() => onDelete(customer)}>
                            <Trash2 className="w-4 h-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
