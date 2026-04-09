export interface Customer {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  imo?: string;
  email?: string;
  address: string;
  area: string;
  district: string;
  totalOrders: number;
  totalSpent: number;
  dueAmount: number;
  creditLimit: number;
  lastOrderDate: string;
  createdAt: string;
  notes?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  salary: number;
  joiningDate: string;
  status: 'active' | 'inactive';
}

export type ProductType = 'furniture' | 'wood';

export interface Product {
  id: string;
  name: string;
  category: string;
  type: ProductType;
  price: number;
  cost: number;
  stock: number;
  unit: string;
  minStock: number;
  image?: string;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  customerId: string;
  customerName: string;
  date: string;
  deliveryDate?: string;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  tax: number;
  totalAmount: number;
  advanceAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: 'paid' | 'unpaid' | 'partial';
  items: InvoiceItem[];
  note?: string;
}

export interface InvoiceItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Bill {
  id: string;
  billNo: string;
  vendorName: string;
  date: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'partial';
}

export interface WoodInventoryItem {
  id: string;
  no: string;
  carNo: string;
  treeNo: string;
  width: number;
  length: number;
  cft: number;
  tag: string;
  rate: number;
  category: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  paymentMethod: 'cash' | 'bkash' | 'bank' | 'nagad';
}
