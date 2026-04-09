'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  CreditCard, 
  Printer, 
  Bell, 
  Globe, 
  Palette, 
  Save,
  Upload,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  DollarSign,
  Hash,
  Percent,
  AlertCircle
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function SettingPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // In a real app, we would show a toast here
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-display text-gray-900">Settings</h1>
            <p className="text-gray-500 text-sm">Manage your business profile and application preferences</p>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-orange-600 hover:bg-orange-700 text-white gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-white border border-gray-200 p-1 h-auto flex-wrap justify-start gap-1">
            <TabsTrigger value="general" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600 gap-2">
              <Building2 className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600 gap-2">
              <CreditCard className="w-4 h-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600 gap-2">
              <Settings className="w-4 h-4" />
              Operations
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-600 gap-2">
              <Globe className="w-4 h-4" />
              System & UI
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="mt-6 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold font-display">Business Profile</CardTitle>
                <CardDescription>Update your business information and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="space-y-4">
                    <Label>Business Logo</Label>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-32 h-32 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                        <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">A</div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="ghost" size="sm" className="text-white">
                            <Upload className="w-4 h-4 mr-2" />
                            Change
                          </Button>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 text-center max-w-[128px]">
                        Recommended: 512x512px. PNG, JPG or SVG.
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business Name</Label>
                      <Input id="business-name" defaultValue="Aranya Furniture" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input id="email" className="pl-10" defaultValue="info@aranya.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input id="phone" className="pl-10" defaultValue="+880 1711-223344" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp Number</Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input id="whatsapp" className="pl-10" defaultValue="+880 1711-223344" />
                      </div>
                    </div>
                    <div className="col-span-full space-y-2">
                      <Label htmlFor="address">Business Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Textarea id="address" className="pl-10 min-h-[100px]" defaultValue="123 Furniture Street, Dhaka-1212, Bangladesh" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Settings */}
          <TabsContent value="financial" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold font-display">Currency & Invoicing</CardTitle>
                  <CardDescription>Set your default currency and invoice numbering</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="bdt">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bdt">BDT (৳) - Bangladeshi Taka</SelectItem>
                        <SelectItem value="usd">USD ($) - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR (€) - Euro</SelectItem>
                        <SelectItem value="gbp">GBP (£) - British Pound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="invoice-prefix" className="pl-10" defaultValue="INV-" />
                    </div>
                    <p className="text-[10px] text-gray-400">Example: INV-1001</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold font-display">Tax Settings</CardTitle>
                  <CardDescription>Configure taxes for your sales and services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Enable Tax</Label>
                      <p className="text-xs text-gray-500">Apply tax to all new invoices</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tax-name">Tax Name</Label>
                      <Input id="tax-name" defaultValue="VAT" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                      <div className="relative">
                        <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input id="tax-rate" type="number" defaultValue="5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Operations Settings */}
          <TabsContent value="operations" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold font-display">Inventory & Sales</CardTitle>
                  <CardDescription>Default values for inventory and POS</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="low-stock">Low Stock Threshold</Label>
                    <div className="relative">
                      <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="low-stock" type="number" className="pl-10" defaultValue="5" />
                    </div>
                    <p className="text-[10px] text-gray-400">Alert when stock falls below this number</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="def-discount">Default Discount (%)</Label>
                    <div className="relative">
                      <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input id="def-discount" type="number" defaultValue="0" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="def-payment">Default Payment Method</Label>
                    <Select defaultValue="cash">
                      <SelectTrigger id="def-payment">
                        <SelectValue placeholder="Select Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="bkash">bKash</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold font-display">Print Settings</CardTitle>
                  <CardDescription>Customize printed invoices and receipts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="print-header">Invoice Header Text</Label>
                    <Textarea id="print-header" className="min-h-[80px]" defaultValue="Aranya Furniture - Quality & Comfort" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="print-footer">Invoice Footer Text</Label>
                    <Textarea id="print-footer" className="min-h-[80px]" defaultValue="Thank you for your business! Goods once sold cannot be returned." />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Show Logo on Print</Label>
                      <p className="text-xs text-gray-500">Include business logo on invoices</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold font-display">Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Theme Mode</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <button className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-orange-500 bg-orange-50/50">
                        <div className="w-full aspect-video bg-white rounded-md border border-gray-200" />
                        <span className="text-xs font-bold text-orange-600">Light</span>
                      </button>
                      <button className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-transparent hover:border-gray-200 transition-colors">
                        <div className="w-full aspect-video bg-gray-900 rounded-md" />
                        <span className="text-xs font-bold text-gray-500">Dark</span>
                      </button>
                      <button className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-transparent hover:border-gray-200 transition-colors">
                        <div className="w-full aspect-video bg-gradient-to-br from-white to-gray-900 rounded-md border border-gray-200" />
                        <span className="text-xs font-bold text-gray-500">System</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">System Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English (US)</SelectItem>
                        <SelectItem value="bn">Bengali (BD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold font-display">Notifications</CardTitle>
                  <CardDescription>Manage system alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Email Notifications</Label>
                      <p className="text-xs text-gray-500">Receive daily summary via email</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Low Stock Alerts</Label>
                      <p className="text-xs text-gray-500">Show dashboard alerts for low stock</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-bold">Due Reminders</Label>
                      <p className="text-xs text-gray-500">Notify when invoice dues are pending</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
