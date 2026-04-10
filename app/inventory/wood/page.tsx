'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WoodList } from '@/components/inventory/WoodList';
import { WoodForm } from '@/components/inventory/WoodForm';
import { Button } from '@/components/ui/button';
import { Plus, Download, TreePine, Ruler, Package } from 'lucide-react';
import { WoodItem, useWood } from '@/lib/context/WoodContext';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

export default function WoodInventoryPage() {
  const { inventory, setInventory } = useWood();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WoodItem | null>(null);

  const stats = useMemo(() => {
    const totalItems = inventory.length;
    const totalCFT = inventory.reduce((sum, item) => sum + item.cft, 0);
    const inventoryValue = inventory.reduce((sum, item) => sum + item.sellPrice, 0);

    return { totalItems, totalCFT, inventoryValue };
  }, [inventory]);

  const handleCreateItem = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: WoodItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteItem = (item: WoodItem) => {
    if (confirm(`Are you sure you want to delete item #${item.itemNo}?`)) {
      setInventory(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleSaveItem = (itemData: Partial<WoodItem>) => {
    if (editingItem) {
      setInventory(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...itemData } as WoodItem : item));
    } else {
      const newItem: WoodItem = {
        ...itemData,
        id: Math.random().toString(36).substr(2, 9),
        itemNo: `W-${Math.floor(100 + Math.random() * 900)}`,
      } as WoodItem;
      setInventory(prev => [...prev, newItem]);
    }
    setIsFormOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <TreePine className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight">Wood Inventory</h1>
              <p className="text-gray-500 mt-1">Manage raw wood logs, planks, and slabs with dimension tracking.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export Ledger
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={handleCreateItem}>
              <Plus className="w-4 h-4" /> Add Wood Item
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-none shadow-sm bg-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Items</p>
                <h3 className="text-xl font-black text-gray-900">{stats.totalItems}</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-none shadow-sm bg-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total CFT</p>
                <h3 className="text-xl font-black text-gray-900">{stats.totalCFT.toFixed(2)}</h3>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-none shadow-sm bg-orange-500 text-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                <TreePine className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Inventory Value</p>
                <h3 className="text-xl font-black">{formatCurrency(stats.inventoryValue)}</h3>
              </div>
            </div>
          </Card>
        </div>

        <WoodList 
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />

        <WoodForm 
          key={editingItem?.id || 'form'}
          item={editingItem}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveItem}
        />
      </div>
    </DashboardLayout>
  );
}
