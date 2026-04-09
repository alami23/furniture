'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  UserPlus, 
  RotateCcw, 
  CreditCard, 
  Receipt,
  Edit2,
  Filter
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { mockWoodInventory, mockCustomers } from '@/data/mock-data';
import { WoodInventoryItem, Customer } from '@/types';
import { formatCurrency, cn } from '@/lib/utils';

interface CartItem extends WoodInventoryItem {
  quantity: number;
}

export function POSWood() {
  const [inventory, setInventory] = useState<WoodInventoryItem[]>(mockWoodInventory);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [carNoFilter, setCarNoFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [delivery, setDelivery] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  
  // Edit Modal State
  const [editingItem, setEditingItem] = useState<WoodInventoryItem | null>(null);

  // Derived state
  const categories = useMemo(() => {
    const cats = new Set(inventory.map(item => item.category));
    return ['all', ...Array.from(cats)];
  }, [inventory]);

  const carNumbers = useMemo(() => {
    const cars = new Set(inventory.map(item => item.carNo));
    return ['all', ...Array.from(cars)];
  }, [inventory]);

  const filteredProducts = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = item.treeNo.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesCar = carNoFilter === 'all' || item.carNo === carNoFilter;
      return matchesSearch && matchesCategory && matchesCar;
    });
  }, [inventory, searchQuery, categoryFilter, carNoFilter]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.saleRate * item.cft * item.quantity), 0);
  }, [cart]);

  const total = useMemo(() => {
    return subtotal - discount + delivery;
  }, [subtotal, discount, delivery]);

  const dueAmount = useMemo(() => {
    return Math.max(0, total - paidAmount);
  }, [total, paidAmount]);

  // Actions
  const addToCart = (product: WoodInventoryItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: qty } : item
    ));
  };

  const resetOrder = () => {
    setCart([]);
    setDiscount(0);
    setDelivery(0);
    setPaidAmount(0);
    setSelectedCustomer('');
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    setInventory(prev => prev.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-120px)]">
      {/* Left Side: Product Selection */}
      <div className="lg:col-span-8 flex flex-col gap-4 overflow-hidden">
        <Card className="border-none shadow-sm shrink-0">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search Tree No or Category..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val || 'all')}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2 text-gray-400" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={carNoFilter} onValueChange={(val) => setCarNoFilter(val || 'all')}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Car No" />
                </SelectTrigger>
                <SelectContent>
                  {carNumbers.map(car => (
                    <SelectItem key={car} value={car}>
                      {car === 'all' ? 'All Cars' : car}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm flex-1 overflow-hidden">
          <CardContent className="p-0 h-full">
            <ScrollArea className="h-full">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[50px]">NO</TableHead>
                    <TableHead>CAR</TableHead>
                    <TableHead>TREE NO</TableHead>
                    <TableHead>WIDTH</TableHead>
                    <TableHead>LENGTH</TableHead>
                    <TableHead>CFT</TableHead>
                    <TableHead>TAG</TableHead>
                    <TableHead>SELL PRICE</TableHead>
                    <TableHead className="text-right">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((item) => (
                    <TableRow key={item.id} className="group hover:bg-orange-50/50 transition-colors">
                      <TableCell className="font-medium">{item.itemNo}</TableCell>
                      <TableCell>{item.carNo.replace(/\D/g, '')}</TableCell>
                      <TableCell className="font-semibold text-green-700">{item.treeNo.replace(/\D/g, '')}</TableCell>
                      <TableCell>{item.width}&quot;</TableCell>
                      <TableCell>{item.length}&apos;</TableCell>
                      <TableCell className="font-bold">{item.cft.toFixed(5)}</TableCell>
                      <TableCell className="text-xs text-gray-600 max-w-[150px] truncate" title={item.notes || ''}>
                        {item.notes || '-'}
                      </TableCell>
                      <TableCell className="font-bold text-orange-600">{formatCurrency(item.saleRate)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-400 hover:text-blue-600"
                            onClick={() => setEditingItem(item)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost"
                            size="icon" 
                            className="h-8 w-8 text-gray-400 hover:text-orange-600"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Right Side: Order Panel */}
      <div className="lg:col-span-4 flex flex-col h-full">
        <Card className="border-none shadow-lg flex flex-col h-full bg-white">
          <CardHeader className="pb-4 shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold font-display">Current Order</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-red-600"
                onClick={resetOrder}
              >
                <RotateCcw className="w-4 h-4 mr-1" /> Reset
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden pt-0">
            {/* Customer Selection */}
            <div className="flex gap-2 shrink-0">
              <Select value={selectedCustomer} onValueChange={(val) => setSelectedCustomer(val || '')}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select Customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="shrink-0 border-dashed border-orange-200 text-orange-600 hover:bg-orange-50">
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>

            <Separator className="shrink-0" />

            {/* Cart Items */}
            <ScrollArea className="flex-1 -mx-2 px-2">
              <div className="space-y-3">
                {cart.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Receipt className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50/50 border border-gray-100 group">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-bold">{item.treeNo} - {item.category}</p>
                          <p className="text-xs text-gray-500">{item.cft} CFT @ {formatCurrency(item.saleRate)}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center border rounded-lg bg-white overflow-hidden">
                          <button 
                            className="px-2 py-1 hover:bg-gray-100 text-gray-500"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >-</button>
                          <span className="px-3 py-1 text-xs font-bold border-x min-w-[40px] text-center">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 hover:bg-gray-100 text-gray-500"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >+</button>
                        </div>
                        <p className="text-sm font-bold text-orange-600">
                          {formatCurrency(item.saleRate * item.cft * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            {/* Totals Section */}
            <div className="space-y-3 pt-4 border-t border-gray-100 shrink-0">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Discount</label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">৳</span>
                    <Input 
                      type="number" 
                      className="h-8 pl-5 text-xs font-bold" 
                      value={discount || ''}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Delivery</label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">৳</span>
                    <Input 
                      type="number" 
                      className="h-8 pl-5 text-xs font-bold" 
                      value={delivery || ''}
                      onChange={(e) => setDelivery(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center py-2 px-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-bold text-orange-900">Total Amount</span>
                <span className="text-xl font-black text-orange-600">{formatCurrency(total)}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Paid Amount</label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">৳</span>
                    <Input 
                      type="number" 
                      className="h-8 pl-5 text-xs font-bold text-green-600" 
                      value={paidAmount || ''}
                      onChange={(e) => setPaidAmount(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-gray-400">Due Amount</label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">৳</span>
                    <Input 
                      type="number" 
                      readOnly
                      className="h-8 pl-5 text-xs font-bold text-red-600 bg-gray-50" 
                      value={dueAmount}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50">
                  <Receipt className="w-4 h-4 mr-2" /> Bill
                </Button>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200">
                  <CreditCard className="w-4 h-4 mr-2" /> Checkout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Wood Item</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="carNo" className="text-right">
                  Car
                </Label>
                <Input
                  id="carNo"
                  value={editingItem.carNo}
                  onChange={(e) => setEditingItem({ ...editingItem, carNo: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="treeNo" className="text-right">
                  Tree No
                </Label>
                <Input
                  id="treeNo"
                  value={editingItem.treeNo}
                  onChange={(e) => setEditingItem({ ...editingItem, treeNo: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="width" className="text-right">
                  Width
                </Label>
                <Input
                  id="width"
                  type="number"
                  value={editingItem.width}
                  onChange={(e) => setEditingItem({ ...editingItem, width: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="length" className="text-right">
                  Length
                </Label>
                <Input
                  id="length"
                  type="number"
                  value={editingItem.length}
                  onChange={(e) => setEditingItem({ ...editingItem, length: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="saleRate" className="text-right">
                  Sell Price
                </Label>
                <Input
                  id="saleRate"
                  type="number"
                  value={editingItem.saleRate}
                  onChange={(e) => setEditingItem({ ...editingItem, saleRate: Number(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
