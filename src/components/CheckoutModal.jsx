import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function CheckoutModal({ isOpen, close }) {
  const { cartTotal, clearCart } = useContext(ShopContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', address: '', paymentMethod: 'credit' });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(3);
        clearCart();
      }, 1500);
    }
  };

  const handleClose = () => {
    if (step === 3) {
      setStep(1);
    }
    close();
  };

  const renderContent = () => {
    if (step === 1) {
      return (
        <form id="checkout-form" onSubmit={handleSubmit} className="checkout-form">
          <h3>Shipping Details</h3>
          <div className="form-group">
            <label>Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="form-input" rows="3" />
          </div>
        </form>
      );
    }
    if (step === 2) {
      return (
        <form id="checkout-form" onSubmit={handleSubmit} className="checkout-form">
          <h3>Payment Method</h3>
          <div className="form-group radio-group">
            <label>
              <input type="radio" name="payment" value="credit" checked={formData.paymentMethod === 'credit'} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} /> Credit Card
            </label>
          </div>
          <div className="form-group radio-group">
            <label>
              <input type="radio" name="payment" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} /> PayPal
            </label>
          </div>
          <div className="form-group radio-group">
            <label>
              <input type="radio" name="payment" value="cod" checked={formData.paymentMethod === 'cod'} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} /> Cash on Delivery
            </label>
          </div>
          <p className="checkout-total">Total Amount: ₹{cartTotal.toLocaleString()}</p>
        </form>
      );
    }
    if (step === 3) {
      return (
        <div className="success-message">
          <h2>🎉 Order Successful!</h2>
          <p>Thank you for your purchase, <strong>{formData.name}</strong>.</p>
          <p>Your items will be shipped to: <br/><em>{formData.address}</em></p>
          <button className="btn-primary" onClick={handleClose} style={{ marginTop: '20px' }}>Continue Shopping</button>
        </div>
      );
    }
  }

  return (
    <>
      <div className="sidebar-overlay" onClick={step === 3 ? handleClose : close}></div>
      <div className="modal checkout-modal">
        <div className="modal-header">
          <h2>Checkout</h2>
          {step !== 3 && <button className="close-btn" onClick={close}>&times;</button>}
        </div>
        <div className="modal-body">
          {renderContent()}
        </div>
        {step !== 3 && (
          <div className="modal-footer">
            {step === 2 ? <button type="button" className="btn-secondary" onClick={() => setStep(1)} disabled={isProcessing}>Back</button> : <div></div>}
            <button type="submit" form="checkout-form" className="btn-primary" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : (step === 1 ? 'Next to Payment' : 'Place Order')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
