'use client';

import React from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  CreditCard, 
  ShoppingBag, 
  History,
  MessageCircle,
  MessageSquare,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, cn } from '@/lib/utils';
import { Customer } from '@/types';

interface CustomerProfileProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerProfile({ customer, isOpen, onClose }: CustomerProfileProps) {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl">
        {/* Header / Cover */}
        <div className="h-32 bg-gradient-to-r from-orange-500 to-orange-600 relative">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="px-8 pb-8 -mt-12 relative">
          {/* Profile Avatar */}
          <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-orange-600 border-4 border-white">
            {customer.name.charAt(0)}
          </div>

          <div className="mt-4 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" /> {customer.area}, {customer.district}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge className={cn(
                "px-3 py-1",
                customer.dueAmount > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
              )}>
                {customer.dueAmount > 0 ? 'Balance Due' : 'Clear Account'}
              </Badge>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Member since {customer.createdAt}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Total Spent</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(customer.totalSpent)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Due Balance</p>
              <p className="text-lg font-bold text-red-600">{formatCurrency(customer.dueAmount)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Credit Limit</p>
              <p className="text-lg font-bold text-blue-600">{formatCurrency(customer.creditLimit)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                <Phone className="w-4 h-4 text-orange-500" /> Contact Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium text-gray-900">{customer.phone}</span>
                </div>
                {customer.whatsapp && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-green-500" /> WhatsApp
                    </span>
                    <span className="font-medium text-gray-900">{customer.whatsapp}</span>
                  </div>
                )}
                {customer.imo && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-500" /> IMO
                    </span>
                    <span className="font-medium text-gray-900">{customer.imo}</span>
                  </div>
                )}
                {customer.email && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium text-gray-900">{customer.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order History Summary */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                <ShoppingBag className="w-4 h-4 text-orange-500" /> Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Orders</span>
                  <span className="font-bold text-gray-900">{customer.totalOrders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last Order</span>
                  <span className="font-medium text-gray-900">{customer.lastOrderDate || 'Never'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Account Status</span>
                  <Badge variant="outline" className="text-[10px] uppercase">Active</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Notes */}
          <div className="mt-8 space-y-6">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-2">Full Address</p>
              <p className="text-sm text-gray-700 leading-relaxed">{customer.address}, {customer.area}, {customer.district}</p>
            </div>

            {customer.notes && (
              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="text-[10px] text-orange-400 uppercase font-bold mb-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Important Notes
                </p>
                <p className="text-sm text-gray-700 italic leading-relaxed">&quot;{customer.notes}&quot;</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 gap-2">
              <ExternalLink className="w-4 h-4" /> View Full Statement
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <History className="w-4 h-4" /> Transaction History
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
