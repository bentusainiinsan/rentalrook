
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { COMPANY_INFO } from '../constants';

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

interface HeaderProps {
    setCurrentView: (view: 'home' | 'addProperty' | 'admin') => void;
}

const Header: React.FC<HeaderProps> = ({ setCurrentView }) => {
    const { isLoggedIn, user, login, logout, openBookingModal, properties } = useContext(AppContext);

    const handleLogin = () => {
        // Mock Google Login
        const email = prompt("Enter your email to login (e.g., user@example.com or admin@example.com)");
        if (email) {
            const isAdmin = email === 'admin@example.com';
            login({ name: email.split('@')[0], email, isAdmin });
        }
    };
    
    const handleCartClick = () => {
        const testProperty = properties.find(p => p.rent === 1);
        if (testProperty) {
            openBookingModal(testProperty);
        } else {
            alert("Test product not found.");
        }
    };

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href={COMPANY_INFO.logoRedirectUrl} className="flex items-center space-x-2">
                             <img className="h-10 w-auto" src="https://picsum.photos/seed/logo/200/200" alt="Company Logo" />
                             <span className="text-xl font-bold text-gray-800 tracking-tight">{COMPANY_INFO.name}</span>
                        </a>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                         <button onClick={() => setCurrentView('home')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</button>
                        {isLoggedIn && <button onClick={() => setCurrentView('addProperty')} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">List Property</button>}
                        {user?.isAdmin && <button onClick={() => setCurrentView('admin')} className="text-red-600 hover:text-red-800 font-bold transition-colors">Admin Panel</button>}
                    </nav>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">Welcome, {user?.name}</span>
                                <button onClick={logout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleLogin} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Login with Google
                            </button>
                        )}
                         <button onClick={handleCartClick} className="p-2 rounded-full text-gray-600 hover:bg-gray-200 hover:text-blue-600 transition-colors">
                            <CartIcon />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
