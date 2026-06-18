import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ToastContext } from '../context/ToastContext';

export default function CartSidebar({ isOpen, close, openCheckout }) {
  const { 
    cart, removeFromCart, updateQuantity, cartSubtotal, 
    discountPercent, discountAmount, mockTax, mockShipping, cartTotal,
    promoCodeInput, setPromoCodeInput, applyPromoCode, clearCart
  } = useContext(ShopContext);
  
  const { addToast } = useContext(ToastContext);

  if (!isOpen) return null;

  const handleApplyPromo = () => {
    const success = applyPromoCode(promoCodeInput);
    if (success) {
      addToast('Promo code applied successfully!');
    } else {
      addToast('Invalid promo code.');
    }
  };

  return (
    <>
      <div className="sidebar-overlay" onClick={close}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Your Cart</h2>
          <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
            {cart.length > 0 && <button className="remove-btn" onClick={clearCart} style={{ margin: 0, fontSize: '0.9rem' }}>Clear All</button>}
            <button className="close-btn" onClick={close}>&times;</button>
          </div>
        </div>
        
        <div className="sidebar-content">
          {cart.length === 0 ? (
            <div className="empty-state">Your cart is completely empty.</div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" onError={(e) => e.target.style.display = 'none'} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>₹{(item.price * item.quantity).toLocaleString()}</p>
                  <div className="cart-controls">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="sidebar-footer">
            <div className="promo-section" style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input 
                type="text" 
                value={promoCodeInput}
                onChange={e => setPromoCodeInput(e.target.value)}
                placeholder="Promo code (DISCOUNT10)" 
                style={{ flexGrow: 1, padding: '8px', border: '1px solid var(--border-color)', borderRadius: '4px', outline: 'none' }} 
              />
              <button className="btn-secondary" onClick={handleApplyPromo} style={{ padding: '8px 15px' }}>Apply</button>
            </div>
            
            <div className="summary-section" style={{ fontSize: '0.9rem', marginBottom: '15px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Subtotal:</span>
                <span>₹{cartSubtotal.toLocaleString()}</span>
              </div>
              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', color: '#2e7d32' }}>
                  <span>Discount (10%):</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Tax (5%):</span>
                <span>₹{mockTax.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span>Shipping:</span>
                <span>{mockShipping === 0 ? 'Free' : `₹${mockShipping.toLocaleString()}`}</span>
              </div>
            </div>

            <div className="total-row">
              <span>Total:</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => { close(); openCheckout(); }}>Checkout Now</button>
          </div>
        )}
      </div>
    </>
  );
}
