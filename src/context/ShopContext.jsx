/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import productsData from '../data/products';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products] = useState(productsData);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 5);
      setIsLoading(false);
    }, 600);
  };

  const applyPromoCode = (code) => {
    if (code.toUpperCase() === 'DISCOUNT10') {
      setDiscountPercent(0.10);
      return true;
    } else {
      setDiscountPercent(0);
      return false;
    }
  };

  let filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    const matchesPrice = p.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (sortOrder === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOrder === 'name-asc') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = cartSubtotal * discountPercent;
  const cartAfterDiscount = cartSubtotal - discountAmount;
  const mockTax = cartAfterDiscount * 0.05; // 5% tax
  const mockShipping = cartAfterDiscount > 0 ? (cartAfterDiscount > 5000 ? 0 : 50) : 0;
  const cartTotal = cartAfterDiscount + mockTax + mockShipping;

  const value = {
    products,
    visibleProducts,
    filteredProducts,
    cart,
    wishlist,
    search,
    setSearch,
    category,
    setCategory,
    sortOrder,
    setSortOrder,
    maxPrice,
    setMaxPrice,
    promoCodeInput,
    setPromoCodeInput,
    discountPercent,
    applyPromoCode,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    loadMore,
    isLoading,
    visibleCount,
    cartSubtotal,
    discountAmount,
    mockTax,
    mockShipping,
    cartTotal
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

