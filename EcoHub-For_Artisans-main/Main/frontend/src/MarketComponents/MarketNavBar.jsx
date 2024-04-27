/* eslint-disable react/prop-types */
import { Menu, X, ShoppingCart, ChevronRight } from 'lucide-react'; // Replace ShoppingCart with the actual cart icon if different
import logo from '../assets/logomain.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const menuItems = [
  {
    name: 'Innovative',
    href: '/customer-dashboard',
  },
  {
    name: 'Waste',
    href: '/market-waste',
  },
];               

export function MarketNavBar({ setSearchQuery }) {
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex justify-between items-center max-w-7xl px-4 py-2 lg:py-4 lg:px-8 xl:px-10">
        <div className="flex items-center space-x-4">
          <Link to="/customer-dashboard" className='lg:-ml-24 lg:mr-8'>
            <img src={logo} alt="Logo" className="h-12 lg:h-16 md:h-4" />
          </Link>
          <div className="hidden lg:block">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-lg font-semibold text-gray-800 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center">
          <div className="lg:flex-shrink lg:w-64">
            <input
              className="lg:w-full h-10 px-3 py-2 rounded-md bg-gray-100 text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1"
              type="text"
              placeholder="Search"
              onChange={handleSearchInputChange}
            />
          </div>
          <Link to='/cart' className='pl-5'>
            <ShoppingCart className="h-8 w-8 mr-4 text-gray-800 hover:text-gray-900" />
          </Link>
          <Link to='/customer-profile' className='lg:-mr-28'>
            <img src="src/assets/avatar.jpg" alt="Profile" className="h-12 w-12 rounded-full mr-4 " />
          </Link>
          <Menu
            onClick={toggleMenu}
            className="lg:hidden h-8 w-8 text-gray-800 hover:text-gray-900 cursor-pointer"
          />
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-0 z-50 bg-white shadow-lg lg:hidden">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <Link to="/homepage">
                <img src={logo} alt="Logo" className="h-12 lg:h-16" />
              </Link>
              <button
                type="button"
                onClick={toggleMenu}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
            <nav className="grid gap-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center text-lg font-semibold text-gray-800 hover:text-gray-900"
                >
                  <span>{item.name}</span>
                  <ChevronRight className="h-6 w-6 ml-2" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
