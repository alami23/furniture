'use client';

import React from 'react';
import { 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  Box,
  Layers,
  Archive
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockProducts, mockWoodInventory } from '@/data/mock-data';
import { cn } from '@/lib/utils';

const stockStatusData = [
  { name: 'In Stock', value: 45, color: '#10b981' },
  { name: 'Low Stock', value: 12, color: '#f59e0b' },
  { name: 'Out of Stock', value: 5, color: '#ef4444' },
];

const categoryDistribution = [
  { name: 'Furniture', value: 120, color: '#3b82f6' },
  { name: 'Wood Logs', value: 85, color: '#f97316' },
  { name: 'Hardware', value: 240, color: '#8b5cf6' },
  { name: 'Raw Materials', value: 65, color: '#10b981' },
];

export function InventoryReportView() {
  const lowStockFurniture = mockProducts.filter(p => p.stock <= p.reorderLevel);
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <Box className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Total Items</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">512</h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Low Stock Items</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{lowStockFurniture.length + 5}</h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                <Layers className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Total Categories</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                <Archive className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Inventory Value</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">৳15,42,000</h3>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold font-display">Stock Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stockStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold font-display">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Table */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold font-display">Low Stock Items Detailed</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="font-bold">ITEM NAME</TableHead>
                <TableHead className="font-bold">CATEGORY</TableHead>
                <TableHead className="font-bold">CURRENT STOCK</TableHead>
                <TableHead className="font-bold">MIN LEVEL</TableHead>
                <TableHead className="font-bold">STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockFurniture.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="font-bold text-red-600">{product.stock} {product.unit}</TableCell>
                  <TableCell>{product.reorderLevel} {product.unit}</TableCell>
                  <TableCell>
                    <Badge className="bg-orange-50 text-orange-700 border-none">
                      LOW STOCK
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
