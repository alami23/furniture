'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#F8F9FA]">
      <Sidebar />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <TopHeader />
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
