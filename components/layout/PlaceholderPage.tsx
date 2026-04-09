'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-display tracking-tight">{title}</h1>
          <p className="text-gray-500 mt-1">This page is under development for Aranya Furniture & Wood ERP.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-4">
            <span className="text-2xl font-bold">!</span>
          </div>
          <h2 className="text-xl font-semibold">Coming Soon</h2>
          <p className="text-gray-500 max-w-md mt-2">
            We are working hard to bring you the best {title} experience. 
            Stay tuned for updates!
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
