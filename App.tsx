
import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PropertyList from './components/PropertyList';
import AddPropertyForm from './components/AddPropertyForm';
import AdminPanel from './components/AdminPanel';
import BookingModal from './components/BookingModal';
import { AppContext } from './context/AppContext';

type View = 'home' | 'addProperty' | 'admin';

const backgroundThemes = [
    'from-slate-50 to-gray-100',
    'from-sky-50 to-blue-100',
    'from-emerald-50 to-green-100',
    'from-amber-50 to-yellow-100',
    'from-violet-50 to-purple-100',
    'from-rose-50 to-pink-100',
];

const App: React.FC = () => {
    const [themeIndex, setThemeIndex] = useState(0);
    const { user } = useContext(AppContext);
    const [currentView, setCurrentView] = useState<View>('home');

    useEffect(() => {
        const themeInterval = setInterval(() => {
            setThemeIndex((prevIndex) => (prevIndex + 1) % backgroundThemes.length);
        }, 60000); // Change theme every minute

        return () => clearInterval(themeInterval);
    }, []);

    const renderView = () => {
        switch (currentView) {
            case 'addProperty':
                return <AddPropertyForm />;
            case 'admin':
                return user?.isAdmin ? <AdminPanel /> : <div className="text-center p-8 text-red-500 font-bold">Access Denied</div>;
            case 'home':
            default:
                return <PropertyList />;
        }
    };

    return (
        <div className={`min-h-screen flex flex-col bg-gradient-to-br ${backgroundThemes[themeIndex]} transition-all duration-1000`}>
            <Header setCurrentView={setCurrentView} />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderView()}
            </main>
            <Footer />
            <BookingModal />
        </div>
    );
};

export default App;
