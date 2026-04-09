'use client';

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const salesData = [
  { name: 'Jan', sales: 450000 },
  { name: 'Feb', sales: 520000 },
  { name: 'Mar', sales: 480000 },
  { name: 'Apr', sales: 610000 },
  { name: 'May', sales: 550000 },
  { name: 'Jun', sales: 670000 },
];

const categoryData = [
  { name: 'Furniture', value: 65, color: '#f97316' },
  { name: 'Wood Logs', value: 20, color: '#22c55e' },
  { name: 'Planks', value: 15, color: '#3b82f6' },
];

export function SalesChart() {
  return (
    <Card className="border-none shadow-sm col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold font-display">Sales Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                tickFormatter={(value) => `৳${value/1000}k`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value: number) => [`৳${value.toLocaleString()}`, 'Sales']}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#f97316" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSales)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryPerformance() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold font-display">Category Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {categoryData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <span className="text-sm font-semibold">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
