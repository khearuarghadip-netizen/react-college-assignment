import React, { useReducer, useState } from 'react';

// Product Catalog Data
const PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Noise-Canceling Headphones',
    category: 'Audio',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'RGB Mechanical Gaming Keyboard',
    category: 'Accessories',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Ergonomic Optical Mouse',
    category: 'Accessories',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'Ultra-Slim 24-inch Monitor',
    category: 'Displays',
    price: 12499,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    name: '7-in-1 USB-C Hub Multiport Adapter',
    category: 'Connectivity',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 6,
    name: 'Waterproof Laptop Travel Backpack',
    category: 'Bags & Luggage',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80'
  }
];

// Available Coupon Codes
const VALID_COUPONS = {
  SAVE10: 10,
  TECH15: 15,
  COLLEGE20: 20
};

// Initial State for Shopping Cart Reducer
const initialCartState = {
  cart: [],
  appliedCoupon: '',
  discountPercent: 0,
  couponStatus: { type: '', message: '' }
};

// Shopping Cart Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== id)
        };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    }

    case 'APPLY_COUPON': {
      const code = action.payload.trim().toUpperCase();
      if (!code) {
        return {
          ...state,
          couponStatus: { type: 'error', message: 'Please enter a coupon code.' }
        };
      }
      if (VALID_COUPONS[code]) {
        const discount = VALID_COUPONS[code];
        return {
          ...state,
          appliedCoupon: code,
          discountPercent: discount,
          couponStatus: {
            type: 'success',
            message: `Coupon "${code}" applied successfully! (${discount}% OFF)`
          }
        };
      }
      return {
        ...state,
        couponStatus: {
          type: 'error',
          message: 'Invalid coupon. Try SAVE10, TECH15, or COLLEGE20.'
        }
      };
    }

    case 'REMOVE_COUPON':
      return {
        ...state,
        appliedCoupon: '',
        discountPercent: 0,
        couponStatus: { type: 'info', message: 'Coupon removed.' }
      };

    case 'CLEAR_CART':
      return {
        ...initialCartState,
        cart: []
      };

    default:
      return state;
  }
}

