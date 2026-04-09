import { Customer, Staff, Product, Invoice, Bill, Transaction, WoodInventoryItem, CustomerStatementEntry } from '../types';

export const mockWoodInventory: WoodInventoryItem[] = [
  { id: '1', no: '01', carNo: 'D-101', treeNo: 'T-505', width: 12, length: 10, cft: 120, tag: 'A+', rate: 1200, category: 'Teak Wood' },
  { id: '2', no: '02', carNo: 'D-101', treeNo: 'T-506', width: 14, length: 12, cft: 168, tag: 'A', rate: 1100, category: 'Teak Wood' },
  { id: '3', no: '03', carNo: 'G-202', treeNo: 'M-101', width: 10, length: 8, cft: 80, tag: 'B', rate: 800, category: 'Mahogany' },
  { id: '4', no: '04', carNo: 'G-202', treeNo: 'M-102', width: 15, length: 15, cft: 225, tag: 'A+', rate: 950, category: 'Mahogany' },
  { id: '5', no: '05', carNo: 'C-303', treeNo: 'P-001', width: 8, length: 20, cft: 160, tag: 'C', rate: 500, category: 'Pine' },
  { id: '6', no: '06', carNo: 'C-303', treeNo: 'P-002', width: 10, length: 10, cft: 100, tag: 'B', rate: 550, category: 'Pine' },
  { id: '7', no: '07', carNo: 'S-404', treeNo: 'PL-01', width: 48, length: 96, cft: 32, tag: 'Plywood', rate: 150, category: 'Plywood' },
  { id: '8', no: '08', carNo: 'S-404', treeNo: 'MDF-01', width: 48, length: 96, cft: 32, tag: 'MDF', rate: 120, category: 'MDF' },
];

export const mockCustomers: Customer[] = [
  { 
    id: '1', 
    name: 'Rahim Traders', 
    phone: '01711223344', 
    whatsapp: '01711223344',
    imo: '01711223344',
    email: 'rahim@traders.com',
    address: '12/A, Mirpur Road', 
    area: 'Mirpur',
    district: 'Dhaka',
    totalOrders: 15, 
    totalSpent: 450000, 
    dueAmount: 50000, 
    creditLimit: 100000,
    lastOrderDate: '2026-04-01',
    createdAt: '2024-01-10',
    notes: 'Regular customer, prefers Teak wood.'
  },
  { 
    id: '2', 
    name: 'Noor Furniture House', 
    phone: '01822334455', 
    whatsapp: '01822334455',
    address: 'Station Road', 
    area: 'Chowrasta',
    district: 'Gazipur',
    totalOrders: 8, 
    totalSpent: 280000, 
    dueAmount: 0, 
    creditLimit: 50000,
    lastOrderDate: '2026-03-25',
    createdAt: '2024-03-15'
  },
  { 
    id: '3', 
    name: 'Bismillah Enterprise', 
    phone: '01933445566', 
    whatsapp: '01933445566',
    imo: '01933445566',
    address: 'Narayanganj Sadar', 
    area: 'Chashara',
    district: 'Narayanganj',
    totalOrders: 22, 
    totalSpent: 850000, 
    dueAmount: 120000, 
    creditLimit: 200000,
    lastOrderDate: '2026-04-05',
    createdAt: '2023-11-20',
    notes: 'Large scale orders, always pays in partial.'
  },
  { 
    id: '4', 
    name: 'Al Madina Decor', 
    phone: '01644556677', 
    address: 'Agrabad C/A', 
    area: 'Agrabad',
    district: 'Chattogram',
    totalOrders: 5, 
    totalSpent: 120000, 
    dueAmount: 15000, 
    creditLimit: 30000,
    lastOrderDate: '2026-03-10',
    createdAt: '2025-01-05'
  },
  { 
    id: '5', 
    name: 'Karim Wood Works', 
    phone: '01555667788', 
    whatsapp: '01555667788',
    address: 'Khulna Bypass', 
    area: 'Daulatpur',
    district: 'Khulna',
    totalOrders: 12, 
    totalSpent: 340000, 
    dueAmount: 0, 
    creditLimit: 80000,
    lastOrderDate: '2026-04-02',
    createdAt: '2024-06-12'
  },
  { 
    id: '6', 
    name: 'M/S Shapla Furniture', 
    phone: '01799887766', 
    whatsapp: '01799887766',
    address: 'Zindabazar', 
    area: 'Zindabazar',
    district: 'Sylhet',
    totalOrders: 3, 
    totalSpent: 45000, 
    dueAmount: 5000, 
    creditLimit: 20000,
    lastOrderDate: '2026-03-28',
    createdAt: '2025-02-15'
  },
  { 
    id: '7', 
    name: 'New Dhaka Wood Store', 
    phone: '01311223344', 
    address: 'Uttara Sector 7', 
    area: 'Uttara',
    district: 'Dhaka',
    totalOrders: 10, 
    totalSpent: 180000, 
    dueAmount: 0, 
    creditLimit: 100000,
    lastOrderDate: '2026-04-08',
    createdAt: '2024-08-20'
  },
];

