import React, { useState, useEffect, useContext, createContext, useMemo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- BUNDLED FROM types.ts ---
interface User {
    name: string;
    email: string;
    isAdmin: boolean;
}

enum PropertyType {
    Room = 'कमरा',
    Shop = 'दुकान',
    House = 'मकान',
    Factory = 'फैक्ट्री',
    Godown = 'गोडाउन',
    Kothi = 'कोठी',
}

interface Property {
    id: string;
    title: string;
    type: PropertyType;
    location: {
        block: string;
        area: string;
    };
    address: string;
    rent: number;
    images: string[];
    owner: {
        name: string;
        phone: string;
    };
    description: string;
    isVerified: boolean;
}

interface BookingDetails {
    customerName: string;
    mobileNumber: string;
    email: string;
    fullAddress: string;
    landmark: string;
    pincode: string;
}

// --- BUNDLED FROM constants.ts ---
const COMPANY_INFO = {
    name: "Sonipat Home Service.com",
    phone: "8816014071",
    email: "care@sonipathomeservice.com",
    address: "128/1, Sainipura, Sonipat",
    officeLocationUrl: "https://www.google.com/maps?q=29.006456480081468,77.01762222665928",
    logoRedirectUrl: "https://www.sonipathomeservice.com",
};

const SOCIAL_LINKS = {
    facebook: "https://www.facebook.com/sonipathomeservice",
    instagram: "https://www.instagram.com/sonipathomeservice",
    x: "https://x.com/sonipathome",
    whatsapp: "https://wa.me/918816014071",
};

const APP_INFO = {
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.crapd.sonipathomeservice",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://play.google.com/store/apps/details?id=com.crapd.sonipathomeservice",
};

const LOCATION_DATA: { [key: string]: string[] } = {
  "Sonipat": ["4 Marla", "8 Marla", "Adersh Nagar", "Anand Nagar", "Arya Nagar", "Ashok Nagar", "Ashok Vihar", "Baba Colony", "Badwasni Gaon", "Bandepur", "Bara Bagad", "Batra Colony", "Bayanpur", "Bhagat Pura", "Bhagat Singh Colony", "Bharam Colony", "Bharam Nagar", "Bharatpuri", "Bhattan Mohalla", "Bheem Nagar", "Chawla Colony", "Chintpurni Colony", "Chitana Gaon", "Chotu Ram Chowk", "Chouhan Colony", "Davru Gaon", "Davru Road", "Defence Colony", "Deha Basti", "Delhi Camp", "Dev Nagar", "Dhanak Basti", "Dhiya Colony'", "Double Story", "Faj Bazar", "Faraz Khana", "Ganj Bazar", "Garh Sahajanpur", "Garhi Bharmana", "Garhi Gasita", "Gokul Nagar", "Govind Nagar", "Hanuman Nagar", "Hem Park", "Hullaheri Gaon", "Indian Colony", "Indra Colony", "Indra Colony, Kailash Pur", "Jamalpura", "Janta Colony", "Jatti Kalan", "Jatwara", "Jawahar Nagar", "Jeevan Nagar", "Kaath Mandi", "Kabir Nagar-Kalupur", "Kabir Pur", "Kachhey Querter", "Kailash Colony", "Kakroi Road", "Kalash Colony", "Kalupur", "Katth Mandi", "Khan Colony", "Khari Kwa", "Kot Mohalla", "Krishan Pura", "Krishana Nagar", "Kriti Nagar", "Kumhar Gate", "Lajpat Nagar", "Lal Darwaja", "Lehrara", "Luxmi Nagar", "Mahabir Colony", "Malviya Nagar", "Mamchand Colony", "Maya Puri", "Mc Colony", "Mirch Mandi", "Mission Road", "Model Town", "Mohalla Kalan", "Mohan Nagar", "Mohanpura", "Nandwani Nagar", "Narender Nagar", "New Jeevan Nagar", "Old Housing Board Colony", "Om Colony", "Omnagar", "Other", "Pancham Nagar", "Parbhu Nagar", "Pargati Nagar", "Patel Nagar", "Prem Nagar", "Prem Nagar- Kakroi Road", "Prem Nagar-Behind Bus Stand", "Pwd Colony", "Railway Colony", "Raj Mohalla", "Rajiv Colony", "Rajiv Nagar", "Ram Nagar", "Rishi Colony", "Rk Colony", "Roop Nagar", "Sabun Darwaja", "Sai Baba Colony", "Sainipura", "Sant Garb Dass Nagar", "Sector 1", "Sector 10", "Sector 11", "Sector 12", "Sector 13", "Sector 14", "Sector 15", "Sector 15 Housing Board", "Sector 16", "Sector 17", "Sector 18", "Sector 19", "Sector 23", "Sector 3", "Sector 7", "Sector 9", "Shadipur", "Shanti Vihar", "Shartri Colony", "Shastri Park", "Shiv Colony", "Sidharth Colony", "Sikka Colony", "Sri Nagar", "Sudama Nagar", "Sujjan Singh Park", "Sundal Mohalla", "Sunder Sawari", "Tara Nagar", "Teacher Colony", "Uttam Nagar", "Vikas Nagar", "Vikas Nagar- Murthal Road", "Vishal Nagar", "West Ram Nagar"],
  "Gannaur": ["Anup Nagar", "B.S.T Colony", "Baddi", "Badi leharari", "Barodth", "Baye barodth", "Bega", "Bhakadpur", "Bhuri", "Bigaan", "Chirsmi", "chotti leharari", "Deha", "Dhatoli", "Dhutri", "Gandhi Nagar", "Gannaur Mandi", "Garhi gulama", "Garhi Kashri", "Gayaspur", "Ghasoli", "Hari Nagar", "Hasanpur", "Janta School", "K.D.Nagar", "Kami", "Khera Taga", "Kot Mohalla", "Kurad", "Ladsoli", "lala Garhi", "Maichand Colony", "Namaste Chowk", "Papnera", "Pardhanwas Mohalla", "Patti bharaman", "Peer garhi", "Pelanda garhi", "Pipli khera", "Rajpura", "Ramnagar", "Rashulpur", "Rehda Basti", "Roshanpur", "Shashtri Nagar", "Shehpur", "Sunfeda", "Tandoli", "Umedgarh", "Vasant Nagar"],
  "Kharkhoda": ["Badhana", "Bahiyanpur", "Barona", "Bidhallan", "Farmana", "Fathepur", "Firozpur Bangar", "Garhi Sisana", "Gopalpur", "Gorad", "Harshana Kalan", "Jagdishpur", "Jatola", "Jhanjoli", "Jharoth", "Jharothi", "Kakroi", "Katlupur", "Khanda", "Kharkhoda", "Kheri Dhaiya", "Khrumpur", "Kundal", "Leharara", "Livaan", "Mandora", "Mandori", "Matindu", "Mohammdabad", "Mojamnagar", "Nakloi", "Naseebpur Bangar", "Nasirpur Choulka", "Nirthaan", "Nithaan", "Nizampur Khurd", "Nizampur Mazra", "Pai", "Parladpur", "Pipli", "Quali", "Rathdhana", "Redhu", "Rohana", "Rohat", "Shedpur", "Sheri", "Shotti", "Silana", "Sinoli", "Sisana", "Thana Kalan", "Thana Khurd", "Trukhpur"],
  "Kailana": ["Agawanpur", "Ahulana", "Attal", "Bajana Kalan", "Bajana Khurd", "Balli", "Bhaver", "Bilindpur", "Chatiya", "Gamdaa", "Ghummad", "Heer Mazra", "Jahri", "Jassi Pur", "Kalana", "Kehri", "Khabru", "Mazra", "Naya Bass", "Panchi", "Pugthalla", "Purkash", "Razlu Garhi", "Sandal Kalan", "Sandal Khurd", "Sardaana", "Sazadpur", "Seeya Khera", "Shekpura", "Tavedi", "Tharu"],
  "Rai Bahalgarh": ["Aterna", "Bad Malik", "Badkhalsha", "Badoli", "Bahalgarh", "Barota", "Behra ( Bakipur)", "Chauhan Joshi", "Chetera", "Dadhi Nangal", "Dipalpur", "Garh Marikpur", "Garh Sejhenpur", "Jagdishpur", "Jainpur", "Jakholi", "Jat Joshi", "Jathadi", "Jatti Kalan", "Jhundpur", "Kamaspur", "Kheri", "Khewara", "Khurampur", "Kundli", "Liwaspur", "Makimpur", "Malikpur", "Manoli", "Mazra", "Mehandipur", "Mimarpur", "Murthal", "Nandnaur", "Nangal", "Nathupur", "Nehra", "Nehri", "Orangabad", "Palada", "Paladi", "Peou Manhari", "Rai", "Raipur", "Rasoi", "Revali", "Saberpur", "Seveli", "Shahpur", "Tanda", "Tikola"],
  "Gohana": ["Abadi rattangarh", "Adarsh Nagar", "Badota", "Badwasni", "Baggad", "Barota", "Bhaadi", "Bhatana", "Bhatgaon dugran", "Bhatgaon dugran garhi haqiqat", "Bhatgaon maalyan", "Bidghal", "Bohelaa", "Chatiya Deva", "Chitana", "Chopra Colony", "citawali", "Dariyapur Basti", "Dodavaa", "Dubeta", "Gamadi", "Gangser", "Garhi Naamdar Khaa", "Garhi Sarai naamdaar kha", "Garhi Ujala khaa", "Gohana City", "Gohana Mandi", "Grina", "Gudaa", "Hasangarh", "Hullaheri", "Jaji", "Jholly", "Jind Road", "Jolly", "Jua", "Kakaana", "Kalana Khash", "Kashandi", "Kasnada", "Keravedi", "Khandrai", "Khanpur kalan", "Kheri", "Kheri damkan", "Khijrpur jaat mazra", "Kilhond", "Lath", "Laxmi Nagar", "Luhari Tibba", "Machri", "Mahalana", "Mahipur", "Mazri", "Mehra", "Mohana", "Nagar", "Nayat", "Nenna", "Pinana", "Punjabi Colony", "Remana", "Rolad", "Sainipura", "Salarpur mazra", "Salimsar mazra", "Silampur trally", "Sonipat Road", "SP Majra", "Surgathal", "Thehad", "Thihaad kalan", "Thihaad khurd", "Vishnu Nagar", "Wazirpur"]
};

const INITIAL_PROPERTIES: Property[] = [
    {
        id: 'test_1',
        title: 'Testing Property',
        type: PropertyType.Room,
        location: { block: 'Sonipat', area: 'Model Town' },
        address: 'Near Main Market, Model Town',
        rent: 1,
        images: ['https://picsum.photos/seed/test1/800/600', 'https://picsum.photos/seed/test2/800/600', 'https://picsum.photos/seed/test3/800/600'],
        owner: { name: 'Test Owner', phone: '9876543210' },
        description: 'This is a test property with a price of Rs. 1 for payment gateway testing.',
        isVerified: true,
    },
    {
        id: 'prop_123',
        title: 'Spacious 2 BHK House in Sector 14',
        type: PropertyType.House,
        location: { block: 'Sonipat', area: 'Sector 14' },
        address: '123, Green Park, Sector 14, Sonipat',
        rent: 15000,
        images: ['https://picsum.photos/seed/house1/800/600', 'https://picsum.photos/seed/house2/800/600', 'https://picsum.photos/seed/house3/800/600'],
        owner: { name: 'Ramesh Kumar', phone: '8816014071' },
        description: 'A beautiful and spacious 2 BHK house available for rent in a prime location. Close to market and school.',
        isVerified: true,
    },
    {
        id: 'prop_456',
        title: 'Commercial Shop on Murthal Road',
        type: PropertyType.Shop,
        location: { block: 'Rai Bahalgarh', area: 'Murthal' },
        address: 'Shop No. 5, Main Murthal Road, Near Ahuja Dhaba',
        rent: 25000,
        images: ['https://picsum.photos/seed/shop1/800/600', 'https://picsum.photos/seed/shop2/800/600', 'https://picsum.photos/seed/shop3/800/600'],
        owner: { name: 'Sunita Devi', phone: '9998887776' },
        description: 'Prime location shop suitable for any business. High footfall area.',
        isVerified: false,
    },
     {
        id: 'prop_789',
        title: 'Large Godown in Kundli Industrial Area',
        type: PropertyType.Godown,
        location: { block: 'Rai Bahalgarh', area: 'Kundli' },
        address: 'Plot 42, Sector 53, HSIIDC Kundli',
        rent: 75000,
        images: ['https://picsum.photos/seed/godown1/800/600', 'https://picsum.photos/seed/godown2/800/600', 'https://picsum.photos/seed/godown3/800/600'],
        owner: { name: 'Anil Singhania', phone: '9123456789' },
        description: 'Massive 5000 sq. ft. godown available for rent in Kundli. Suitable for storage and logistics.',
        isVerified: true,
    }
];

// --- BUNDLED FROM context/AppContext.tsx ---
interface AppContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (user: User) => void;
    logout: () => void;
    properties: Property[];
    addProperty: (property: Property) => void;
    deleteProperty: (propertyId: string) => void;
    togglePropertyVerification: (propertyId: string) => void;
    isBookingModalOpen: boolean;
    bookingProperty: Property | null;
    openBookingModal: (property: Property) => void;
    closeBookingModal: () => void;
    submitBooking: (details: BookingDetails) => Promise<{ success: boolean; transactionId?: string }>;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingProperty, setBookingProperty] = useState<Property | null>(null);

    const login = (userData: User) => setUser(userData);
    const logout = () => setUser(null);

    const addProperty = (property: Property) => {
        setProperties(prev => [property, ...prev]);
        // In a real app, you would send this data to your backend/Google Sheet here.
        // And trigger an email notification.
        alert('Property listed successfully! (Locally)');
    };
    
    const deleteProperty = (propertyId: string) => {
        setProperties(prev => prev.filter(p => p.id !== propertyId));
        alert('Property deleted successfully! (Locally)');
    };

    const togglePropertyVerification = (propertyId: string) => {
        setProperties(prev => 
            prev.map(p => 
                p.id === propertyId ? { ...p, isVerified: !p.isVerified } : p
            )
        );
        alert('Property verification status updated! (Locally)');
    };

    const openBookingModal = (property: Property) => {
        setBookingProperty(property);
        setIsBookingModalOpen(true);
    };

    const closeBookingModal = () => {
        setBookingProperty(null);
        setIsBookingModalOpen(false);
    };

    const submitBooking = (details: BookingDetails): Promise<{ success: boolean, transactionId?: string }> => {
        // This function simulates the payment process
        return new Promise((resolve) => {
            console.log("Booking Details:", details);
            console.log("For Property:", bookingProperty);

            // Simulating payment success
            setTimeout(() => {
                const transactionId = `txn_${Date.now()}`;
                console.log(`Payment successful! Transaction ID: ${transactionId}`);
                resolve({ success: true, transactionId });
            }, 1500); // Simulate network delay
        });
    };

    return (
        <AppContext.Provider value={{
            user,
            isLoggedIn: !!user,
            login,
            logout,
            properties,
            addProperty,
            deleteProperty,
            togglePropertyVerification,
            isBookingModalOpen,
            bookingProperty,
            openBookingModal,
            closeBookingModal,
            submitBooking
        }}>
            {children}
        </AppContext.Provider>
    );
};

