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
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  MoreHorizontal,
  Eye,
  FileText,
  Trash2
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { formatCurrency, cn } from '@/lib/utils';
import { Transaction } from '@/types';
import { motion } from 'motion/react';

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <Card className="p-12 border-none shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
          <FileText className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">No transactions found</h3>
        <p className="text-gray-500 max-w-xs mx-auto mt-1">
          Try adjusting your filters or search query to find what you&apos;re looking for.
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
            <TableHead className="font-bold text-gray-900">Ref Type</TableHead>
            <TableHead className="font-bold text-gray-900">Ref No</TableHead>
            <TableHead className="font-bold text-gray-900">Account</TableHead>
            <TableHead className="font-bold text-gray-900">Category</TableHead>
            <TableHead className="font-bold text-gray-900 text-right">Amount</TableHead>
            <TableHead className="font-bold text-gray-900">Method</TableHead>
            <TableHead className="font-bold text-gray-900">Status</TableHead>
            <TableHead className="font-bold text-gray-900 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, index) => (
            <motion.tr
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="group hover:bg-gray-50/50 transition-colors"
            >
              <TableCell className="text-xs font-medium text-gray-600">
                {tx.date}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    tx.type === 'income' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  )}>
                    {tx.type === 'income' ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                  </div>
                  <span className="text-xs font-bold text-gray-900">{tx.referenceType}</span>
                </div>
              </TableCell>
              <TableCell className="text-xs font-bold text-orange-600">
                {tx.referenceNo}
              </TableCell>
              <TableCell className="text-xs text-gray-600">
                {tx.account}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[10px] font-bold border-gray-200 text-gray-500">
                  {tx.category}
                </Badge>
              </TableCell>
              <TableCell className={cn(
                "text-right font-black",
                tx.type === 'income' ? "text-green-600" : "text-red-600"
              )}>
                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
              </TableCell>
              <TableCell>
                <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-none text-[10px] uppercase px-1.5 py-0">
                  {tx.paymentMethod}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={cn(
                  "text-[10px] uppercase px-1.5 py-0 border-none",
                  tx.status === 'completed' ? "bg-green-100 text-green-700" :
                  tx.status === 'pending' ? "bg-orange-100 text-orange-700" :
                  "bg-red-100 text-red-700"
                )}>
                  {tx.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem className="gap-2">
                      <Eye className="w-4 h-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <FileText className="w-4 h-4" /> Print Receipt
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-red-600">
                      <Trash2 className="w-4 h-4" /> Void
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
