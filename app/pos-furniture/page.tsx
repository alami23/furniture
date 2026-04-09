'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { POSFurniture } from '@/components/pos/POSFurniture';

export default function POSFurniturePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">POS Furniture</h1>
            <p className="text-gray-500 mt-1">Manage furniture sales, product selection, and retail billing.</p>
          </div>
        </div>
        
        <POSFurniture />
      </div>
    </DashboardLayout>
  );
}
