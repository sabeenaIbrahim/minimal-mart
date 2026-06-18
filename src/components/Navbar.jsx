import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CartIcon, HeartIcon, SearchIcon, FilterIcon, SortIcon } from './Icons';

export default function Navbar({ openCart, openWishlist }) {
  const { 
    cart, wishlist, search, setSearch, category, setCategory,
    sortOrder, setSortOrder
  } = useContext(ShopContext);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div className="navbar-brand">
          <h1>Minimal-mart</h1>
        </div>
        
        <div className="search-wrapper">
          <SearchIcon />
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search items..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="nav-buttons">
          <button className="icon-btn" onClick={openWishlist} aria-label="Wishlist">
            <HeartIcon filled={wishlist.length > 0} />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </button>
          <button className="icon-btn" onClick={openCart} aria-label="Cart">
            <CartIcon />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
        </div>
      </div>

      <div className="navbar-filters" style={{ display: 'flex', width: '100%', justifyContent: 'left', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--bg-secondary)' }}>
        <div className="category-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
          <FilterIcon />
          <select 
            className="category-select" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={{ border: 'none', background: 'transparent', padding: '0', cursor: 'pointer', fontWeight: 'bold' }}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
          </select>
        </div>
        <div className="sort-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
          <SortIcon />
          <select 
            className="category-select" 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ border: 'none', background: 'transparent', padding: '0', cursor: 'pointer', fontWeight: 'bold' }}
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
