'use client';

import React, { useState, useMemo } from 'react';
import { 
  Send, 
  User, 
  Users, 
  FileText, 
  MessageSquare, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { mockCustomers, mockStaff, mockSMSTemplates } from '@/data/mock-data';
import { SMSTemplate } from '@/types';
import { cn } from '@/lib/utils';

export function SMSComposer() {
  const [recipientType, setRecipientType] = useState<'customer' | 'staff'>('customer');
  const [selectedRecipientId, setSelectedRecipientId] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const recipients = useMemo(() => {
    return recipientType === 'customer' ? mockCustomers : mockStaff;
  }, [recipientType]);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = mockSMSTemplates.find(t => t.id === templateId);
    if (template) {
      let content = template.content;
      const recipient = recipients.find(r => r.id === selectedRecipientId);
      if (recipient) {
        content = content.replace('[Customer Name]', recipient.name);
      }
      setMessage(content);
    }
  };

  const handleSend = () => {
    if (!selectedRecipientId || !message) return;
    
    setIsSending(true);
    // Mock send flow
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 3000);
      
      // Reset form
      setSelectedRecipientId('');
      setSelectedTemplateId('');
      setMessage('');
    }, 1500);
  };

  return (
    <Card className="p-8 border-none shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Compose SMS</h2>
          <p className="text-sm text-gray-500">Send personalized messages to your customers and staff.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Recipient Type Toggle */}
        <div className="flex p-1 bg-gray-100 rounded-lg w-fit">
          <button
            onClick={() => setRecipientType('customer')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-md transition-all",
              recipientType === 'customer' ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Users className="w-4 h-4" /> Customers
          </button>
          <button
            onClick={() => setRecipientType('staff')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-md transition-all",
              recipientType === 'staff' ? "bg-white text-orange-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <User className="w-4 h-4" /> Staff
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Recipient</Label>
            <select 
              className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={selectedRecipientId}
              onChange={(e) => setSelectedRecipientId(e.target.value)}
            >
              <option value="">Choose {recipientType}...</option>
              {recipients.map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.phone})</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message Template</Label>
            <select 
              className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={selectedTemplateId}
              onChange={(e) => handleTemplateChange(e.target.value)}
            >
              <option value="">Select a template...</option>
              {mockSMSTemplates.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message Content</Label>
            <span className={cn(
              "text-[10px] font-bold",
              message.length > 160 ? "text-orange-500" : "text-gray-400"
            )}>
              {message.length} characters ({Math.ceil(message.length / 160)} SMS)
            </span>
          </div>
          <Textarea 
            placeholder="Type your message here..." 
            className="min-h-[120px] bg-gray-50 border-gray-200 focus:ring-orange-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-gray-100" onClick={() => setMessage(prev => prev + ' [Customer Name]')}>+ Name</Badge>
            <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-gray-100" onClick={() => setMessage(prev => prev + ' [Amount]')}>+ Amount</Badge>
            <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-gray-100" onClick={() => setMessage(prev => prev + ' [Invoice No]')}>+ Invoice No</Badge>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span>SMS will be sent via integrated gateway.</span>
          </div>
          <Button 
            className="bg-orange-500 hover:bg-orange-600 gap-2 px-8" 
            disabled={!selectedRecipientId || !message || isSending}
            onClick={handleSend}
          >
            {isSending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : sendSuccess ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isSending ? 'Sending...' : sendSuccess ? 'Sent!' : 'Send SMS'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
