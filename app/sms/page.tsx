'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SMSComposer } from '@/components/sms/SMSComposer';
import { SMSHistory } from '@/components/sms/SMSHistory';
import { SMSTemplateList } from '@/components/sms/SMSTemplateList';
import { MessageSquare, Settings, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function SMSPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight">SMS Center</h1>
              <p className="text-gray-500 mt-1">Send automated reminders, notifications, and promotional messages.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" /> Gateway Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Composer Area */}
          <div className="lg:col-span-2 space-y-8">
            <SMSComposer />
            <SMSHistory />
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <Card className="p-6 border-none shadow-sm bg-orange-500 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-black mb-2">SMS Gateway Active</h3>
                <p className="text-sm text-orange-100 mb-4 leading-relaxed">
                  Your SMS gateway is connected and ready. You have 4,250 credits remaining.
                </p>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-3/4" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-2 text-white/70">
                  75% Credits Remaining
                </p>
              </div>
            </Card>

            <SMSTemplateList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