export const mockStaff: Staff[] = [
  { id: '1', name: 'Alamin', role: 'Manager', phone: '01700000001', email: 'alamin@aranya.com', salary: 35000, joiningDate: '2024-01-15', status: 'active' },
  { id: '2', name: 'Rakib', role: 'Sales Executive', phone: '01700000002', email: 'rakib@aranya.com', salary: 22000, joiningDate: '2024-05-20', status: 'active' },
  { id: '3', name: 'Hasan', role: 'Carpenter', phone: '01700000003', email: 'hasan@aranya.com', salary: 25000, joiningDate: '2023-11-10', status: 'active' },
  { id: '4', name: 'Sohel', role: 'Delivery Man', phone: '01700000004', email: 'sohel@aranya.com', salary: 18000, joiningDate: '2025-02-01', status: 'active' },
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Royal King Size Bed', category: 'Bed', type: 'furniture', price: 85000, cost: 62000, stock: 5, unit: 'pcs', minStock: 2, image: 'https://picsum.photos/seed/bed/400/300' },
  { id: '2', name: 'Modern Velvet Sofa (3+2+1)', category: 'Living', type: 'furniture', price: 125000, cost: 95000, stock: 3, unit: 'pcs', minStock: 1, image: 'https://picsum.photos/seed/sofa/400/300' },
  { id: '3', name: 'Classic Dining Table (6 Chairs)', category: 'Dining', type: 'furniture', price: 65000, cost: 48000, stock: 4, unit: 'pcs', minStock: 1, image: 'https://picsum.photos/seed/dining/400/300' },
  { id: '4', name: 'Ergonomic Office Chair', category: 'Office', type: 'furniture', price: 18500, cost: 12000, stock: 12, unit: 'pcs', minStock: 5, image: 'https://picsum.photos/seed/chair/400/300' },
  { id: '5', name: 'Wooden Wardrobe (4 Door)', category: 'Bedroom', type: 'furniture', price: 45000, cost: 32000, stock: 2, unit: 'pcs', minStock: 1, image: 'https://picsum.photos/seed/wardrobe/400/300' },
  { id: '6', name: 'Dressing Table (Premium)', category: 'Bedroom', type: 'furniture', price: 22000, cost: 15000, stock: 6, unit: 'pcs', minStock: 2, image: 'https://picsum.photos/seed/dressing/400/300' },
  { id: '7', name: 'TV Trolley (Modern)', category: 'Living', type: 'furniture', price: 15000, cost: 10000, stock: 8, unit: 'pcs', minStock: 3, image: 'https://picsum.photos/seed/tv/400/300' },
  { id: '8', name: 'Bookshelf (Library Style)', category: 'Office', type: 'furniture', price: 28000, cost: 19000, stock: 4, unit: 'pcs', minStock: 2, image: 'https://picsum.photos/seed/bookshelf/400/300' },
  { id: '9', name: 'Burma Teak Log', category: 'Log', type: 'wood', price: 2500, cost: 1800, stock: 150, unit: 'cft', minStock: 50 },
  { id: '10', name: 'Segun Wood Plank', category: 'Plank', type: 'wood', price: 1200, cost: 900, stock: 500, unit: 'sft', minStock: 100 },
];

export const mockInvoices: Invoice[] = [
  { 
    id: '1', 
    invoiceNo: 'INV-1001', 
    customerId: '1', 
    customerName: 'Rahim Traders', 
    date: '2026-04-01', 
    deliveryDate: '2026-04-05',
    subtotal: 45000,
    discount: 1000,
    deliveryCharge: 1000,
    tax: 0,
    totalAmount: 45000, 
    advanceAmount: 10000,
    paidAmount: 40000, 
    dueAmount: 5000, 
    status: 'partial', 
    items: [
      { productId: '1', name: 'Royal King Size Bed', quantity: 1, price: 45000, total: 45000 }
    ],
    note: 'Handle with care'
  },
  { 
    id: '2', 
    invoiceNo: 'INV-1002', 
    customerId: '2', 
    customerName: 'Noor Furniture House', 
    date: '2026-04-02', 
    deliveryDate: '2026-04-03',
    subtotal: 120000,
    discount: 5000,
    deliveryCharge: 5000,
    tax: 0,
    totalAmount: 120000, 
    advanceAmount: 50000,
    paidAmount: 120000, 
    dueAmount: 0, 
    status: 'paid', 
    items: [
      { productId: '2', name: 'Modern Velvet Sofa (3+2+1)', quantity: 1, price: 120000, total: 120000 }
    ]
  },
  { 
    id: '3', 
    invoiceNo: 'INV-1003', 
    customerId: '3', 
    customerName: 'Bismillah Enterprise', 
    date: '2026-04-05', 
    deliveryDate: '2026-04-10',
    subtotal: 85000,
    discount: 0,
    deliveryCharge: 2000,
    tax: 0,
    totalAmount: 87000, 
    advanceAmount: 0,
    paidAmount: 0, 
    dueAmount: 87000, 
    status: 'unpaid', 
    items: [
      { productId: '1', name: 'Royal King Size Bed', quantity: 1, price: 85000, total: 85000 }
    ]
  },
  { 
    id: '4', 
    invoiceNo: 'INV-1004', 
    customerId: '5', 
    customerName: 'Karim Wood Works', 
    date: '2026-04-07', 
    deliveryDate: '2026-04-08',
    subtotal: 35000,
    discount: 0,
    deliveryCharge: 0,
    tax: 0,
    totalAmount: 35000, 
    advanceAmount: 35000,
    paidAmount: 35000, 
    dueAmount: 0, 
    status: 'paid', 
    items: [
      { productId: '5', name: 'Wooden Wardrobe (4 Door)', quantity: 1, price: 35000, total: 35000 }
    ]
  },
];

