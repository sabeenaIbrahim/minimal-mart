import { useState, useContext, useEffect, useRef } from "react";
import { ShopProvider, ShopContext } from "./context/ShopContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import WishlistSidebar from "./components/WishlistSidebar";
import CheckoutModal from "./components/CheckoutModal";
import ProductDetailsModal from "./components/ProductDetailsModal";
import Hero from "./components/Hero";
import "./App.css";

function ShopApp() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const loaderRef = useRef(null);
  
  const { visibleProducts, loadMore, isLoading, filteredProducts, visibleCount } = useContext(ShopContext);

  const hasMore = visibleCount < filteredProducts.length;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    }, { threshold: 1.0 });

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  return (
    <div className="app-container">
      <Navbar 
        openCart={() => setIsCartOpen(true)} 
        openWishlist={() => setIsWishlistOpen(true)} 
      />
      
      <Hero />
      
      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <h2>No Products Found 😔</h2>
          <p>Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <>
          <div className="product-grid">
            {visibleProducts.map(product => (
              <ProductCard key={product.id} product={product} onQuickView={() => setSelectedProduct(product)} />
            ))}
          </div>
          
          {hasMore && (
            <div ref={loaderRef} className="loader-container">
               <div className="spinner"></div>
            </div>
          )}
        </>
      )}

      <CartSidebar isOpen={isCartOpen} close={() => setIsCartOpen(false)} openCheckout={() => setIsCheckoutOpen(true)} />
      <WishlistSidebar isOpen={isWishlistOpen} close={() => setIsWishlistOpen(false)} />
      <CheckoutModal isOpen={isCheckoutOpen} close={() => setIsCheckoutOpen(false)} />
      
      <ProductDetailsModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        close={() => setSelectedProduct(null)} 
      />

      <footer>
        <p>© 2026 Minimal-Mart. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <ShopProvider>
        <ShopApp />
      </ShopProvider>
    </ToastProvider>
  );
}
