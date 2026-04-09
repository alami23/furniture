'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Filter,
  CheckCircle2,
  XCircle,
  Tag,
  Layers
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
import { cn } from '@/lib/utils';
import { mockCategories } from '@/data/mock-data';
import { Category, ProductType } from '@/types';
import { motion, AnimatePresence } from 'motion/react';

interface CategoryListProps {
  type: ProductType;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onToggleStatus: (category: Category) => void;
}

export function CategoryList({ type, onEdit, onDelete, onToggleStatus }: CategoryListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCategories = useMemo(() => {
    return mockCategories.filter(cat => {
      const matchesType = cat.type === type;
      const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || cat.status === statusFilter;
      
      return matchesType && matchesSearch && matchesStatus;
    });
  }, [type, searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4 border-none shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search categories..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <Button variant="outline" onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}>
            Reset
          </Button>
        </div>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
            >
              <Card className="p-6 border-none shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Tag className="w-6 h-6" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="gap-2" onClick={() => onToggleStatus(category)}>
                        {category.status === 'active' ? (
                          <><XCircle className="w-4 h-4 text-red-500" /> Deactivate</>
                        ) : (
                          <><CheckCircle2 className="w-4 h-4 text-green-500" /> Activate</>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2" onClick={() => onEdit(category)}>
                        <Edit className="w-4 h-4" /> Edit Category
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-red-600" onClick={() => onDelete(category)}>
                        <Trash2 className="w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                    <Badge className={cn(
                      "text-[10px] uppercase px-1.5 py-0 border-none",
                      category.status === 'active' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    )}>
                      {category.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px]">
                    {category.description || 'No description provided.'}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Layers className="w-3.5 h-3.5" />
                    <span className="font-bold text-gray-900">{category.itemCount}</span> Items
                  </div>
                  <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 text-xs font-bold" onClick={() => onEdit(category)}>
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