export default function Assignment5() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const [couponText, setCouponText] = useState('');

  // Calculations
  const subtotal = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountAmount = Math.round((subtotal * state.discountPercent) / 100);
  const taxableAmount = subtotal - discountAmount;
  const gstRate = 18; // 18% standard GST
  const gstAmount = Math.round((taxableAmount * gstRate) / 100);
  const grandTotal = taxableAmount + gstAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    dispatch({ type: 'APPLY_COUPON', payload: couponText });
  };

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <div style={styles.header}>
        <h2 style={styles.pageTitle}>Online Shopping Cart</h2>
        <p style={styles.pageSubtitle}>
          Assignment 5: State Management using useReducer, GST Calculation & Coupons
        </p>
      </div>

      <div style={styles.mainLayout}>
        {/* Left Column: Product Catalog */}
        <div style={styles.productCatalogSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Available Products</h3>
            <span style={styles.badge}>{PRODUCTS.length} Items</span>
          </div>

          <div style={styles.productGrid}>
            {PRODUCTS.map((product) => {
              const inCart = state.cart.find((item) => item.id === product.id);
              return (
                <div key={product.id} style={styles.productCard}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={styles.productImage}
                  />
                  <span style={styles.categoryLabel}>{product.category}</span>
                  <h4 style={styles.productName}>{product.name}</h4>
                  <div style={styles.cardFooter}>
                    <span style={styles.priceTag}>
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({ type: 'ADD_TO_CART', payload: product })
                      }
                      style={styles.addToCartBtn}
                    >
                      {inCart ? `Add More (${inCart.quantity})` : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Shopping Cart & Checkout */}
        <div style={styles.cartSection}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Shopping Cart</h3>
            <span style={styles.badge}>
              {state.cart.reduce((sum, item) => sum + item.quantity, 0)} Items
            </span>
          </div>

          {state.cart.length === 0 ? (
            <div style={styles.emptyCartBox}>
              <p style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 6px 0' }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
                Select products from the catalog to add items to your cart.
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div style={styles.cartItemsList}>
                {state.cart.map((item) => (
                  <div key={item.id} style={styles.cartItemRow}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={styles.cartThumb}
                    />
                    <div style={styles.cartDetails}>
                      <h5 style={styles.cartItemName}>{item.name}</h5>
                      <span style={styles.cartItemPrice}>
                        ₹{item.price.toLocaleString('en-IN')} each
                      </span>

                      {/* Quantity Controls */}
                      <div style={styles.qtyControlRow}>
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: item.quantity - 1 }
                            })
                          }
                          style={styles.qtyBtn}
                        >
                          -
                        </button>
                        <span style={styles.qtyText}>{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { id: item.id, quantity: item.quantity + 1 }
                            })
                          }
                          style={styles.qtyBtn}
                        >
                          +
                        </button>

                        <button
                          onClick={() =>
                            dispatch({ type: 'REMOVE_ITEM', payload: item.id })
                          }
                          style={styles.removeLink}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div style={styles.itemTotal}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div style={styles.summaryBox}>
                <label style={styles.boxLabel}>Promotional Coupon</label>
                <form onSubmit={handleApplyCoupon} style={styles.couponForm}>
                  <input
                    type="text"
                    placeholder="e.g. SAVE10, COLLEGE20"
                    value={couponText}
                    onChange={(e) => setCouponText(e.target.value)}
                    style={styles.couponInput}
                  />
                  <button type="submit" style={styles.applyCouponBtn}>
                    Apply
                  </button>
                </form>

                {state.appliedCoupon && (
                  <div style={styles.appliedCouponTag}>
                    <span>
                      Active Coupon: <strong>{state.appliedCoupon}</strong> ({state.discountPercent}% OFF)
                    </span>
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_COUPON' })}
                      style={styles.removeCouponLink}
                    >
                      Remove
                    </button>
                  </div>
                )}

                {state.couponStatus.message && (
                  <div
                    style={{
                      ...styles.alertBanner,
                      backgroundColor:
                        state.couponStatus.type === 'success'
                          ? '#064e3b'
                          : state.couponStatus.type === 'error'
                          ? '#7f1d1d'
                          : '#1e293b',
                      color:
                        state.couponStatus.type === 'success'
                          ? '#6ee7b7'
                          : state.couponStatus.type === 'error'
                          ? '#fca5a5'
                          : '#94a3b8'
                    }}
                  >
                    {state.couponStatus.message}
                  </div>
                )}
              </div>

              {/* Financial Calculation Summary */}
              <div style={styles.summaryBox}>
                <div style={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {state.discountPercent > 0 && (
                  <div style={{ ...styles.summaryRow, color: '#34d399' }}>
                    <span>Discount ({state.discountPercent}%)</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div style={styles.summaryRow}>
                  <span>Taxable Amount</span>
                  <span>₹{taxableAmount.toLocaleString('en-IN')}</span>
                </div>

                <div style={styles.summaryRow}>
                  <span>GST ({gstRate}%)</span>
                  <span>+ ₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>

                <div style={styles.grandTotalRow}>
                  <span>Grand Total</span>
                  <span style={styles.grandTotalValue}>
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() =>
                    alert(`Order Placed Successfully! Total: ₹${grandTotal.toLocaleString('en-IN')}`)
                  }
                  style={styles.checkoutBtn}
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  style={styles.clearCartBtn}
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Styling Object
const styles = {
  container: {
    padding: '30px 20px',
    maxWidth: '1280px',
    margin: '0 auto',
    color: '#f8fafc'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  pageTitle: {
    color: '#38bdf8',
    margin: '0 0 6px 0',
    fontSize: '28px',
    fontWeight: '700'
  },
  pageSubtitle: {
    color: '#94a3b8',
    margin: 0,
    fontSize: '14px'
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '30px',
    alignItems: 'start'
  },
  productCatalogSection: {
    flex: '1.4'
  },
  cartSection: {
    flex: '1',
    backgroundColor: '#111827',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #1f2937',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.4)'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  sectionTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#f1f5f9'
  },
  badge: {
    backgroundColor: '#1e293b',
    color: '#38bdf8',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid #334155'
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '20px'
  },
  productCard: {
    backgroundColor: '#1e293b',
    borderRadius: '14px',
    padding: '16px',
    border: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column'
  },
  productImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '12px'
  },
  categoryLabel: {
    fontSize: '11px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
    fontWeight: '600'
  },
  productName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#f8fafc',
    margin: '0 0 12px 0',
    lineHeight: '1.4',
    flex: '1'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto'
  },
  priceTag: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#38bdf8'
  },
  addToCartBtn: {
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  emptyCartBox: {
    textAlign: 'center',
    padding: '40px 10px',
    color: '#64748b'
  },
  cartItemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginBottom: '20px'
  },
  cartItemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#1f2937',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #374151'
  },
  cartThumb: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  cartDetails: {
    flex: '1'
  },
  cartItemName: {
    margin: '0 0 4px 0',
    fontSize: '13px',
    color: '#f9fafb',
    fontWeight: '600'
  },
  cartItemPrice: {
    fontSize: '12px',
    color: '#9ca3af',
    display: 'block',
    marginBottom: '8px'
  },
  qtyControlRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  qtyBtn: {
    backgroundColor: '#374151',
    color: '#f3f4f6',
    border: 'none',
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyText: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#f9fafb',
    minWidth: '16px',
    textAlign: 'center'
  },
  removeLink: {
    backgroundColor: 'transparent',
    color: '#f87171',
    border: 'none',
    fontSize: '11px',
    cursor: 'pointer',
    marginLeft: '6px',
    textDecoration: 'underline'
  },
  itemTotal: {
    fontWeight: '700',
    color: '#38bdf8',
    fontSize: '14px'
  },
  summaryBox: {
    backgroundColor: '#1f2937',
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '16px',
    border: '1px solid #374151',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  boxLabel: {
    fontSize: '12px',
    color: '#cbd5e1',
    fontWeight: '600',
    display: 'block'
  },
  couponForm: {
    display: 'flex',
    gap: '8px'
  },
  couponInput: {
    flex: '1',
    backgroundColor: '#111827',
    border: '1px solid #4b5563',
    borderRadius: '6px',
    padding: '8px 12px',
    color: '#ffffff',
    fontSize: '13px',
    outline: 'none'
  },
  applyCouponBtn: {
    backgroundColor: '#38bdf8',
    color: '#0f172a',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '12px',
    cursor: 'pointer'
  },
  appliedCouponTag: {
    fontSize: '12px',
    color: '#34d399',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  removeCouponLink: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#f87171',
    fontSize: '11px',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  alertBanner: {
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#cbd5e1'
  },
  grandTotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px dashed #4b5563',
    paddingTop: '12px',
    marginTop: '4px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#f9fafb'
  },
  grandTotalValue: {
    fontSize: '20px',
    color: '#38bdf8'
  },
  checkoutBtn: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '6px'
  },
  clearCartBtn: {
    backgroundColor: 'transparent',
    color: '#9ca3af',
    border: '1px solid #4b5563',
    padding: '8px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  }
};