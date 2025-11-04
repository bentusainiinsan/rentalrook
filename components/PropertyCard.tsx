
import React, { useState, useContext } from 'react';
import { Property } from '../types';
import { AppContext } from '../context/AppContext';

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

export default PropertyCard;