import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function WishlistSidebar({ isOpen, close }) {
  const { wishlist, toggleWishlist, addToCart } = useContext(ShopContext);

  if (!isOpen) return null;

  return (
    <>
      <div className="sidebar-overlay" onClick={close}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Your Wishlist</h2>
          <button className="close-btn" onClick={close}>&times;</button>
        </div>
        
        <div className="sidebar-content">
          {wishlist.length === 0 ? (
            <div className="empty-state">Your wishlist is completely empty.</div>
          ) : (
            wishlist.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" onError={(e) => e.target.style.display = 'none'} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price.toLocaleString()}</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '5px' }} onClick={() => addToCart(item)}>
                      Add to Cart
                    </button>
                    <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '5px' }} onClick={() => toggleWishlist(item)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
