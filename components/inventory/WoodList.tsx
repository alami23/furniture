'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Filter,
  ArrowUpDown,
  Package,
  Ruler,
  Tag
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
import { mockWoodInventory } from '@/data/mock-data';
import { WoodInventoryItem } from '@/types';
import { motion, AnimatePresence } from 'motion/react';

interface WoodListProps {
  onEdit: (item: WoodInventoryItem) => void;
  onDelete: (item: WoodInventoryItem) => void;
}

export function WoodList({ onEdit, onDelete }: WoodListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const woodTypes = useMemo(() => {
    const unique = Array.from(new Set(mockWoodInventory.map(item => item.woodType)));
    return ['all', ...unique];
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(mockWoodInventory.map(item => item.category)));
    return ['all', ...unique];
  }, []);

  const filteredItems = useMemo(() => {
    return mockWoodInventory.filter(item => {
      const matchesSearch = 
        item.itemNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.carNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.treeNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.woodType.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === 'all' || item.woodType === typeFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchQuery, typeFilter, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4 border-none shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search by Item No, Car No, Tree No or Type..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Wood Types</option>
              {woodTypes.filter(t => t !== 'all').map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select 
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <Button variant="outline" onClick={() => { setSearchQuery(''); setTypeFilter('all'); setCategoryFilter('all'); }}>
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
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Item Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Type & Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dimensions</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">CFT</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Rates (৳)</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">Stock</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">Item #{item.itemNo}</div>
                      <div className="text-[10px] text-gray-400 uppercase font-medium">Car: {item.carNo} | Tree: {item.treeNo}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{item.woodType}</div>
                      <Badge variant="outline" className="text-[10px] font-medium uppercase border-gray-200 mt-1">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[10px] text-gray-500 flex items-center gap-1">
                        <Ruler className="w-3 h-3" /> {item.width}&quot; x {item.length}&apos; x {item.thickness}&quot;
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm font-bold text-gray-900">{item.cft}</div>
                      <div className="text-[10px] text-gray-400 uppercase">{item.unit}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(item.saleRate)}</div>
                      <div className="text-[10px] text-gray-400">Buy: {formatCurrency(item.purchaseRate)}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={cn(
                        "text-sm font-bold",
                        item.stockQty <= 5 ? "text-red-600" : "text-gray-900"
                      )}>
                        {item.stockQty}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="gap-2" onClick={() => onEdit(item)}>
                            <Edit className="w-4 h-4" /> Edit Item
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-red-600" onClick={() => onDelete(item)}>
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
