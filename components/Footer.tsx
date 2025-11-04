
import React from 'react';
import { COMPANY_INFO, SOCIAL_LINKS, APP_INFO } from '../constants';

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

export default Footer;