// --- BUNDLED FROM components/Header.tsx ---
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


// --- BUNDLED FROM components/Footer.tsx ---
const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.034C18.343 21.128 22 16.991 22 12z"/></svg>
);
const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163C8.84 0 8.424.012 7.148.07c-3.556.162-6.15 2.75-6.312 6.312C.012 8.424 0 8.84 0 12s.012 3.576.07 4.852c.162 3.562 2.756 6.15 6.312 6.312 1.274.058 1.69.07 4.852.07s3.578-.012 4.852-.07c3.556-.162 6.15-2.75 6.312-6.312.058-1.274.07-1.69.07-4.852s-.012-3.578-.07-4.852c-.162-3.562-2.756-6.15-6.312-6.312-1.274-.058-1.69-.07-4.852-.07zM12 6.837a5.163 5.163 0 100 10.326 5.163 5.163 0 000-10.326zm0 8.326a3.163 3.163 0 110-6.326 3.163 3.163 0 010 6.326zm6.406-9.818a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"/></svg>
);
const XIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const WhatsappIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.82-1.26-4.38 0-4.54 3.69-8.23 8.24-8.23 4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.82s-.39-.12-.56.12c-.17.25-.64.82-.79.98s-.29.19-.54.06c-1.24-.46-2.07-1.1-2.87-2.12-.22-.29-.04-.45.08-.57s.25-.29.37-.44c.06-.07.12-.13.19-.22s.03-.17-.03-.31c-.12-.25-.56-1.34-.76-1.84s-.4-.42-.55-.42h-.5c-.17 0-.45.06-.68.31s-.86.85-.86 2.07c0 1.22.88 2.4 1 2.56s1.73 2.63 4.18 3.72c.32.14.7.27.9.36.46.21.87.18 1.18.11.36-.09.68-.21 1.47-.85.25-.21.25-.39.17-.51l-.24-.12z"/></svg>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-white/60 backdrop-blur-sm mt-12 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-800">{COMPANY_INFO.name}</h3>
                        <p className="mt-2 text-gray-600">Your one-stop solution for property rentals in the Sonipat region. We connect property owners with tenants seamlessly.</p>
                        <div className="mt-4">
                            <p className="text-gray-700 font-medium">Address:</p>
                            <p className="text-gray-600">{COMPANY_INFO.address}</p>
                            <a href={COMPANY_INFO.officeLocationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">View on Google Maps</a>
                        </div>
                         <div className="mt-4">
                            <p className="text-gray-700 font-medium">Contact:</p>
                            <p className="text-gray-600">Phone: {COMPANY_INFO.phone}</p>
                             <p className="text-gray-600">Email: {COMPANY_INFO.email}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Connect With Us</h3>
                        <div className="flex space-x-4 mt-4 text-gray-700">
                            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors"><FacebookIcon /></a>
                            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors"><InstagramIcon /></a>
                            <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><XIcon /></a>
                            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors"><WhatsappIcon /></a>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-gray-800">Download Our App</h3>
                        <div className="flex items-center space-x-4 mt-4">
                            <img src={APP_INFO.qrCodeUrl} alt="Download App QR Code" className="w-24 h-24" />
                            <a href={APP_INFO.playStoreUrl} target="_blank" rel="noopener noreferrer">
                                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-12"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

// --- BUNDLED FROM components/PropertyCard.tsx ---
interface PropertyCardProps {
    property: Property;
}

const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>;
const OwnerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const VerifiedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;


const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { isLoggedIn, openBookingModal } = useContext(AppContext);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    };
    
    const maskName = (name: string) => name.substring(0, Math.floor(name.length / 2)) + '****';
    const maskPhone = (phone: string) => phone.substring(0, phone.length - 5) + '*****';

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="relative h-56">
                <img src={property.images[currentImageIndex]} alt={property.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex justify-between items-center px-2">
                    <button onClick={prevImage} className="text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-75">&lt;</button>
                    <button onClick={nextImage} className="text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-75">&gt;</button>
                </div>
                 <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{property.type}</div>
                 {property.isVerified && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                        <VerifiedIcon />
                        <span>Verified</span>
                    </div>
                )}
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 truncate">{property.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center"><LocationIcon />{property.location.area}, {property.location.block}</p>
                    <p className="text-gray-700 mt-2">{isLoggedIn ? property.address : 'Login to see full address'}</p>
                    <p className="text-sm text-gray-600 my-2 h-10 overflow-hidden">{property.description}</p>
                </div>
                <div>
                     <div className="mt-4 border-t pt-3">
                        <div className="flex items-center text-gray-700">
                           <OwnerIcon /> <span className="font-medium">Owner:</span>&nbsp;{isLoggedIn ? property.owner.name : maskName(property.owner.name)}
                        </div>
                        <div className="flex items-center text-gray-700 mt-1">
                            <PhoneIcon /> <span className="font-medium">Contact:</span>&nbsp;{isLoggedIn ? property.owner.phone : maskPhone(property.owner.phone)}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-2xl font-bold text-blue-600">₹{property.rent.toLocaleString()}<span className="text-base font-normal text-gray-500">/month</span></p>
                        <button 
                            onClick={() => openBookingModal(property)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- BUNDLED FROM components/PropertyList.tsx ---
const PropertyList: React.FC = () => {
    const { properties } = useContext(AppContext);
    const [selectedBlock, setSelectedBlock] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProperties = useMemo(() => {
        return properties.filter(p => {
            const blockMatch = selectedBlock === 'All' || p.location.block === selectedBlock;
            const typeMatch = selectedType === 'All' || p.type === selectedType;
            const searchMatch = searchTerm === '' || 
                                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                p.location.area.toLowerCase().includes(searchTerm.toLowerCase());
            return blockMatch && typeMatch && searchMatch;
        });
    }, [properties, selectedBlock, selectedType, searchTerm]);

    return (
        <div>
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-4 md:p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Your Perfect Rental Property</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Search by title or area..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <select
                        value={selectedBlock}
                        onChange={(e) => setSelectedBlock(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="All">All Blocks</option>
                        {Object.keys(LOCATION_DATA).map(block => (
                            <option key={block} value={block}>{block}</option>
                        ))}
                    </select>
                     <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="All">All Property Types</option>
                        {Object.values(PropertyType).map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredProperties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h3 className="text-xl font-semibold text-gray-700">No Properties Found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                </div>
            )}
        </div>
    );
};

// --- BUNDLED FROM components/AddPropertyForm.tsx ---
const SparkleIcon = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.684-2.684L11.25 18l1.938-.648a3.375 3.375 0 002.684-2.684L16.25 13.5l.648 1.938a3.375 3.375 0 002.684 2.684L21.75 18l-1.938.648a3.375 3.375 0 00-2.684 2.684z" />
    </svg>
);

const AddPropertyForm: React.FC = () => {
    const { addProperty, user } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [type, setType] = useState<PropertyType>(PropertyType.Room);
    const [block, setBlock] = useState(Object.keys(LOCATION_DATA)[0]);
    const [area, setArea] = useState(LOCATION_DATA[Object.keys(LOCATION_DATA)[0]][0]);
    const [address, setAddress] = useState('');
    const [rent, setRent] = useState('');
    const [description, setDescription] = useState('');
    const [ownerName, setOwnerName] = useState(user?.name || '');
    const [ownerPhone, setOwnerPhone] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if(user && !ownerName) {
            setOwnerName(user.name);
        }
    }, [user, ownerName]);

    const handleGenerateDescription = async () => {
        if (!title || !rent || !area) {
            alert('Please fill in Title, Rent, and Area before generating a description.');
            return;
        }
        setIsGenerating(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Write a compelling and professional property rental description in about 40-50 words for a property in Sonipat, India. The property is a '${type}' titled '${title}' located in '${area}, ${block}'. The monthly rent is ₹${rent}. Highlight key features suitable for this type of property and use a friendly but professional tone. Do not use hashtags.`;
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });

            const text = response.text;
            setDescription(text.trim());
        } catch (error) {
            console.error("Error generating description:", error);
            alert("Sorry, we couldn't generate a description at this time. Please try again later.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert('You must be logged in to list a property.');
            return;
        }

        const newProperty: Property = {
            id: `prop_${Date.now()}`,
            title,
            type,
            location: { block, area },
            address,
            rent: parseInt(rent, 10),
            description,
            owner: { name: ownerName, phone: ownerPhone },
            isVerified: false, // New properties are unverified by default
            images: [
                `https://picsum.photos/seed/${Date.now()}/800/600`,
                `https://picsum.photos/seed/${Date.now()+1}/800/600`,
                `https://picsum.photos/seed/${Date.now()+2}/800/600`
            ]
        };
        addProperty(newProperty);
        // Reset form
        setTitle('');
        setRent('');
        setAddress('');
        setDescription('');
        setOwnerPhone('');
    };
    
    const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newBlock = e.target.value;
        setBlock(newBlock);
        setArea(LOCATION_DATA[newBlock][0]);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">List Your Property</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Property Type</label>
                         <select value={type} onChange={e => setType(e.target.value as PropertyType)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                             {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Monthly Rent (₹)</label>
                        <input type="number" value={rent} onChange={e => setRent(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Block</label>
                         <select value={block} onChange={handleBlockChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                             {Object.keys(LOCATION_DATA).map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Area / Colony</label>
                         <select value={area} onChange={e => setArea(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                             {LOCATION_DATA[block].map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Address</label>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>

                <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <button
                            type="button"
                            onClick={handleGenerateDescription}
                            disabled={isGenerating}
                            className="flex items-center px-2 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-lg hover:bg-indigo-200 disabled:bg-gray-200 disabled:text-gray-500 transition-all duration-200"
                        >
                            <SparkleIcon className="w-4 h-4 mr-1.5" />
                            {isGenerating ? 'Generating...' : 'Write with AI'}
                        </button>
                    </div>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Name</label>
                        <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Your Phone</label>
                        <input type="tel" value={ownerPhone} onChange={e => setOwnerPhone(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                </div>

                <p className="text-xs text-gray-500">Note: For this demo, only 3 placeholder images will be added automatically upon submission.</p>

                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">List My Property</button>
            </form>
        </div>
    );
};

// --- BUNDLED FROM components/AdminPanel.tsx ---
const AdminPanel: React.FC = () => {
    const { properties, deleteProperty, togglePropertyVerification } = useContext(AppContext);

    return (
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Admin Panel - Manage Properties</h2>
            <div className="space-y-4">
                {properties.map(property => (
                    <div key={property.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center mb-3 sm:mb-0">
                            <img src={property.images[0]} alt={property.title} className="w-16 h-16 rounded-md object-cover mr-4" />
                            <div>
                                <h3 className="font-semibold text-gray-800">{property.title}</h3>
                                <p className="text-sm text-gray-500">{property.location.area}, {property.location.block}</p>
                                <p className="text-sm text-gray-700">Owner: {property.owner.name} ({property.owner.phone})</p>
                                <p className={`text-sm font-bold ${property.isVerified ? 'text-green-600' : 'text-orange-500'}`}>
                                    Status: {property.isVerified ? 'Verified' : 'Pending Verification'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 self-end sm:self-center">
                            <button
                                onClick={() => togglePropertyVerification(property.id)}
                                className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                                    property.isVerified
                                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                        : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                            >
                                {property.isVerified ? 'Unverify' : 'Verify'}
                            </button>
                            <button 
                                onClick={() => {
                                    if (window.confirm(`Are you sure you want to delete "${property.title}"?`)) {
                                        deleteProperty(property.id);
                                    }
                                }}
                                className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {properties.length === 0 && <p className="text-center text-gray-500 py-8">No properties to display.</p>}
        </div>
    );
};

// --- BUNDLED FROM components/BookingModal.tsx ---
const BookingModal: React.FC = () => {
    const { isBookingModalOpen, closeBookingModal, bookingProperty, submitBooking } = useContext(AppContext);
    const [customerName, setCustomerName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [pincode, setPincode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failed'>('idle');
    const [transactionId, setTransactionId] = useState<string | null>(null);

    useEffect(() => {
        if (!isBookingModalOpen) {
            // Reset form when modal closes
            setCustomerName('');
            setMobileNumber('');
            setEmail('');
            setFullAddress('');
            setLandmark('');
            setPincode('');
            setIsLoading(false);
            setPaymentStatus('idle');
            setTransactionId(null);
        }
    }, [isBookingModalOpen]);
    
    useEffect(() => {
        if (paymentStatus === 'success') {
            const timer = setTimeout(() => {
                closeBookingModal();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [paymentStatus, closeBookingModal]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        const result = await submitBooking({ customerName, mobileNumber, email, fullAddress, landmark, pincode });

        if (result.success) {
            setTransactionId(result.transactionId || null);
            setPaymentStatus('success');
        } else {
            setPaymentStatus('failed');
        }
        setIsLoading(false);
    };

    if (!isBookingModalOpen || !bookingProperty) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-full overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold text-gray-800">Book Property</h2>
                        <button onClick={closeBookingModal} className="text-gray-400 hover:text-gray-600">&times;</button>
                    </div>
                    <p className="text-gray-600 mt-1">{bookingProperty.title}</p>
                    <div className="text-xl font-bold text-blue-600 mt-2">Rent: ₹{bookingProperty.rent.toLocaleString()}/month</div>
                    
                    {paymentStatus === 'success' ? (
                        <div className="text-center py-10">
                            <h3 className="text-2xl font-bold text-green-600">Booking Confirmed!</h3>
                            <p className="mt-2 text-gray-700">Your transaction has been completed successfully.</p>
                            {transactionId && <p className="mt-4 text-lg font-mono bg-gray-100 p-2 rounded">Transaction ID: {transactionId}</p>}
                            <p className="text-sm text-gray-500 mt-4">This window will close automatically in 5 seconds.</p>
                        </div>
                    ) : (
                         <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                            <input type="text" placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            <input type="tel" placeholder="Mobile Number (10 digits)" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} required pattern="\d{10}" className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            <input type="email" placeholder="Email ID" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            <input type="text" placeholder="Full Address" value={fullAddress} onChange={e => setFullAddress(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            <input type="text" placeholder="Landmark" value={landmark} onChange={e => setLandmark(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            <input type="text" placeholder="Pincode (6 digits)" value={pincode} onChange={e => setPincode(e.target.value)} required pattern="\d{6}" className="w-full px-3 py-2 border border-gray-300 rounded-md"/>

                            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                                {isLoading ? 'Processing...' : `Pay ₹${bookingProperty.rent} with Razorpay`}
                            </button>
                            {paymentStatus === 'failed' && <p className="text-red-500 text-sm text-center">Payment failed. Please try again.</p>}
                             <p className="text-xs text-center text-gray-500 mt-2">This is a simulated payment. No real transaction will occur.</p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- BUNDLED FROM App.tsx ---
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


// --- ORIGINAL index.tsx ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);