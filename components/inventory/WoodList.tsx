'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Filter,
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
import { WoodItem, useWood } from '@/lib/context/WoodContext';
import { motion, AnimatePresence } from 'motion/react';

interface WoodListProps {
  onEdit: (item: WoodItem) => void;
  onDelete: (item: WoodItem) => void;
}

export function WoodList({ onEdit, onDelete }: WoodListProps) {
  const { inventory, categories: globalCategories, carNos: globalCarNos, tags: globalTags } = useWood();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [carNoFilter, setCarNoFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');

  const categories = useMemo(() => {
    return ['all', ...globalCategories.map(c => c.name)];
  }, [globalCategories]);

  const carNos = useMemo(() => {
    return ['all', ...globalCarNos.map(c => c.number)];
  }, [globalCarNos]);

  const tags = useMemo(() => {
    return ['all', ...globalTags.map(t => t.code)];
  }, [globalTags]);

  const filteredItems = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = 
        item.itemNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.carNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.treeNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesCarNo = carNoFilter === 'all' || item.carNo === carNoFilter;
      const matchesTag = tagFilter === 'all' || item.tag === tagFilter;
      
      return matchesSearch && matchesCategory && matchesCarNo && matchesTag;
    });
  }, [inventory, searchQuery, categoryFilter, carNoFilter, tagFilter]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4 border-none shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search by Item No, Car No, Tree No or Category..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
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

          <div className="flex items-center gap-2">
            <select 
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"
              value={carNoFilter}
              onChange={(e) => setCarNoFilter(e.target.value)}
            >
              <option value="all">All Car Nos</option>
              {carNos.filter(c => c !== 'all').map(car => (
                <option key={car} value={car}>{car}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select 
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            >
              <option value="all">All Tags</option>
              {tags.filter(t => t !== 'all').map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          <Button variant="outline" onClick={() => { setSearchQuery(''); setCategoryFilter('all'); setCarNoFilter('all'); setTagFilter('all'); }}>
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
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">NO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">CATEGORY</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">CAR NO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">TAG</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">TREE NO</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">WIDTH</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">LENGTH</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">CFT</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">BUY PRICE</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">SELL PRICE</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">ACTION</th>
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
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.itemNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.carNo}</td>
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{item.tag}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">{item.treeNo}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.width}&quot;</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.length}&apos;</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">{item.cft.toFixed(5)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-right">৳{item.buyPrice}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-orange-500 text-right">৳{item.sellPrice}</td>
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