export const mockBills: Bill[] = [
  { id: '1', billNo: 'BILL-5001', vendorName: 'Saw Mill Dhaka', date: '2026-03-28', category: 'Material Purchase', amount: 45000, paidAmount: 45000, dueAmount: 0, status: 'paid', notes: 'Payment for Teak wood logs' },
  { id: '2', billNo: 'BILL-5002', vendorName: 'Hardware Mart', date: '2026-04-02', category: 'Material Purchase', amount: 12000, paidAmount: 0, dueAmount: 12000, status: 'unpaid', notes: 'Screws and hinges' },
  { id: '3', billNo: 'BILL-5003', vendorName: 'DESCO', date: '2026-04-05', category: 'Electricity', amount: 8500, paidAmount: 8500, dueAmount: 0, status: 'paid' },
  { id: '4', billNo: 'BILL-5004', vendorName: 'Amber IT', date: '2026-04-01', category: 'Internet', amount: 2500, paidAmount: 2500, dueAmount: 0, status: 'paid' },
  { id: '5', billNo: 'BILL-5005', vendorName: 'Property Owner', date: '2026-04-01', category: 'Rent', amount: 60000, paidAmount: 30000, dueAmount: 30000, status: 'partial' },
  { id: '6', billNo: 'BILL-5006', vendorName: 'Staff Salaries', date: '2026-04-05', category: 'Salary', amount: 150000, paidAmount: 150000, dueAmount: 0, status: 'paid' },
  { id: '7', billNo: 'BILL-5007', vendorName: 'Local Transport', date: '2026-04-08', category: 'Transport', amount: 3500, paidAmount: 3500, dueAmount: 0, status: 'paid' },
];

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2026-04-01', type: 'income', category: 'Sales', amount: 40000, description: 'Payment for INV-1001', paymentMethod: 'cash' },
  { id: '2', date: '2026-04-02', type: 'expense', category: 'Salary', amount: 35000, description: 'Staff salary for March', paymentMethod: 'bank' },
  { id: '3', date: '2026-04-02', type: 'income', category: 'Sales', amount: 120000, description: 'Payment for INV-1002', paymentMethod: 'bkash' },
  { id: '4', date: '2026-04-03', type: 'expense', category: 'Utility', amount: 5500, description: 'Electricity bill', paymentMethod: 'nagad' },
];

export const mockCustomerStatements: CustomerStatementEntry[] = [
  { id: '1', customerId: '1', date: '2026-03-01', reference: 'OB', description: 'Opening Balance', debit: 25000, credit: 0, balance: 25000 },
  { id: '2', customerId: '1', date: '2026-03-15', reference: 'INV-950', description: 'Furniture Purchase', debit: 15000, credit: 0, balance: 40000 },
  { id: '3', customerId: '1', date: '2026-03-20', reference: 'PAY-101', description: 'Cash Payment', debit: 0, credit: 10000, balance: 30000 },
  { id: '4', customerId: '1', date: '2026-04-01', reference: 'INV-1001', description: 'Royal King Size Bed', debit: 45000, credit: 0, balance: 75000 },
  { id: '5', customerId: '1', date: '2026-04-01', reference: 'PAY-102', description: 'Payment for INV-1001', debit: 0, credit: 40000, balance: 35000 },
  
  { id: '6', customerId: '3', date: '2026-03-01', reference: 'OB', description: 'Opening Balance', debit: 50000, credit: 0, balance: 50000 },
  { id: '7', customerId: '3', date: '2026-04-05', reference: 'INV-1003', description: 'Royal King Size Bed', debit: 87000, credit: 0, balance: 137000 },
  { id: '8', customerId: '3', date: '2026-04-06', reference: 'PAY-103', description: 'Partial Payment', debit: 0, credit: 17000, balance: 120000 },
];
