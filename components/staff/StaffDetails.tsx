'use client';

import React from 'react';
import { 
  X, 
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  CreditCard,
  FileText,
  BadgeCheck,
  Building2,
  Clock
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
import { Staff } from '@/types';

interface StaffDetailsProps {
  staff: Staff | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StaffDetails({ staff, isOpen, onClose }: StaffDetailsProps) {
  if (!staff) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-8 bg-orange-500 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <User className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/30">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black font-display">{staff.name}</h2>
                <Badge className={cn(
                  "text-[10px] uppercase px-2 py-0.5 border-none",
                  staff.status === 'active' ? "bg-green-500 text-white" : "bg-white/20 text-white"
                )}>
                  {staff.status}
                </Badge>
              </div>
              <p className="text-orange-100 font-medium">{staff.designation}</p>
              <p className="text-orange-200 text-xs font-bold uppercase tracking-widest mt-1">{staff.department}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Contact & Personal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <User className="w-3.5 h-3.5" /> Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Phone</p>
                    <p className="text-sm font-bold text-gray-900">{staff.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Email</p>
                    <p className="text-sm font-bold text-gray-900">{staff.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Address</p>
                    <p className="text-sm font-bold text-gray-900">{staff.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <BadgeCheck className="w-3.5 h-3.5" /> Employment Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Monthly Salary</p>
                    <p className="text-sm font-bold text-gray-900">{formatCurrency(staff.salary)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Joining Date</p>
                    <p className="text-sm font-bold text-gray-900">{staff.joiningDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">NID Number</p>
                    <p className="text-sm font-bold text-gray-900">{staff.nid}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {staff.notes && (
            <div className="pt-6 border-t border-gray-50">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <FileText className="w-3.5 h-3.5" /> Additional Notes
              </h3>
              <div className="bg-gray-50 p-4 rounded-2xl text-sm text-gray-600 leading-relaxed">
                {staff.notes}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
