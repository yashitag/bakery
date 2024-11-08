import React from 'react';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  description: string;
  onAddToCart: () => void;
}

export default function ProductCard({ name, price, image, description, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 font-serif">{name}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-rose-500 font-semibold">${price.toFixed(2)}</span>
          <button
            onClick={onAddToCart}
            className="bg-rose-500 text-white px-3 py-2 rounded-full flex items-center gap-1 hover:bg-rose-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}