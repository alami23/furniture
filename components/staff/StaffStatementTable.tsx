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
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/utils';
import { StaffStatementEntry } from '@/types';
import { motion } from 'motion/react';

interface StaffStatementTableProps {
  entries: StaffStatementEntry[];
}

export function StaffStatementTable({ entries }: StaffStatementTableProps) {
  if (entries.length === 0) {
    return (
      <Card className="p-12 border-none shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
          <Table className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">No transactions found</h3>
        <p className="text-gray-500 max-w-xs mx-auto mt-1">
          Select a staff member and date range to view their salary statement.
        </p>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="font-bold text-gray-900">Date</TableHead>
            <TableHead className="font-bold text-gray-900">Type</TableHead>
            <TableHead className="font-bold text-gray-900">Reference</TableHead>
            <TableHead className="font-bold text-gray-900 text-right">Amount</TableHead>
            <TableHead className="font-bold text-gray-900 text-right">Deduction</TableHead>
            <TableHead className="font-bold text-gray-900 text-right">Bonus</TableHead>
            <TableHead className="font-bold text-gray-900 text-right">Paid</TableHead>
            <TableHead className="font-bold text-gray-900 text-right">Due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <motion.tr
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group hover:bg-gray-50/50 transition-colors"
            >
              <TableCell className="font-medium text-gray-600">{entry.date}</TableCell>
              <TableCell>
                <Badge className={cn(
                  "text-[10px] uppercase px-2 py-0.5 border-none font-bold",
                  entry.type === 'Salary' ? "bg-blue-100 text-blue-700" :
                  entry.type === 'Advance' ? "bg-orange-100 text-orange-700" :
                  entry.type === 'Bonus' ? "bg-green-100 text-green-700" :
                  "bg-red-100 text-red-700"
                )}>
                  {entry.type}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-600">{entry.reference}</TableCell>
              <TableCell className="text-right font-medium text-gray-900">
                {entry.amount > 0 ? formatCurrency(entry.amount) : '-'}
              </TableCell>
              <TableCell className="text-right font-medium text-red-600">
                {entry.deduction > 0 ? `-${formatCurrency(entry.deduction)}` : '-'}
              </TableCell>
              <TableCell className="text-right font-medium text-green-600">
                {entry.bonus > 0 ? `+${formatCurrency(entry.bonus)}` : '-'}
              </TableCell>
              <TableCell className="text-right font-bold text-gray-900">
                {formatCurrency(entry.paid)}
              </TableCell>
              <TableCell className="text-right">
                <span className={cn(
                  "font-bold",
                  entry.due > 0 ? "text-red-600" : "text-gray-400"
                )}>
                  {entry.due > 0 ? formatCurrency(entry.due) : '0.00'}
                </span>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
