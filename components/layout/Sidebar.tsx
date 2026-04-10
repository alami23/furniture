'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Trees, 
  Armchair, 
  FileText, 
  Users, 
  UserSquare2, 
  Receipt, 
  Package, 
  Tags, 
  UserCog, 
  History, 
  MessageSquare, 
  BarChart3, 
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  submenu?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'POS Wood', href: '/pos-wood', icon: Trees },
  { title: 'POS Furniture', href: '/pos-furniture', icon: Armchair },
  { title: 'Invoice', href: '/invoice', icon: FileText },
  { title: 'Customer', href: '/customer', icon: Users },
  { title: 'Customer Statement', href: '/customer-statement', icon: UserSquare2 },
  { title: 'Bills', href: '/bills', icon: Receipt },
  { 
    title: 'Inventory', 
    href: '/inventory', 
    icon: Package,
    submenu: [
      { title: 'Furniture', href: '/inventory/furniture' },
      { title: 'Wood', href: '/inventory/wood' },
    ]
  },
  { 
    title: 'Category', 
    href: '/category', 
    icon: Tags,
    submenu: [
      { title: 'Furniture', href: '/category/furniture' },
      { title: 'Wood', href: '/category/wood' },
    ]
  },
  { title: 'Staff', href: '/staff', icon: UserCog },
  { title: 'Staff Statement', href: '/staff-statement', icon: History },
  { title: 'Transactions', href: '/transactions', icon: History },
  { title: 'SMS', href: '/sms', icon: MessageSquare },
  { title: 'Reports', href: '/reports', icon: BarChart3 },
  { title: 'Setting', href: '/setting', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <Button 
        variant="ghost" 
        className="lg:hidden fixed top-4 left-4 z-50 p-2"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-60 bg-white border-r border-gray-200 transition-transform lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-bottom border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">A</div>
              <span className="text-xl font-bold font-display tracking-tight">Aranya <span className="text-orange-500">ERP</span></span>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const hasSubmenu = !!item.submenu;
                const isSubmenuOpen = openSubmenus.includes(item.title);

                return (
                  <div key={item.title}>
                    {hasSubmenu ? (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </div>
                        {isSubmenuOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    )}

                    {hasSubmenu && isSubmenuOpen && (
                      <div className="mt-1 ml-9 space-y-1">
                        {item.submenu?.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            className={cn(
                              "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                              pathname === sub.href ? "text-orange-600" : "text-gray-500 hover:text-gray-900"
                            )}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </ScrollArea>

          {/* User Profile Mini */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">A</div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@aranya.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
