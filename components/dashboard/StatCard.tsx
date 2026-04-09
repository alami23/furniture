'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClass?: string;
  iconColorClass?: string;
}

export function StatCard({ title, value, icon: Icon, trend, colorClass, iconColorClass }: StatCardProps) {
  return (
    <Card className="border-none shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold font-display tracking-tight">{value}</h3>
            {trend && (
              <p className={cn(
                "text-xs font-medium mt-2 flex items-center gap-1",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                <span>{trend.isPositive ? '+' : '-'}{trend.value}%</span>
                <span className="text-gray-400 font-normal">from last month</span>
              </p>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
            colorClass || "bg-gray-50",
            iconColorClass || "text-gray-600"
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
