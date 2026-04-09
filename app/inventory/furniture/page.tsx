'use client';

import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FurnitureList } from '@/components/inventory/FurnitureList';
import { FurnitureForm } from '@/components/inventory/FurnitureForm';
import { Button } from '@/components/ui/button';
import { Plus, Download, Package, AlertTriangle } from 'lucide-react';
import { Product } from '@/types';
import { mockProducts } from '@/data/mock-data';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

export default function FurnitureInventoryPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const stats = useMemo(() => {
    const furniture = mockProducts.filter(p => p.type === 'furniture');
    const totalItems = furniture.length;
    const lowStock = furniture.filter(p => p.status === 'low-stock').length;
    const outOfStock = furniture.filter(p => p.status === 'out-of-stock').length;
    const totalValue = furniture.reduce((sum, p) => sum + (p.price * p.stock), 0);

    return { totalItems, lowStock, outOfStock, totalValue };
  }, []);

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      console.log('Deleting product:', product.id);
    }
  };

  const handleViewProduct = (product: Product) => {
    console.log('Viewing product:', product.id);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    console.log('Saving product:', productData);
    setIsFormOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight">Furniture Inventory</h1>
              <p className="text-gray-500 mt-1">Manage your finished furniture products, stock levels, and pricing.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" /> Export Inventory
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 gap-2" onClick={handleCreateProduct}>
              <Plus className="w-4 h-4" /> Add Furniture
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 border-none shadow-sm bg-white">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Products</p>
            <h3 className="text-2xl font-black text-gray-900">{stats.totalItems}</h3>
          </Card>
          <Card className="p-6 border-none shadow-sm bg-white">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Inventory Value</p>
            <h3 className="text-2xl font-black text-gray-900">{formatCurrency(stats.totalValue)}</h3>
          </Card>
          <Card className="p-6 border-none shadow-sm bg-orange-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">Low Stock</p>
                <h3 className="text-2xl font-black text-orange-600">{stats.lowStock} Items</h3>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-200" />
            </div>
          </Card>
          <Card className="p-6 border-none shadow-sm bg-red-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Out of Stock</p>
                <h3 className="text-2xl font-black text-red-600">{stats.outOfStock} Items</h3>
              </div>
              <Package className="w-8 h-8 text-red-200" />
            </div>
          </Card>
        </div>

        <FurnitureList 
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onView={handleViewProduct}
        />

        <FurnitureForm 
          key={editingProduct?.id || 'form'}
          product={editingProduct}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveProduct}
        />
      </div>
    </DashboardLayout>
  );
}
