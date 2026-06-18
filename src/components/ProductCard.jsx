import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ToastContext } from '../context/ToastContext';
import { HeartIcon } from './Icons';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, toggleWishlist, wishlist, cart, updateQuantity } = useContext(ShopContext);
  const { addToast } = useContext(ToastContext);
  
  const inWishlist = wishlist.some(item => item.id === product.id);
  const cartItem = cart.find(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    addToast(`Added ${product.name} to cart.`);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    addToast(inWishlist ? `Removed ${product.name} from wishlist.` : `Added ${product.name} to wishlist.`);
  };

  return (
    <div className="product-card" onClick={onQuickView} style={{ cursor: 'pointer' }}>
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.name} className="product-img" onError={(e) => e.target.style.display = 'none'} />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price">₹{product.price.toLocaleString()}</div>
        
        <div className="product-actions">
          {cartItem ? (
            <div className="cart-counter">
              <button className="cart-counter-btn" onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, -1); }}>-</button>
              <span className="cart-counter-value">{cartItem.quantity}</span>
              <button className="cart-counter-btn" onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, 1); }}>+</button>
            </div>
          ) : (
            <button className="btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}
          <button 
            className={`btn-secondary icon-button ${inWishlist ? 'active' : ''}`} 
            onClick={handleToggleWishlist}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Wishlist"
          >
            <HeartIcon filled={inWishlist} />
          </button>
        </div>
      </div>
    </div>
  );
}
