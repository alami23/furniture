'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  UserPlus, 
  RotateCcw, 
  CreditCard, 
  Receipt,
  Edit2,
  ShoppingCart,
  X
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useWood } from '@/lib/context/WoodContext';

interface WoodItem {
  id: string;
  itemNo: string;
  carNo: string;
  treeNo: string;
  width: number;
  length: number;
  cft: number;
  category: string;
  tags: TagOption[];
  selectedTag: string;
  saleRate: number;
}

interface CartItem extends WoodItem {
  cartId: string;
}

const initialInventory: WoodItem[] = [
  { id: '1', itemNo: '1', carNo: '1', treeNo: '101', width: 24, length: 12, cft: 3.00000, category: 'Teak Wood', tags: [{ code: 'BL', price: 1700 }, { code: 'UN2', price: 2250 }], selectedTag: 'BL', saleRate: 1700 },
  { id: '2', itemNo: '2', carNo: '1', treeNo: '102', width: 12, length: 8, cft: 0.50000, category: 'Mahogany', tags: [{ code: 'STD', price: 950 }], selectedTag: 'STD', saleRate: 950 },
  { id: '3', itemNo: '3', carNo: '2', treeNo: '103', width: 18, length: 10, cft: 1.40625, category: 'Pine', tags: [{ code: 'LOC', price: 650 }, { code: 'IMP', price: 850 }], selectedTag: 'LOC', saleRate: 650 },
  { id: '4', itemNo: '4', carNo: '2', treeNo: '201', width: 20, length: 6, cft: 1.04167, category: 'Plywood', tags: [{ code: 'WP18', price: 1500 }], selectedTag: 'WP18', saleRate: 1500 },
  { id: '5', itemNo: '5', carNo: '3', treeNo: '202', width: 48, length: 8, cft: 8.00000, category: 'MDF', tags: [{ code: 'STD', price: 45 }], selectedTag: 'STD', saleRate: 45 },
  { id: '6', itemNo: '6', carNo: '4', treeNo: '301', width: 0, length: 0, cft: 0.00000, category: 'Hardware', tags: [{ code: 'SCR', price: 35 }], selectedTag: 'SCR', saleRate: 35 },
  { id: '7', itemNo: '7', carNo: '5', treeNo: '302', width: 0, length: 0, cft: 0.00000, category: 'Hardware', tags: [{ code: 'HNG', price: 450 }], selectedTag: 'HNG', saleRate: 450 },
  { id: '8', itemNo: '8', carNo: '5', treeNo: '401', width: 0, length: 0, cft: 0.00000, category: 'Finishing', tags: [{ code: 'VAR', price: 850 }], selectedTag: 'VAR', saleRate: 850 },
];

