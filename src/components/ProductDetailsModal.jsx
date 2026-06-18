import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ToastContext } from '../context/ToastContext';
import { HeartIcon } from './Icons';

export default function ProductDetailsModal({ product, isOpen, close }) {
  const { addToCart, toggleWishlist, wishlist, cart, updateQuantity } = useContext(ShopContext);
  const { addToast } = useContext(ToastContext);

  if (!isOpen || !product) return null;

  const inWishlist = wishlist.some(item => item.id === product.id);
  const cartItem = cart.find(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    addToast(`Added ${product.name} to cart.`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    addToast(inWishlist ? `Removed ${product.name} from wishlist.` : `Added ${product.name} to wishlist.`);
  };

  // Mocked details
  const longDescription = `Experience the perfect blend of style and functionality with our premium ${product.name}. Designed with meticulous attention to detail, this item features high-quality materials to ensure durability and a refined aesthetic. Whether you're upgrading your daily essentials or looking for the perfect gift, the ${product.name} delivers unparalleled value and performance.`;
  const stockAvailability = product.id % 2 === 0 ? 'In Stock (15 available)' : 'Low Stock (3 remaining)';
  const isLowStock = product.id % 2 !== 0;

  // Star rating rendering
  const rating = product.rating || 4.5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else if (i === fullStars && halfStar) {
      stars.push(<span key={i} className="star half">★</span>);
    } else {
      stars.push(<span key={i} className="star empty">☆</span>);
    }
  }

  return (
    <>
      <div className="sidebar-overlay" onClick={close}></div>
      <div className="modal product-details-modal">
        <div className="modal-header">
          <h2>Product Details</h2>
          <button className="close-btn" onClick={close}>&times;</button>
        </div>
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="product-details-img-wrapper" style={{ width: '100%', height: '300px', background: 'var(--bg-secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => e.target.style.display = 'none'} />
          </div>
          
          <div className="product-details-info">
            <span className="product-category" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{product.category}</span>
            <h3 style={{ margin: '5px 0 10px', fontSize: '1.5rem' }}>{product.name}</h3>
            
            <div className="product-rating" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
              <div className="stars" style={{ color: '#FFD700', fontSize: '1.2rem' }}>{stars}</div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>({rating})</span>
            </div>

            <div className="product-price" style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '15px' }}>₹{product.price.toLocaleString()}</div>
            
            <p className="product-description" style={{ lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '15px' }}>
              {longDescription}
            </p>
            
            <div className={`product-stock ${isLowStock ? 'low-stock' : ''}`} style={{ fontWeight: 'bold', color: isLowStock ? '#d32f2f' : '#2e7d32', marginBottom: '20px' }}>
              {stockAvailability}
            </div>
            
            <div className="product-actions" style={{ display: 'flex', gap: '10px' }}>
              {cartItem ? (
                <div className="cart-counter" style={{ flexGrow: 1 }}>
                  <button className="cart-counter-btn" onClick={() => updateQuantity(product.id, -1)}>-</button>
                  <span className="cart-counter-value">{cartItem.quantity}</span>
                  <button className="cart-counter-btn" onClick={() => updateQuantity(product.id, 1)}>+</button>
                </div>
              ) : (
                <button className="btn-primary" onClick={handleAddToCart} style={{ flexGrow: 1, padding: '12px', fontSize: '1rem' }}>
                  Add to Cart
                </button>
              )}
              <button 
                className={`btn-secondary icon-button ${inWishlist ? 'active' : ''}`} 
                onClick={handleToggleWishlist}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label="Wishlist"
                style={{ padding: '0 15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <HeartIcon filled={inWishlist} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
