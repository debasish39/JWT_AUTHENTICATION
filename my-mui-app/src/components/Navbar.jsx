import { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { getToken } from '../services/LocalStorageService';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  // const { access_token } = getToken();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition duration-200 ${
      isActive ? 'bg-purple-800 text-white' : 'text-white hover:bg-purple-700'
    }`;

  return (
    <header className="bg-purple-600 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-semibold text-white">JSK</h1>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="md:hidden pr-3">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl focus:outline-none cursor-pointer">
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-4">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/login" className={navLinkClass}>
            Login/Registration
          </NavLink>
        </div>
      </nav>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 pr-9 bg-purple-600 w-full">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Contact
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink to="/login" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Login/Registration
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
