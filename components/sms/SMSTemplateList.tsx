'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Copy, 
  Edit, 
  Trash2,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockSMSTemplates } from '@/data/mock-data';

export function SMSTemplateList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-bold text-gray-900">Message Templates</h3>
        </div>
        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 gap-1 text-xs h-8">
          <Plus className="w-3 h-3" /> New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockSMSTemplates.map((template) => (
          <Card key={template.id} className="p-4 border-none shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-900 text-sm">{template.name}</h4>
                <Badge variant="outline" className="text-[9px] uppercase px-1.5 py-0 border-orange-100 text-orange-600">
                  {template.type}
                </Badge>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                  <Copy className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                  <Edit className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed italic">
              &quot;{template.content}&quot;
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
