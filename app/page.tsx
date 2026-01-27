'use client';

import React from "react"
import { motion } from 'framer-motion';
import { Menu, X, Heart, ShoppingBag, Moon, Sun, ArrowRight, Star, ChevronLeft, ChevronRight, Mail, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/ProductCard';
import { QuickViewModal } from '@/components/QuickViewModal';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistModal } from '@/components/WishlistModal';
import {
  pageVariants,
  containerVariants,
  itemVariants,
  slideInVariants,
  slideInRightVariants,
  scaleVariants,
  fadeUpVariants,
  hoverScale,
} from '@/lib/animations';

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

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium White Silk Blouse',
    price: 189,
    image: '/product-1.jpg',
    description: 'Luxurious silk blouse perfect for any occasion',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 5,
    reviews: 128,
    badge: 'Featured',
  },
  {
    id: '2',
    name: 'Black Luxury Blazer',
    price: 299,
    image: '/product-2.jpg',
    description: 'Elegant tailored blazer for sophisticated style',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 5,
    reviews: 95,
  },
  {
    id: '3',
    name: 'Camel Wool Coat',
    price: 349,
    image: '/product-3.jpg',
    description: 'Premium wool coat with timeless appeal',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4,
    reviews: 76,
  },
  {
    id: '4',
    name: 'Champagne Evening Dress',
    price: 399,
    image: '/product-4.jpg',
    description: 'Glamorous silk evening dress for special events',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 5,
    reviews: 142,
    badge: 'New',
  },
  {
    id: '5',
    name: 'Beige Tailored Set',
    price: 279,
    image: '/product-5.jpg',
    description: 'Sophisticated matching blazer and trouser set',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 5,
    reviews: 103,
  },
  {
    id: '6',
    name: 'Gold Statement Jewelry',
    price: 189,
    image: '/product-6.jpg',
    description: 'Luxury gold jewelry collection for elegance',
    sizes: ['One Size'],
    rating: 4,
    reviews: 58,
  },
];

