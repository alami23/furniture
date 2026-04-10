import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Printer, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
  type: 'wood' | 'furniture';
}

export function CheckoutSuccessModal({ isOpen, onClose, onPrint, type }: CheckoutSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white border-none shadow-2xl rounded-2xl">
        <div className="p-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sale Complete!</h2>
          <p className="text-gray-500 mb-8">
            The {type} inventory has been automatically updated and the invoice is ready.
          </p>

          <div className="w-full space-y-3">
            <Button 
              onClick={onPrint}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl gap-2 text-base font-semibold"
            >
              <Printer className="w-5 h-5" /> Print Invoice
            </Button>
            <Button 
              variant="outline"
              onClick={onClose}
              className="w-full border-gray-200 hover:bg-gray-50 h-12 rounded-xl gap-2 text-base font-semibold text-gray-700"
            >
              <ShoppingCart className="w-5 h-5" /> Continue Shopping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
