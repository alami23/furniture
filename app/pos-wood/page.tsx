'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { POSWood } from '@/components/pos/POSWood';

export default function POSWoodPage() {
  return (
    <DashboardLayout>
      <div className="h-full">
        <POSWood />
      </div>
    </DashboardLayout>
  );
}
