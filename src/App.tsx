import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';

const products = [
  {
    id: 1,
    name: "Classic Croissant",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1000",
    description: "Buttery, flaky layers of hand-crafted perfection"
  },
  {
    id: 2,
    name: "Chocolate Cake",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000",
    description: "Rich, moist chocolate cake with ganache"
  },
  {
    id: 3,
    name: "Artisan Sourdough",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=1000",
    description: "Naturally leavened with a perfect crust"
  },
  {
    id: 4,
    name: "French Macarons",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=1000",
    description: "Delicate almond meringue cookies with filling"
  },
  {
    id: 5,
    name: "Cinnamon Roll",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=1000",
    description: "Warm, gooey rolls with cream cheese frosting"
  },
  {
    id: 6,
    name: "Fruit Tart",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=1000",
    description: "Fresh seasonal fruits on vanilla custard"
  }
];

interface CartItem {
  id: number;
  quantity: number;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const cartItems = cart.map(item => ({
    ...products.find(p => p.id === item.id)!,
    quantity: item.quantity
  }));

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={totalItems} onCartClick={() => setIsCartOpen(true)} />
      
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        totalPrice={totalPrice}
      />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[500px] mb-16">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=1000"
              alt="Bakery banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-5xl font-serif font-bold mb-4">Sweet Delights Bakery</h1>
              <p className="text-xl max-w-2xl">
                Handcrafted with love, our artisanal breads and pastries bring a taste of happiness to your day.
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">Our Fresh Selection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
                onAddToCart={() => addToCart(product.id)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Visit Us</h3>
              <p>123 Bakery Street</p>
              <p>Sweet Town, ST 12345</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Hours</h3>
              <p>Mon-Fri: 7am - 7pm</p>
              <p>Sat-Sun: 8am - 5pm</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <p>Phone: (555) 123-4567</p>
              <p>Email: hello@sweetdelights.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;