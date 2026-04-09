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
  phone: string;
  email: string;
  address: string;
  designation: string;
  department: string;
  salary: number;
  joiningDate: string;
  status: 'active' | 'inactive';
  nid: string;
  notes?: string;
}

export type ProductType = 'furniture' | 'wood';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  subCategory?: string;
  type: ProductType;
  material?: string;
  color?: string;
  size?: string;
  price: number;
  cost: number;
  stock: number;
  unit: string;
  reorderLevel: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  image?: string;
  note?: string;
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
  category: 'Rent' | 'Salary' | 'Electricity' | 'Internet' | 'Transport' | 'Material Purchase' | 'Maintenance' | 'Marketing' | 'Miscellaneous';
  amount: number;
  paidAmount: number;
  dueAmount: number;
  status: 'paid' | 'unpaid' | 'partial';
  notes?: string;
}

export interface WoodInventoryItem {
  id: string;
  itemNo: string;
  carNo: string;
  treeNo: string;
  woodType: string;
  width: number;
  length: number;
  thickness: number;
  cft: number;
  unit: string;
  stockQty: number;
  purchaseRate: number;
  saleRate: number;
  category: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  referenceType: 'Sale' | 'Customer Payment' | 'Bill Payment' | 'Salary Payment' | 'Purchase' | 'Adjustment' | 'Expense';
  referenceNo: string;
  account: string;
  category: string;
  amount: number;
  paymentMethod: 'cash' | 'bkash' | 'bank' | 'nagad';
  status: 'completed' | 'pending' | 'cancelled';
  note?: string;
}

export interface CustomerStatementEntry {
  id: string;
  customerId: string;
  date: string;
  reference: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface Category {
  id: string;
  name: string;
  type: ProductType;
  description?: string;
  status: 'active' | 'inactive';
  itemCount: number;
}

export interface StaffStatementEntry {
  id: string;
  staffId: string;
  date: string;
  type: 'Salary' | 'Advance' | 'Bonus' | 'Deduction';
  reference: string;
  amount: number;
  deduction: number;
  bonus: number;
  paid: number;
  due: number;
}

export interface SMSLog {
  id: string;
  recipientName: string;
  recipientPhone: string;
  recipientType: 'customer' | 'staff';
  message: string;
  type: 'Due Reminder' | 'Delivery Ready' | 'Payment Received' | 'Thank You' | 'Promotional' | 'Custom';
  status: 'sent' | 'failed' | 'pending';
  sentAt: string;
}

export interface SMSTemplate {
  id: string;
  name: string;
  content: string;
  type: SMSLog['type'];
}
