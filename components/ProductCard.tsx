'use client';

import React from "react"

import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
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
  badge?: string;
}

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <motion.div
      className="group h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-black/50 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square bg-black/5 dark:bg-white/5">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
              {product.badge}
            </div>
          )}

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <motion.button
              onClick={() => onQuickView(product)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white dark:bg-black text-black dark:text-white backdrop-blur-sm"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={handleWishlist}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white dark:bg-black text-black dark:text-white backdrop-blur-sm"
            >
              <Heart
                className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`}
              />
            </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-black dark:text-white text-sm mb-2 line-clamp-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xs">
                    {i < Math.floor(product.rating) ? '⭐' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-xs text-black/50 dark:text-white/50">
                ({product.reviews})
              </span>
            </div>

            <p className="text-2xl font-bold text-accent mb-2">${product.price.toFixed(2)}</p>
          </div>

          <Button
            onClick={() => onQuickView(product)}
            className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90"
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
