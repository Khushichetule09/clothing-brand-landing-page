'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-white dark:bg-black rounded-l-lg flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className="border-b border-black/10 dark:border-white/10 p-4 flex justify-between items-center sticky top-0 bg-white dark:bg-black">
              <h2 className="text-xl font-bold text-black dark:text-white">Shopping Cart</h2>
              <button onClick={onClose} className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full">
                <X className="w-5 h-5 text-black dark:text-white" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="text-6xl">🛍️</div>
                  <p className="text-black/60 dark:text-white/60 text-center">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-3 bg-black/5 dark:bg-white/5 rounded-lg p-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-black dark:text-white truncate">{item.name}</h3>
                        <p className="text-sm text-black/60 dark:text-white/60">Size: {item.size}</p>
                        <p className="text-sm font-semibold text-accent mt-1">${item.price.toFixed(2)}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-black dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="px-2 py-1 rounded bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        onClick={() => removeFromCart(item.id, item.size)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-black/10 dark:border-white/10 p-4 space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-black/10 dark:border-white/10">
                  <span className="font-semibold text-black dark:text-white">Total:</span>
                  <span className="text-2xl font-bold text-accent">${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90">
                  Checkout
                </Button>
                <button
                  onClick={() => clearCart()}
                  className="w-full px-4 py-2 border border-black/20 dark:border-white/20 text-black dark:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
