import React from 'react';
import { ShoppingCart, Cake } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Cake className="h-8 w-8 text-rose-500" />
            <span className="ml-2 text-2xl font-serif font-bold text-gray-800">Sweet Delights</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-600 hover:text-gray-800 transition-colors">Menu</button>
            <button 
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-gray-800 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}