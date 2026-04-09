'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { POSWood } from '@/components/pos/POSWood';

export default function POSWoodPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">POS Wood</h1>
            <p className="text-gray-500 mt-1">Manage wood sales, inventory selection, and billing.</p>
          </div>
        </div>
        
        <POSWood />
      </div>
    </DashboardLayout>
  );
}
