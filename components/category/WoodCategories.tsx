'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2,
  Search
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useWood, Category, CarNo, Tag } from '@/lib/context/WoodContext';

export function WoodCategories() {
  // --- State ---
  const { categories, setCategories, carNos, setCarNos, tags, setTags } = useWood();

  const [searchCategory, setSearchCategory] = useState('');
  const [searchCarNo, setSearchCarNo] = useState('');
  const [searchTag, setSearchTag] = useState('');

  // Modals state
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const [editingCarNo, setEditingCarNo] = useState<CarNo | null>(null);
  const [isAddingCarNo, setIsAddingCarNo] = useState(false);

  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [isAddingTag, setIsAddingTag] = useState(false);

  // --- Filtered Data ---
  const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(searchCategory.toLowerCase()));
  const filteredCarNos = carNos.filter(c => c.number.includes(searchCarNo));
  const filteredTags = tags.filter(t => t.code.toLowerCase().includes(searchTag.toLowerCase()));

  // --- Handlers: Category ---
  const saveCategory = () => {
    if (!editingCategory) return;
    if (isAddingCategory) {
      setCategories([...categories, { ...editingCategory, id: Math.random().toString(36).substr(2, 9) }]);
    } else {
      setCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
    }
    setEditingCategory(null);
    setIsAddingCategory(false);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  // --- Handlers: Car No ---
  const saveCarNo = () => {
    if (!editingCarNo) return;
    if (isAddingCarNo) {
      setCarNos([...carNos, { ...editingCarNo, id: Math.random().toString(36).substr(2, 9) }]);
    } else {
      setCarNos(carNos.map(c => c.id === editingCarNo.id ? editingCarNo : c));
    }
    setEditingCarNo(null);
    setIsAddingCarNo(false);
  };

  const deleteCarNo = (id: string) => {
    setCarNos(carNos.filter(c => c.id !== id));
  };

  // --- Handlers: Tag ---
  const saveTag = () => {
    if (!editingTag) return;
    if (isAddingTag) {
      setTags([...tags, { ...editingTag, id: Math.random().toString(36).substr(2, 9) }]);
    } else {
      setTags(tags.map(t => t.id === editingTag.id ? editingTag : t));
    }
    setEditingTag(null);
    setIsAddingTag(false);
  };

  const deleteTag = (id: string) => {
    setTags(tags.filter(t => t.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      
      {/* SECTION 1: CATEGORY */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
        <div className="p-4 border-b border-gray-100 flex flex-col gap-3 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Category</h2>
            <Button 
              onClick={() => { setEditingCategory({ id: '', name: '' }); setIsAddingCategory(true); }} 
              className="h-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow-sm px-3 text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Category
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search category..." 
              className="pl-9 rounded-xl border-gray-200 h-9 w-full shadow-sm text-sm"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <Table>
            <TableHeader className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-10 px-4 w-12">ID</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-10 px-4">CATEGORY NAME</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-10 px-4 text-right w-20">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((item, index) => (
                <TableRow key={item.id} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="px-4 py-2.5 text-sm text-gray-600">{index + 1}</TableCell>
                  <TableCell className="px-4 py-2.5 text-sm font-semibold text-gray-900">{item.name}</TableCell>
                  <TableCell className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => { setEditingCategory(item); setIsAddingCategory(false); }}
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 shadow-sm transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => deleteCategory(item.id)}
                        className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 shadow-sm transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCategories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-gray-500 text-sm">No categories found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* SECTION 2: CAR NO */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
        <div className="p-4 border-b border-gray-100 flex flex-col gap-3 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Car No</h2>
            <Button 
              onClick={() => { setEditingCarNo({ id: '', number: '' }); setIsAddingCarNo(true); }} 
              className="h-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow-sm px-3 text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Car No
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search car no..." 
              className="pl-9 rounded-xl border-gray-200 h-9 w-full shadow-sm text-sm"
              value={searchCarNo}
              onChange={(e) => setSearchCarNo(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <Table>
            <TableHeader className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-10 px-4 w-12">ID</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-10 px-4">CAR NUMBER</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-10 px-4 text-right w-20">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCarNos.map((item, index) => (
                <TableRow key={item.id} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="px-4 py-2.5 text-sm text-gray-600">{index + 1}</TableCell>
                  <TableCell className="px-4 py-2.5 text-sm font-semibold text-gray-900">{item.number}</TableCell>
                  <TableCell className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => { setEditingCarNo(item); setIsAddingCarNo(false); }}
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 shadow-sm transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => deleteCarNo(item.id)}
                        className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 shadow-sm transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCarNos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-gray-500 text-sm">No car numbers found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* SECTION 3: TAG */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
        <div className="p-4 border-b border-gray-100 flex flex-col gap-3 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Tag</h2>
            <Button 
              onClick={() => { setEditingTag({ id: '', code: '', price: 0 }); setIsAddingTag(true); }} 
              className="h-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow-sm px-3 text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Tag
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search tag code..." 
              className="pl-9 rounded-xl border-gray-200 h-9 w-full shadow-sm text-sm"
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <Table>
            <TableHeader className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-10 px-4 w-12">ID</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-10 px-4">TAG CODE</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-10 px-4">PRICE</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-500 uppercase h-10 px-4 text-right w-20">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTags.map((item, index) => (
                <TableRow key={item.id} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="px-4 py-2.5 text-sm text-gray-600">{index + 1}</TableCell>
                  <TableCell className="px-4 py-2.5 text-sm font-semibold text-gray-900">{item.code}</TableCell>
                  <TableCell className="px-4 py-2.5 text-sm font-medium text-orange-600">৳{item.price}</TableCell>
                  <TableCell className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => { setEditingTag(item); setIsAddingTag(false); }}
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 shadow-sm transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => deleteTag(item.id)}
                        className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 shadow-sm transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTags.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500 text-sm">No tags found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* --- Modals --- */}
      
      {/* Category Modal */}
      <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {isAddingCategory ? 'Add Category' : 'Edit Category'}
            </DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="categoryName" className="font-medium text-gray-700">Category Name</Label>
                <Input
                  id="categoryName"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="rounded-xl border-gray-200"
                  placeholder="e.g. Teak Wood"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCategory(null)} className="rounded-xl border-gray-200">Cancel</Button>
            <Button onClick={saveCategory} className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Car No Modal */}
      <Dialog open={!!editingCarNo} onOpenChange={(open) => !open && setEditingCarNo(null)}>
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {isAddingCarNo ? 'Add Car No' : 'Edit Car No'}
            </DialogTitle>
          </DialogHeader>
          {editingCarNo && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="carNumber" className="font-medium text-gray-700">Car Number</Label>
                <Input
                  id="carNumber"
                  type="number"
                  value={editingCarNo.number}
                  onChange={(e) => setEditingCarNo({ ...editingCarNo, number: e.target.value })}
                  className="rounded-xl border-gray-200"
                  placeholder="e.g. 1"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCarNo(null)} className="rounded-xl border-gray-200">Cancel</Button>
            <Button onClick={saveCarNo} className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tag Modal */}
      <Dialog open={!!editingTag} onOpenChange={(open) => !open && setEditingTag(null)}>
        <DialogContent className="sm:max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {isAddingTag ? 'Add Tag' : 'Edit Tag'}
            </DialogTitle>
          </DialogHeader>
          {editingTag && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tagCode" className="font-medium text-gray-700">Tag Code</Label>
                <Input
                  id="tagCode"
                  value={editingTag.code}
                  onChange={(e) => setEditingTag({ ...editingTag, code: e.target.value })}
                  className="rounded-xl border-gray-200"
                  placeholder="e.g. BL"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tagPrice" className="font-medium text-gray-700">Price (৳)</Label>
                <Input
                  id="tagPrice"
                  type="number"
                  value={editingTag.price || ''}
                  onChange={(e) => setEditingTag({ ...editingTag, price: Number(e.target.value) })}
                  className="rounded-xl border-gray-200"
                  placeholder="e.g. 1700"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTag(null)} className="rounded-xl border-gray-200">Cancel</Button>
            <Button onClick={saveTag} className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
