'use client';

import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function TopHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search for invoices, customers, products..." 
            className="pl-10 bg-gray-50 border-none focus-visible:ring-orange-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" className="relative text-gray-500">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </Button>

        <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost" }), "flex items-center gap-2 px-2 hover:bg-gray-50")}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-orange-100 text-orange-600 text-xs font-bold">AD</AvatarFallback>
            </Avatar>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold leading-none text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500 mt-1">Super Admin</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Business Settings</DropdownMenuItem>
            <DropdownMenuItem>Staff Management</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