// Navbar Component
function Navbar({
  onCartClick,
  onWishlistClick,
}: {
  onCartClick: () => void;
  onWishlistClick: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const { items: wishlistItems, setTheme, theme } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-2xl font-bold tracking-widest text-black hover:text-accent transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            LUXE
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {['Shop', 'Collections', 'About', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-black/70 hover:text-accent transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onWishlistClick}
              className="hidden md:block relative"
              whileHover={hoverScale}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Heart className="w-5 h-5 text-black" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </motion.button>

            <motion.button
              onClick={onCartClick}
              className="relative"
              whileHover={hoverScale}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ShoppingCart className="w-5 h-5 text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </motion.button>

            <motion.button
              onClick={onCartClick}
              className="hidden md:block relative"
              whileHover={hoverScale}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ShoppingBag className="w-5 h-5 text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button className="md:hidden" onClick={() => setIsOpen(!isOpen)} whileHover={hoverScale}>
              {isOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6 text-black" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden pb-4 space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {['Shop', 'Collections', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-2 text-black/70 hover:text-accent transition-colors"
              >
                {item}
              </a>
            ))}
            <div className="flex gap-4 px-4 pt-2 border-t border-black/10">
              <button onClick={onWishlistClick} className="flex items-center gap-2 text-sm text-black">
                <Heart className="w-4 h-4" />
                Wishlist ({wishlistItems.length})
              </button>
              <button onClick={onCartClick} className="flex items-center gap-2 text-sm text-black">
                <ShoppingBag className="w-4 h-4" />
                Cart ({totalItems})
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

// Hero Section Component
function HeroSection({ onShopClick }: { onShopClick: () => void }) {
  return (
    <motion.section
      id="home"
      className="relative w-full min-h-screen bg-white overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Full Width Banner Background - Contain image to avoid cropping */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-white via-white to-gray-50">
        <Image
          src="/hero-banner.jpg"
          alt="Luxury Fashion Hero Banner"
          fill
          priority
          className="object-contain"
        />
        <div className="absolute inset-0 bg-white/30" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full min-h-screen pt-20 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            variants={containerVariants}
            className="max-w-2xl text-center mx-auto space-y-6 sm:space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 sm:px-6 py-2 rounded-full bg-accent/20 border border-accent text-accent text-xs font-semibold uppercase tracking-widest">
                New Collection 2024
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black text-balance leading-tight"
            >
              Elegance Redefined
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-black/70 text-balance max-w-xl mx-auto px-2"
            >
              Discover exclusive premium fashion crafted for the modern luxury enthusiast
            </motion.p>

            {/* CTA Button - Highlighted */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-8 px-2">
              <motion.button
                onClick={onShopClick}
                whileHover={{ scale: 1.08, boxShadow: '0 20px 40px rgba(181, 160, 100, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 py-4 sm:py-5 bg-accent text-black rounded-lg font-bold text-base sm:text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3 group uppercase tracking-wider"
              >
                <span>Shop Now</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6" />
                </motion.div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-black text-black rounded-lg font-bold text-base sm:text-lg hover:bg-black/5 transition-colors uppercase tracking-wider"
              >
                Explore
              </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="pt-6 sm:pt-8"
            >
              <div className="text-black/60 text-xs sm:text-sm">
                Scroll to explore
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </motion.section>
  );
}

// Featured Products Section
function FeaturedProductsSection({
  onQuickView,
}: {
  onQuickView: (product: Product) => void;
}) {
  return (
    <motion.section
      id="shop"
      className="py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-black mb-4 text-balance">
            Featured Collection
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-black/60 max-w-2xl mx-auto">
            Handpicked pieces from our premium selection
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {PRODUCTS.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// Trending Collection
function TrendingCollectionSection({
  onQuickView,
}: {
  onQuickView: (product: Product) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? PRODUCTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === PRODUCTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.section
      className="py-20 bg-black/5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-black mb-12 text-balance text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Trending Now
        </motion.h2>

        <div className="relative">
          {/* Featured Carousel Item */}
          <motion.div
            key={currentIndex}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={PRODUCTS[currentIndex].image || "/placeholder.svg"}
                alt={PRODUCTS[currentIndex].name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-4xl font-bold text-black mb-2">
                  {PRODUCTS[currentIndex].name}
                </h3>
                <p className="text-2xl text-accent font-bold mb-4">
                  ${PRODUCTS[currentIndex].price.toFixed(2)}
                </p>
                <p className="text-lg text-black/70 mb-6">
                  {PRODUCTS[currentIndex].description}
                </p>
              </div>

              <motion.button
                onClick={() => onQuickView(PRODUCTS[currentIndex])}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-black text-white rounded-lg font-semibold flex items-center gap-2 w-fit"
              >
                View Product
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 justify-center">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-black text-white hover:shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-black text-white hover:shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// New Arrivals Grid
function NewArrivalsSection({
  onQuickView,
}: {
  onQuickView: (product: Product) => void;
}) {
  return (
    <motion.section
      className="py-20 bg-black/5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-black mb-12 text-balance text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          New Arrivals
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// Limited Offer Banner
function LimitedOfferBanner() {
  return (
    <motion.section
      className="py-20 bg-gradient-to-r from-accent to-accent/80"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Limited Time Offer
        </motion.h2>
        <motion.p
          className="text-xl text-white/90 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Get 30% off on selected items with code SUMMER30
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-white text-accent rounded-lg font-semibold hover:shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Shop Sale
        </motion.button>
      </div>
    </motion.section>
  );
}

// Testimonials
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Emma Wilson',
      text: 'Absolutely love the quality and elegance of these pieces!',
      rating: 5,
      image: '👩',
    },
    {
      name: 'Sarah Johnson',
      text: 'Best fashion investment I\'ve made. Timeless pieces.',
      rating: 5,
      image: '👩',
    },
    {
      name: 'Jessica Brown',
      text: 'Incredible service and stunning designs. Highly recommend!',
      rating: 5,
      image: '👩',
    },
  ];

  return (
    <motion.section
      className="py-20 bg-black/5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-black mb-12 text-balance text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Loved by Customers
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-8 border border-black/10"
              variants={itemVariants}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-lg">⭐</span>
                ))}
              </div>
              <p className="text-black/70 mb-4 italic">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{testimonial.image}</span>
                <div>
                  <p className="font-semibold text-black">{testimonial.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// Newsletter Section
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.section
      className="py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-black mb-4 text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Stay Updated
        </motion.h2>
        <motion.p
          className="text-lg text-black/60 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Subscribe to get special offers and new collection updates
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="flex gap-3 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg bg-black/5 border border-black/10 text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-black text-white rounded-lg font-semibold"
          >
            <Mail className="w-5 h-5" />
          </motion.button>
        </motion.form>

        {submitted && (
          <motion.p
            className="text-green-600 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Thanks for subscribing!
          </motion.p>
        )}
      </div>
    </motion.section>
  );
}

// Footer
function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubmitted(false), 3000);
  };

  const socialLinks = [
    { icon: '𝕏', label: 'Twitter' },
    { icon: 'f', label: 'Facebook' },
    { icon: '📷', label: 'Instagram' },
    { icon: '📍', label: 'Pinterest' },
  ];

  return (
    <footer className="bg-black text-white overflow-hidden border-t border-white/10">
      {/* Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Main Footer Content - Compact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10">
          {/* Brand Column */}
          <motion.div
            variants={fadeUpVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="col-span-2 md:col-span-1 space-y-3"
          >
            <h3 className="text-2xl font-bold tracking-widest">LUXE</h3>
            <p className="text-white/70 text-xs leading-relaxed">
              Premium fashion for the modern luxury enthusiast.
            </p>
            {/* Social Icons - Compact */}
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-accent/20 hover:border-accent flex items-center justify-center text-white/70 hover:text-accent transition-colors"
                  title={social.label}
                >
                  <span className="text-sm">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeUpVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Shop</h4>
            <ul className="space-y-2">
              {['New Arrivals', 'Best Sellers', 'Collections', 'Sale'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-accent transition-colors text-xs">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            variants={fadeUpVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Support</h4>
            <ul className="space-y-2">
              {['Contact Us', 'Shipping Info', 'Returns', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-accent transition-colors text-xs">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            variants={fadeUpVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Company</h4>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Privacy', 'Terms'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-accent transition-colors text-xs">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup - Compact */}
        <motion.div
          variants={fadeUpVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="border-y border-white/10 py-6 mb-6"
        >
          <div className="max-w-xl mx-auto">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2">Newsletter</h3>
            <p className="text-white/60 text-xs mb-3">Get exclusive offers and style tips.</p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm mx-auto flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 px-3 py-2 text-sm rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-accent text-black rounded-lg font-bold hover:shadow-lg hover:shadow-accent/40 transition-all uppercase text-xs whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </form>

            {newsletterSubmitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-accent mt-2 text-xs"
              >
                Thanks for subscribing!
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Bottom Copyright Bar - Compact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs"
        >
          <p className="text-white/50">
            &copy; 2024 LUXE Fashion. All rights reserved.
          </p>

          <div className="flex gap-4 text-white/50">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
            <a href="#" className="hover:text-accent transition-colors">Cookies</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleShopClick = () => {
    const shopSection = document.getElementById('shop');
    shopSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-white overflow-x-hidden">
      <Navbar onCartClick={() => setIsCartOpen(true)} onWishlistClick={() => setIsWishlistOpen(true)} />
      <HeroSection onShopClick={handleShopClick} />
      <FeaturedProductsSection onQuickView={handleQuickView} />
      <TrendingCollectionSection onQuickView={handleQuickView} />
      <NewArrivalsSection onQuickView={handleQuickView} />
      <LimitedOfferBanner />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer />

      {/* Modals and Drawers */}
      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={quickViewProduct}
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </main>
  );
}
