'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WoodList } from '@/components/inventory/WoodList';
import { WoodForm } from '@/components/inventory/WoodForm';
import { Button } from '@/components/ui/button';
import { Plus, Download, TreePine, Ruler, Package } from 'lucide-react';
import { WoodInventoryItem } from '@/types';
import { mockWoodInventory } from '@/data/mock-data';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

export default function WoodInventoryPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WoodInventoryItem | null>(null);

  const stats = useMemo(() => {
    const totalItems = mockWoodInventory.length;
    const totalCFT = mockWoodInventory.reduce((sum, item) => sum + item.cft, 0);
    const totalStock = mockWoodInventory.reduce((sum, item) => sum + item.stockQty, 0);
    const inventoryValue = mockWoodInventory.reduce((sum, item) => sum + (item.saleRate * item.stockQty), 0);

    return { totalItems, totalCFT, totalStock, inventoryValue };
  }, []);

  const handleCreateItem = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: WoodInventoryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteItem = (item: WoodInventoryItem) => {
    if (confirm(`Are you sure you want to delete item #${item.itemNo}?`)) {
      console.log('Deleting wood item:', item.id);
    }
  };

  const handleSaveItem = (itemData: Partial<WoodInventoryItem>) => {
    console.log('Saving wood item:', itemData);
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
          <Card className="p-6 border-none shadow-sm bg-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Stock</p>
                <h3 className="text-xl font-black text-gray-900">{stats.totalStock} Units</h3>
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
