'use client';

import React, { createContext, useContext, useState } from 'react';

export interface Category { id: string; name: string; }
export interface CarNo { id: string; number: string; }
export interface Tag { id: string; code: string; price: number; }

export interface TagOption { code: string; price: number; }

export interface WoodItem {
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

interface WoodContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  carNos: CarNo[];
  setCarNos: React.Dispatch<React.SetStateAction<CarNo[]>>;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  inventory: WoodItem[];
  setInventory: React.Dispatch<React.SetStateAction<WoodItem[]>>;
}

const WoodContext = createContext<WoodContextType | undefined>(undefined);

export function WoodProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Teak Wood' },
    { id: '2', name: 'Mahogany' },
    { id: '3', name: 'Pine' },
    { id: '4', name: 'Plywood' },
    { id: '5', name: 'MDF' },
    { id: '6', name: 'Hardware' },
    { id: '7', name: 'Finishing Materials' },
  ]);

  const [carNos, setCarNos] = useState<CarNo[]>([
    { id: '1', number: '1' },
    { id: '2', number: '2' },
    { id: '3', number: '3' },
    { id: '4', number: '4' },
    { id: '5', number: '5' },
  ]);

  const [tags, setTags] = useState<Tag[]>([
    { id: '1', code: 'BL', price: 1700 },
    { id: '2', code: 'UN2', price: 2250 },
    { id: '3', code: 'OV2', price: 3000 },
  ]);

  const [inventory, setInventory] = useState<WoodItem[]>([
    { id: '1', itemNo: '1', carNo: '1', treeNo: '101', width: 24, length: 12, cft: 3.00000, category: 'Teak Wood', tags: [{ code: 'BL', price: 1700 }, { code: 'UN2', price: 2250 }], selectedTag: 'BL', saleRate: 1700 },
    { id: '2', itemNo: '2', carNo: '1', treeNo: '102', width: 12, length: 8, cft: 0.50000, category: 'Mahogany', tags: [{ code: 'STD', price: 950 }], selectedTag: 'STD', saleRate: 950 },
    { id: '3', itemNo: '3', carNo: '2', treeNo: '103', width: 18, length: 10, cft: 1.40625, category: 'Pine', tags: [{ code: 'LOC', price: 650 }, { code: 'IMP', price: 850 }], selectedTag: 'LOC', saleRate: 650 },
    { id: '4', itemNo: '4', carNo: '2', treeNo: '201', width: 20, length: 6, cft: 1.04167, category: 'Plywood', tags: [{ code: 'WP18', price: 1500 }], selectedTag: 'WP18', saleRate: 1500 },
    { id: '5', itemNo: '5', carNo: '3', treeNo: '202', width: 48, length: 8, cft: 8.00000, category: 'MDF', tags: [{ code: 'STD', price: 45 }], selectedTag: 'STD', saleRate: 45 },
    { id: '6', itemNo: '6', carNo: '4', treeNo: '301', width: 0, length: 0, cft: 0.00000, category: 'Hardware', tags: [{ code: 'SCR', price: 35 }], selectedTag: 'SCR', saleRate: 35 },
    { id: '7', itemNo: '7', carNo: '5', treeNo: '302', width: 0, length: 0, cft: 0.00000, category: 'Hardware', tags: [{ code: 'HNG', price: 450 }], selectedTag: 'HNG', saleRate: 450 },
    { id: '8', itemNo: '8', carNo: '5', treeNo: '401', width: 0, length: 0, cft: 0.00000, category: 'Finishing', tags: [{ code: 'VAR', price: 850 }], selectedTag: 'VAR', saleRate: 850 },
  ]);

  return (
    <WoodContext.Provider value={{ categories, setCategories, carNos, setCarNos, tags, setTags, inventory, setInventory }}>
      {children}
    </WoodContext.Provider>
  );
}

export function useWood() {
  const context = useContext(WoodContext);
  if (!context) throw new Error('useWood must be used within WoodProvider');
  return context;
}
