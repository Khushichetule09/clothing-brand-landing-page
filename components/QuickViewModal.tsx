'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  rating: number;
  reviews: number;
}

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity,
    });
    onClose();
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
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
                <h2 className="text-xl font-bold text-black dark:text-white">Quick View</h2>
                <button onClick={onClose} className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full">
                  <X className="w-5 h-5 text-black dark:text-white" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Product Image */}
                <div className="relative aspect-square rounded-lg overflow-hidden bg-black/5 dark:bg-white/5">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-2">{product.name}</h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-lg">
                            {i < Math.floor(product.rating) ? '⭐' : '☆'}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-black/60 dark:text-white/60">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    <p className="text-3xl font-bold text-accent mb-4">${product.price.toFixed(2)}</p>

                    <p className="text-black/70 dark:text-white/70 mb-6">{product.description}</p>

                    {/* Size Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
                        Select Size
                      </label>
                      <div className="flex gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              selectedSize === size
                                ? 'bg-black dark:bg-white text-white dark:text-black'
                                : 'bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-black dark:text-white mb-3">
                        Quantity
                      </label>
                      <div className="flex items-center border border-black/20 dark:border-white/20 rounded-lg w-fit">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-2 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
                        >
                          −
                        </button>
                        <span className="px-4 py-2 text-black dark:text-white font-medium">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-2 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleAddToCart}
                      className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90"
                    >
                      Add to Cart
                    </Button>
                    <motion.button
                      onClick={handleWishlist}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 border border-black/20 dark:border-white/20 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <Heart
                        className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-black dark:text-white'}`}
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
