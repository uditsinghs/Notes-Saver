import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold hover:text-gray-200">PasteApp</Link>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="text-lg hover:bg-blue-700 px-3 py-2 rounded-md">Home</Link>
            <Link to="/pastes" className="text-lg hover:bg-blue-700 px-3 py-2 rounded-md">Paste</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white hover:text-gray-300 focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={toggleMenu} className="block text-lg hover:bg-blue-700 px-3 py-2 rounded-md">Home</Link>
            <Link to="/pastes" onClick={toggleMenu} className="block text-lg hover:bg-blue-700 px-3 py-2 rounded-md">Paste</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
