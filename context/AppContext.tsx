
import React, { createContext, useState, ReactNode } from 'react';
import { User, Property, BookingDetails } from '../types';
import { INITIAL_PROPERTIES } from '../constants';

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

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

            // In a real app, you would:
            // 1. Call your backend to create a Razorpay order.
            // 2. Open the Razorpay checkout with the order_id.
            // 3. On successful payment, the `handler` function would be called.
            // 4. Inside the handler, you'd verify the payment on your backend.
            // 5. After verification, you would save the booking to Google Sheets and send emails.

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