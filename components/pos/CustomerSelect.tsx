import React, { useState } from 'react';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCustomers } from '@/lib/context/CustomerContext';

interface CustomerSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function CustomerSelect({ value, onChange }: CustomerSelectProps) {
  const [open, setOpen] = useState(false);
  const { customers } = useCustomers();

  // Find selected customer object
  const selectedCustomer = value === 'walk-in' || !value 
    ? null 
    : customers.find((c) => c.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1 justify-between rounded-xl border-gray-200 h-10 shadow-sm font-normal px-3"
        />
      }>
        <div className="flex items-center gap-2 overflow-hidden">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <span className="truncate">{selectedCustomer ? selectedCustomer.name : 'Walk-in Customer'}</span>
        </div>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 rounded-xl" align="start">
        <Command>
          <CommandInput placeholder="Search customer, phone, or ID..." className="h-10" />
          <CommandList>
            <CommandEmpty>No customer found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="walk-in"
                onSelect={() => {
                  onChange('walk-in');
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === 'walk-in' || !value ? "opacity-100" : "opacity-0"
                  )}
                />
                Walk-in Customer
              </CommandItem>
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={`${customer.name} ${customer.phone} CUS-${customer.id}`}
                  onSelect={() => {
                    onChange(customer.id);
                    setOpen(false);
                  }}
                  className="cursor-pointer flex flex-col items-start py-2"
                >
                  <div className="flex items-center w-full">
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 shrink-0",
                        value === customer.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="font-medium truncate">{customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 ml-6 mt-0.5">
                    <span>{customer.phone}</span>
                    <span className="text-gray-300">•</span>
                    <span>CUS-{customer.id}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
