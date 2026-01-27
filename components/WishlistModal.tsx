'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      ...item,
      size: 'M',
      quantity: 1,
    });
    removeFromWishlist(item.id);
  };

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-black rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-black border-b border-black/10 dark:border-white/10 p-4 flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  <h2 className="text-xl font-bold text-black dark:text-white">My Wishlist</h2>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full">
                  <X className="w-5 h-5 text-black dark:text-white" />
                </button>
              </div>

              <div className="p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <div className="text-6xl">💝</div>
                    <p className="text-black/60 dark:text-white/60 text-center">Your wishlist is empty</p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          className="bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          {/* Image */}
                          <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                          </div>

                          {/* Info */}
                          <div className="p-4">
                            <h3 className="font-semibold text-black dark:text-white mb-1">{item.name}</h3>
                            <p className="text-lg font-bold text-accent mb-3">${item.price.toFixed(2)}</p>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleAddToCart(item)}
                                className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 text-sm"
                              >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Add
                              </Button>
                              <motion.button
                                onClick={() => removeFromWishlist(item.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500/10"
                              >
                                <Heart className="w-4 h-4 fill-red-500" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <button
                      onClick={clearWishlist}
                      className="w-full px-4 py-2 border border-black/20 dark:border-white/20 text-black dark:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      Clear Wishlist
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
