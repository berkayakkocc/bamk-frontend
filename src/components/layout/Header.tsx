'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth, useCart, useUI } from '@/hooks';
import { Button } from '@/components/ui';
import { ShoppingCart, User, Menu, Search, Heart } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const { toggleSidebar } = useUI();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-purple-50 supports-[backdrop-filter]:to-pink-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-purple-600 hover:text-purple-700" />
            </button>
            <Link href="/" prefetch={true} className="flex items-center space-x-3">
              {/* BAMK Logo - Modern Typography */}
              <div className="relative h-12 w-16 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg flex items-center justify-center group overflow-hidden">
                {/* BAMK Text Logo */}
                <div className="text-white font-black text-lg tracking-tight leading-none">
                  <span className="block text-center font-extrabold" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                    BAMK
                  </span>
                </div>
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
              {/* Brand Text */}
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                BAMK
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-600" />
              <input
                type="text"
                placeholder="Ürün ara..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" prefetch={true} className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Ürünler
            </Link>
            <Link href="/categories" prefetch={true} className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Kategoriler
            </Link>
            <Link href="/about" prefetch={true} className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Hakkımızda
            </Link>
            <Link href="/contact" prefetch={true} className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              İletişim
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="relative p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Heart className="h-5 w-5 text-purple-600 hover:text-purple-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center scale-0 opacity-0">
                0
              </span>
            </button>

            {/* Cart */}
            <Link href="/cart" prefetch={true} className="relative p-2 hover:bg-gray-100 rounded-md transition-colors">
              <ShoppingCart className="h-5 w-5 text-purple-600 hover:text-purple-700" />
              <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all duration-200 ${
                totalItems > 0 
                  ? 'bg-red-500 scale-100 opacity-100' 
                  : 'bg-gray-400 scale-0 opacity-0'
              }`}>
                {totalItems}
              </span>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href="/profile" prefetch={true}>
                    <Button variant="ghost" size="sm">
                      Profil
                    </Button>
                  </Link>
                  <Link href="/orders" prefetch={true}>
                    <Button variant="ghost" size="sm">
                      Siparişlerim
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => logout()}>
                    Çıkış
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" prefetch={true}>
                  <Button variant="ghost" size="sm">
                    Giriş Yap
                  </Button>
                </Link>
                <Link href="/register" prefetch={true}>
                  <Button size="sm">
                    Kayıt Ol
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
