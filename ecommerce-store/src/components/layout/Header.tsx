import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated = false, logout = () => {}, user = null } = useAuth() || {};
  const { totalItems = 0 } = useCart() || {};
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside of user menu to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const handleLogout = () => {
    if (typeof logout === 'function') {
      logout();
      navigate('/');
      setShowUserMenu(false);
    }
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavigation = (path: string, e: React.MouseEvent<HTMLAnchorElement>, onClick?: () => void) => {
    if (onClick) {
      e.preventDefault();
      onClick();
      return;
    }

    if (location.pathname === path) {
      e.preventDefault();
      return;
    }

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    if (isAccountMenuOpen) {
      setIsAccountMenuOpen(false);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            E-Store
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                onClick={(e) => handleNavigation(item.path, e)}
                className={`font-poppins text-sm font-medium transition-colors duration-300 ${
                  (item.path === '/' && location.pathname === '/') || 
                  (item.path !== '/' && location.pathname.startsWith(item.path))
                    ? 'text-primary' 
                    : 'text-neutral-dark dark:text-neutral-light hover:text-primary dark:hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User menu and cart */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full text-sm bg-neutral-light dark:bg-neutral-dark border border-neutral-mid focus:outline-none focus:border-primary w-40 transition-all duration-300 focus:w-60"
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-dark dark:text-neutral-light">
                <svg 
                  className="w-4 h-4"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <Link to="/cart" className="relative">
              <svg 
                className="w-6 h-6 text-neutral-dark dark:text-neutral-light hover:text-primary dark:hover:text-primary transition-colors duration-300"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-tertiary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{totalItems}</span>
            </Link>

            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-neutral-dark dark:text-neutral-light hover:text-primary transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <span className="font-medium hidden md:block">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <svg className="w-4 h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-dark rounded-md shadow-lg py-1 z-10 border dark:border-neutral-mid">
                    <div className="px-4 py-2 border-b dark:border-neutral-mid">
                      <p className="text-sm text-neutral-mid dark:text-neutral-light">Signed in as</p>
                      <p className="font-medium truncate text-neutral-dark dark:text-white">{user?.email}</p>
                    </div>
                    {user?.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-blue-600 hover:bg-black hover:text-white dark:hover:bg-black transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        🔧 Admin Panel
                      </Link>
                    )}
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-neutral-dark dark:text-neutral-light hover:bg-black hover:text-white dark:hover:bg-black transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-black hover:text-white dark:hover:bg-black transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-neutral-dark dark:text-neutral-light hover:text-primary transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;