export function POSWood() {
  const { inventory, setInventory, categories: globalCategories, carNos: globalCarNos, tags: globalTags } = useWood();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [carNoFilter, setCarNoFilter] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<'amount' | 'percent'>('amount');
  const [delivery, setDelivery] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  
  const [editingItem, setEditingItem] = useState<WoodItem | null>(null);

  const categoryOptions = useMemo(() => {
    return ['all', ...globalCategories.map(c => c.name)];
  }, [globalCategories]);

  const carNoOptions = useMemo(() => {
    return ['all', ...globalCarNos.map(c => c.number)];
  }, [globalCarNos]);

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
    return cart.reduce((sum, item) => {
      const qty = item.cft > 0 ? item.cft : 1;
      return sum + (item.saleRate * qty);
    }, 0);
  }, [cart]);

  const calculatedDiscount = useMemo(() => {
    if (discountType === 'percent') {
      return subtotal * (discount / 100);
    }
    return discount;
  }, [subtotal, discount, discountType]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - calculatedDiscount + delivery);
  }, [subtotal, calculatedDiscount, delivery]);

  const dueAmount = useMemo(() => {
    return Math.max(0, total - paidAmount);
  }, [total, paidAmount]);

  const handleTagChange = (id: string, newTagCode: string) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newTag = item.tags.find(t => t.code === newTagCode);
        if (newTag) {
          return { ...item, selectedTag: newTag.code, saleRate: newTag.price };
        }
      }
      return item;
    }));
  };

  const addToCart = (product: WoodItem) => {
    setCart(prev => [...prev, { ...product, cartId: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const resetOrder = () => {
    setCart([]);
    setDiscount(0);
    setDelivery(0);
    setPaidAmount(0);
  };

  const handleEditChange = (field: keyof WoodItem, value: any) => {
    if (!editingItem) return;
    
    const updated = { ...editingItem, [field]: value };
    
    if (field === 'width' || field === 'length') {
      const w = field === 'width' ? Number(value) : updated.width;
      const l = field === 'length' ? Number(value) : updated.length;
      updated.cft = (w * w * l) / 2304;
    }
    
    setEditingItem(updated);
  };

  const handleEditTagChange = (index: number, field: keyof TagOption, value: any) => {
    if (!editingItem) return;
    const newTags = [...editingItem.tags];
    newTags[index] = { ...newTags[index], [field]: field === 'price' ? Number(value) : value };
    
    let updated = { ...editingItem, tags: newTags };
    
    // If we updated the currently selected tag's price, update saleRate
    if (newTags[index].code === updated.selectedTag && field === 'price') {
      updated.saleRate = Number(value);
    }
    // If we updated the currently selected tag's code, update selectedTag
    if (editingItem.tags[index].code === updated.selectedTag && field === 'code') {
      updated.selectedTag = value;
    }

    setEditingItem(updated);
  };

  const addEditTag = () => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      tags: [...editingItem.tags, { code: '', price: 0 }]
    });
  };

  const removeEditTag = (index: number) => {
    if (!editingItem) return;
    const newTags = editingItem.tags.filter((_, i) => i !== index);
    let updated = { ...editingItem, tags: newTags };
    
    // If we removed the selected tag, select the first available one
    if (editingItem.tags[index].code === updated.selectedTag && newTags.length > 0) {
      updated.selectedTag = newTags[0].code;
      updated.saleRate = newTags[0].price;
    }
    
    setEditingItem(updated);
  };

  const saveEdit = () => {
    if (!editingItem) return;
    setInventory(prev => prev.map(item => item.id === editingItem.id ? editingItem : item));
    setEditingItem(null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-40px)] bg-[#F8F9FA] -m-6 p-6">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-[67%] flex flex-col gap-4">
        {/* Top Filter Row */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-end gap-4 shrink-0">
          <div className="flex-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block tracking-wider">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search wood items..." 
                className="pl-9 rounded-xl border-gray-200 h-10 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-40">
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block tracking-wider">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="rounded-xl border-gray-200 h-10 shadow-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map(cat => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'All' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-32">
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1.5 block tracking-wider">Car No</label>
            <Select value={carNoFilter} onValueChange={setCarNoFilter}>
              <SelectTrigger className="rounded-xl border-gray-200 h-10 shadow-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                {carNoOptions.map(car => (
                  <SelectItem key={car} value={car}>
                    {car === 'all' ? 'All' : car}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Wood Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1">
            <Table>
              <TableHeader className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
                <TableRow className="border-b border-gray-100 hover:bg-transparent">
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-11 px-4">NO</TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-11 px-4">CAR</TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-11 px-4">TREE NO</TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-11 px-4">WIDTH</TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-11 px-4">LENGTH</TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-11 px-4">CFT</TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-11 px-4">TAG</TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-11 px-4">SELL PRICE</TableHead>
                  <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-11 px-4 text-right">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((item) => (
                  <TableRow key={item.id} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="px-4 py-3 text-sm text-gray-600">{item.itemNo}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-900">{item.carNo}</TableCell>
                    <TableCell className="px-4 py-3 text-sm font-semibold text-emerald-600">{item.treeNo}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-700">{item.width}&quot;</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-700">{item.length}&apos;</TableCell>
                    <TableCell className="px-4 py-3 text-sm font-medium text-gray-900">{item.cft.toFixed(5)}</TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-600">
                      {item.tags.length > 1 ? (
                        <Select 
                          value={item.selectedTag} 
                          onValueChange={(val) => handleTagChange(item.id, val)}
                        >
                          <SelectTrigger className="h-7 text-xs border-gray-200 bg-white shadow-sm w-[110px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {item.tags.map(t => (
                              <SelectItem key={t.code} value={t.code} className="text-xs">
                                {t.code} - ৳{t.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                          {item.selectedTag} - ৳{item.saleRate}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm font-semibold text-orange-500">৳{item.saleRate}</TableCell>
                    <TableCell className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setEditingItem(item)}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 shadow-sm transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => addToCart(item)}
                          className="w-8 h-8 rounded-lg bg-orange-100 hover:bg-orange-200 flex items-center justify-center text-orange-600 shadow-sm transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-[33%] flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center gap-3 shrink-0">
            <ShoppingCart className="w-5 h-5 text-gray-800" />
            <h2 className="text-lg font-bold text-gray-900">Current Order</h2>
          </div>
          
          {/* Customer Selection */}
          <div className="p-4 flex gap-2 shrink-0">
            <Select defaultValue="walk-in">
              <SelectTrigger className="flex-1 rounded-xl border-gray-200 h-10 shadow-sm">
                <SelectValue placeholder="Walk-in Customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="walk-in">Walk-in Customer</SelectItem>
                <SelectItem value="1">Rahim Traders</SelectItem>
                <SelectItem value="2">Karim Wood Works</SelectItem>
              </SelectContent>
            </Select>
            <button className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-200 transition-colors shadow-sm shrink-0">
              <UserPlus className="w-5 h-5" />
            </button>
            <button onClick={resetOrder} className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors shadow-sm shrink-0">
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
          
          {/* Cart Items */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2 pb-4">
              {cart.map(item => {
                const qty = item.cft > 0 ? item.cft : 1;
                const amount = item.saleRate * qty;
                return (
                  <div key={item.cartId} className="bg-slate-50 rounded-xl p-3 flex items-center justify-between border border-slate-100">
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="text-emerald-600 font-semibold">{item.treeNo}</span>
                      <span className="text-gray-500">({item.width}*{item.length})</span>
                      <span className="text-blue-600 font-medium ml-1">{item.selectedTag}</span>
                      <span className="text-gray-400 mx-1">=</span>
                      <span className="font-bold text-gray-900">৳{amount.toFixed(2)}</span>
                    </div>
                    <button onClick={() => removeFromCart(item.cartId)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
              {cart.length === 0 && (
                <div className="text-center py-10 text-gray-400 text-sm">
                  Cart is empty
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Summary */}
          <div className="p-5 border-t border-gray-100 space-y-3.5 bg-white shrink-0">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-semibold text-gray-900">৳{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-medium">Disc.</span>
                <div className="flex bg-slate-100 rounded-lg p-0.5">
                  <button 
                    onClick={() => setDiscountType('amount')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${discountType === 'amount' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    ৳
                  </button>
                  <button 
                    onClick={() => setDiscountType('percent')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${discountType === 'percent' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    %
                  </button>
                </div>
              </div>
              <Input 
                type="number"
                className="w-24 h-8 text-right rounded-lg border-gray-200 shadow-sm" 
                value={discount || ''} 
                onChange={e => setDiscount(Number(e.target.value))} 
                placeholder="0"
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-medium">Delivery</span>
              <Input 
                type="number"
                className="w-24 h-8 text-right rounded-lg border-gray-200 shadow-sm" 
                value={delivery || ''} 
                onChange={e => setDelivery(Number(e.target.value))} 
                placeholder="0"
              />
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="font-bold text-gray-900 text-base">Total</span>
              <span className="font-bold text-gray-900 text-base">৳{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-1">
              <span className="text-emerald-600 font-semibold">Paid</span>
              <Input 
                type="number"
                className="w-24 h-8 text-right rounded-lg border-emerald-200 bg-emerald-50 text-emerald-700 font-bold shadow-sm" 
                value={paidAmount || ''} 
                onChange={e => setPaidAmount(Number(e.target.value))} 
                placeholder="0"
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-red-500 font-semibold">Due</span>
              <span className="text-red-500 font-bold text-base">৳{dueAmount.toFixed(2)}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button variant="outline" className="w-full rounded-xl border-gray-200 hover:bg-gray-50 h-12 font-semibold text-gray-700 shadow-sm">
                <Receipt className="w-4 h-4 mr-2" /> Bill
              </Button>
              <Button className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 h-12 font-bold text-base">
                <CreditCard className="w-4 h-4 mr-2" /> Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit Wood Item</DialogTitle>
          </DialogHeader>
          
          {editingItem && (
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="grid gap-5 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="carNo" className="text-right font-medium text-gray-600">
                    Car No
                  </Label>
                  <Select 
                    value={editingItem.carNo} 
                    onValueChange={(val) => handleEditChange('carNo', val)}
                  >
                    <SelectTrigger className="col-span-3 rounded-xl border-gray-200">
                      <SelectValue placeholder="Select Car No" />
                    </SelectTrigger>
                    <SelectContent>
                      {globalCarNos.map(car => (
                        <SelectItem key={car.id} value={car.number}>{car.number}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="treeNo" className="text-right font-medium text-gray-600">
                    Tree No
                  </Label>
                  <Input
                    id="treeNo"
                    value={editingItem.treeNo}
                    onChange={(e) => handleEditChange('treeNo', e.target.value)}
                    className="col-span-3 rounded-xl border-gray-200"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right font-medium text-gray-600">
                    Category
                  </Label>
                  <Select 
                    value={editingItem.category} 
                    onValueChange={(val) => handleEditChange('category', val)}
                  >
                    <SelectTrigger className="col-span-3 rounded-xl border-gray-200">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {globalCategories.map(cat => (
                        <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="width" className="text-right font-medium text-gray-600">
                    Width (in)
                  </Label>
                  <Input
                    id="width"
                    type="number"
                    value={editingItem.width}
                    onChange={(e) => handleEditChange('width', e.target.value)}
                    className="col-span-3 rounded-xl border-gray-200"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="length" className="text-right font-medium text-gray-600">
                    Length (ft)
                  </Label>
                  <Input
                    id="length"
                    type="number"
                    value={editingItem.length}
                    onChange={(e) => handleEditChange('length', e.target.value)}
                    className="col-span-3 rounded-xl border-gray-200"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-medium text-gray-600">
                    CFT
                  </Label>
                  <div className="col-span-3 font-bold text-gray-900 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                    {editingItem.cft.toFixed(5)}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="font-bold text-gray-900">Tag Options</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addEditTag} className="h-8 rounded-lg">
                      <Plus className="w-4 h-4 mr-1" /> Add Tag
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {editingItem.tags.map((tag, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Select 
                          value={tag.code} 
                          onValueChange={(val) => {
                            const globalTag = globalTags.find(t => t.code === val);
                            if (globalTag) {
                              handleEditTagChange(index, 'code', globalTag.code);
                              handleEditTagChange(index, 'price', globalTag.price);
                            } else {
                              handleEditTagChange(index, 'code', val);
                            }
                          }}
                        >
                          <SelectTrigger className="rounded-xl border-gray-200 w-[140px]">
                            <SelectValue placeholder="Select Tag" />
                          </SelectTrigger>
                          <SelectContent>
                            {globalTags.map(gt => (
                              <SelectItem key={gt.id} value={gt.code}>{gt.code}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input 
                          type="number"
                          placeholder="Price" 
                          value={tag.price || ''}
                          onChange={(e) => handleEditTagChange(index, 'price', e.target.value)}
                          className="rounded-xl border-gray-200 w-32"
                        />
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeEditTag(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4 pt-2">
                  <Label className="text-right font-medium text-gray-600">
                    Default Tag
                  </Label>
                  <Select 
                    value={editingItem.selectedTag} 
                    onValueChange={(val) => {
                      const tag = editingItem.tags.find(t => t.code === val);
                      if (tag) {
                        handleEditChange('selectedTag', val);
                        handleEditChange('saleRate', tag.price);
                      }
                    }}
                  >
                    <SelectTrigger className="col-span-3 rounded-xl border-gray-200">
                      <SelectValue placeholder="Select default tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {editingItem.tags.map(t => (
                        <SelectItem key={t.code} value={t.code}>
                          {t.code} - ৳{t.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

              </div>
            </ScrollArea>
          )}
          
          <DialogFooter className="pt-4 border-t border-gray-100 mt-2 shrink-0">
            <Button variant="outline" onClick={() => setEditingItem(null)} className="rounded-xl border-gray-200">Cancel</Button>
            <Button onClick={saveEdit} className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
