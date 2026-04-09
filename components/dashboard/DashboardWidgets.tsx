'use client';

import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockInvoices, mockProducts } from '@/data/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RecentInvoices() {
  return (
    <Card className="border-none shadow-sm col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold font-display">Latest Invoices</CardTitle>
        <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
          View All <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-100">
              <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">Invoice No</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">Customer</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">Date</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">Amount</TableHead>
              <TableHead className="text-xs uppercase tracking-wider font-semibold text-gray-500">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvoices.slice(0, 5).map((invoice) => (
              <TableRow key={invoice.id} className="border-gray-50 hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-sm">{invoice.invoiceNo}</TableCell>
                <TableCell className="text-sm">{invoice.customerName}</TableCell>
                <TableCell className="text-sm text-gray-500">{formatDate(invoice.date)}</TableCell>
                <TableCell className="text-sm font-semibold">{formatCurrency(invoice.totalAmount)}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={
                      invoice.status === 'paid' ? "bg-green-50 text-green-700 border-green-100" :
                      invoice.status === 'partial' ? "bg-orange-50 text-orange-700 border-orange-100" :
                      "bg-red-50 text-red-700 border-red-100"
                    }
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function LowStockAlerts() {
  const lowStockItems = mockProducts.filter(p => p.stock <= p.reorderLevel);

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold font-display flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Low Stock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockItems.length > 0 ? (
            lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">Min: {item.reorderLevel} {item.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600">{item.stock} {item.unit}</p>
                  <p className="text-[10px] uppercase font-bold text-red-400">In Stock</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No low stock alerts</p>
          )}
        </div>
        <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">
          Manage Inventory
        </Button>
      </CardContent>
    </Card>
  );
}
