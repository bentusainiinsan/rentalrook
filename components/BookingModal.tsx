
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { COMPANY_INFO } from '../constants';

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

export default BookingModal;
