'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Plus, 
  Trash2, 
  UserPlus, 
  RotateCcw, 
  CreditCard, 
  Printer,
  LayoutGrid,
  List,
  ShoppingCart,
  Calendar as CalendarIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
import { mockProducts } from '@/data/mock-data';
import { Product } from '@/types';
import { formatCurrency, cn } from '@/lib/utils';
import { CustomerSelect } from '@/components/pos/CustomerSelect';
import { CustomerForm } from '@/components/customer/CustomerForm';
import { useCustomers } from '@/lib/context/CustomerContext';
import { InvoicePreviewModal, InvoiceData } from '@/components/pos/InvoicePreviewModal';
import { CheckoutSuccessModal } from '@/components/pos/CheckoutSuccessModal';

interface CartItem extends Product {
  quantity: number;
}

export function POSFurniture() {
  const { customers, addCustomer } = useCustomers();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('walk-in');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [deliveryCharge, setDeliveryCharge] = useState<number>(0);
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [isCustomerFormOpen, setIsCustomerFormOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  // Filter products to only show furniture
  const furnitureProducts = useMemo(() => {
    return mockProducts.filter(p => p.type === 'furniture');
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(furnitureProducts.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, [furnitureProducts]);

  const filteredProducts = useMemo(() => {
    return furnitureProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [furnitureProducts, searchQuery, categoryFilter]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  const total = useMemo(() => {
    return subtotal - discount + deliveryCharge;
  }, [subtotal, discount, deliveryCharge]);

  const dueAmount = useMemo(() => {
    return Math.max(0, total - paidAmount);
  }, [total, paidAmount]);

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) return;
    
    const invoiceId = Date.now().toString().slice(-6);
    const customer = customers.find(c => c.id === selectedCustomer) || {
      name: 'Walk-in Customer',
      phone: 'N/A',
      address: 'N/A',
      openingBalance: 0
    };

    const data: InvoiceData = {
      invoiceNo: `INV-${invoiceId}`,
      date: new Date().toLocaleDateString(),
      type: 'furniture',
      deliveryDate: deliveryDate || undefined,
      customer: {
        name: customer.name,
        phone: customer.phone || 'N/A',
        address: customer.address || 'N/A',
        previousDue: customer.openingBalance || 0
      },
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        description: item.category,
        quantity: item.quantity,
        rate: item.price,
        amount: item.price * item.quantity
      })),
      subtotal,
      discount,
      deliveryCharge,
      total,
      paid: paidAmount,
      due: dueAmount,
      netDue: (customer.openingBalance || 0) + dueAmount
    };

    setInvoiceData(data);
    setIsSuccessModalOpen(true);
  }, [cart, customers, selectedCustomer, deliveryDate, subtotal, discount, deliveryCharge, total, paidAmount, dueAmount]);

  const addToCart = (product: Product) => {
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
    setDeliveryCharge(0);
    setDeliveryDate('');
    setPaidAmount(0);
    setSelectedCustomer('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
      {/* Left Side: Product Gallery */}
      <div className="lg:col-span-9 flex flex-col gap-4 overflow-hidden">
        <Card className="border-none shadow-sm shrink-0">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search furniture..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val || 'all')}>
                <SelectTrigger className="w-[180px]">
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
              <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn("h-8 w-8", viewMode === 'grid' ? "bg-white shadow-sm" : "hover:bg-gray-200")}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn("h-8 w-8", viewMode === 'list' ? "bg-white shadow-sm" : "hover:bg-gray-200")}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <ScrollArea className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card 
                    className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={() => addToCart(product)}
                  >
                    <div className="relative h-48 w-full bg-gray-100">
                      <Image 
                        src={product.image || 'https://picsum.photos/seed/furniture/400/300'} 
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-white/90 text-gray-900 hover:bg-white border-none backdrop-blur-sm">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className={cn(
                          "border-none backdrop-blur-sm",
                          product.stock > 0 ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
                        )}>
                          {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-lg font-black text-orange-600">{formatCurrency(product.price)}</p>
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="border-none shadow-sm hover:bg-orange-50/30 transition-colors cursor-pointer group"
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-3 flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
                      <Image 
                        src={product.image || 'https://picsum.photos/seed/furniture/400/300'} 
                        alt={product.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                        <Badge variant="secondary" className="text-[10px] h-4 px-1">{product.category}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">Stock: {product.stock} {product.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-orange-600">{formatCurrency(product.price)}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Right Side: Order Panel */}
      <div className="lg:col-span-4 flex flex-col h-full min-h-0">
        <Card className="border-none shadow-lg flex flex-col h-full bg-white">
          <CardHeader className="pb-4 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-orange-500" />
                <CardTitle className="text-lg font-bold font-display">Current Order</CardTitle>
              </div>
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
              <CustomerSelect 
                value={selectedCustomer} 
                onChange={setSelectedCustomer} 
              />
              <Button 
                onClick={() => setIsCustomerFormOpen(true)}
                variant="outline" 
                size="icon" 
                className="shrink-0 border-dashed border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <UserPlus className="w-4 h-4" />
              </Button>
            </div>

            <Separator className="shrink-0" />

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto -mx-2 px-2 min-h-0">
              <AnimatePresence initial={false}>
                {cart.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="w-8 h-8 text-gray-200" />
                    </div>
                    <p className="text-sm text-gray-400">Your cart is empty</p>
                    <p className="text-xs text-gray-300 mt-1">Select products from the gallery</p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50/50 border border-gray-100 group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0">
                              <Image 
                                src={item.image || 'https://picsum.photos/seed/furniture/400/300'} 
                                alt={item.name}
                                fill
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-bold leading-tight">{item.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{formatCurrency(item.price)}</p>
                            </div>
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
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Totals Section */}
            <div className="space-y-3 pt-4 border-t border-gray-100 shrink-0">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="font-bold">{formatCurrency(subtotal)}</span>
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
                  <label className="text-[10px] uppercase font-bold text-gray-400">Delivery Charge</label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">৳</span>
                    <Input 
                      type="number" 
                      className="h-8 pl-5 text-xs font-bold" 
                      value={deliveryCharge || ''}
                      onChange={(e) => setDeliveryCharge(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-gray-400">Delivery Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <Input 
                    type="date" 
                    className="h-8 pl-8 text-xs font-medium" 
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
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
                  <Printer className="w-4 h-4 mr-2" /> Bill
                </Button>
                <Button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Customer Modal */}
      <CustomerForm
        customer={null}
        isOpen={isCustomerFormOpen}
        onClose={() => setIsCustomerFormOpen(false)}
        onSave={(customerData) => {
          addCustomer(customerData as any);
          setSelectedCustomer(customerData.id!);
          setIsCustomerFormOpen(false);
        }}
      />

      {/* Success Modal */}
      <CheckoutSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          resetOrder();
        }}
        onPrint={() => {
          setIsSuccessModalOpen(false);
          setIsInvoiceModalOpen(true);
        }}
        type="furniture"
      />

      {/* Invoice Preview Modal */}
      <InvoicePreviewModal
        isOpen={isInvoiceModalOpen}
        onClose={() => {
          setIsInvoiceModalOpen(false);
          resetOrder();
        }}
        data={invoiceData}
        onPrintComplete={() => {
          setIsInvoiceModalOpen(false);
          resetOrder();
        }}
      />
    </div>
  );
}
