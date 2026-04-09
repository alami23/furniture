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
  History,
  CheckCircle2,
  XCircle,
  Clock,
  MoreHorizontal,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockSMSHistory } from '@/data/mock-data';
import { motion } from 'motion/react';

export function SMSHistory() {
  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-bold text-gray-900">SMS History</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-xs font-bold text-gray-500">
          View All Logs
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="font-bold text-gray-900">Recipient</TableHead>
            <TableHead className="font-bold text-gray-900">Message</TableHead>
            <TableHead className="font-bold text-gray-900">Type</TableHead>
            <TableHead className="font-bold text-gray-900">Status</TableHead>
            <TableHead className="font-bold text-gray-900">Sent At</TableHead>
            <TableHead className="font-bold text-gray-900 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockSMSHistory.map((log, index) => (
            <motion.tr
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group hover:bg-gray-50/50 transition-colors"
            >
              <TableCell>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-gray-900">{log.recipientName}</p>
                  <p className="text-xs text-gray-400 font-mono">{log.recipientPhone}</p>
                  <Badge variant="outline" className="text-[9px] uppercase px-1 py-0 border-gray-200 text-gray-400">
                    {log.recipientType}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="max-w-md">
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {log.message}
                </p>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-[10px] font-bold border-orange-100 text-orange-600">
                  {log.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  {log.status === 'sent' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  ) : log.status === 'failed' ? (
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                  )}
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider",
                    log.status === 'sent' ? "text-green-600" :
                    log.status === 'failed' ? "text-red-600" :
                    "text-orange-500"
                  )}>
                    {log.status}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-xs text-gray-500 whitespace-nowrap">
                {log.sentAt}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem className="gap-2">
                      <RotateCcw className="w-4 h-4" /> Resend SMS
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-red-600">
                      <Trash2 className="w-4 h-4" /> Delete Log
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
