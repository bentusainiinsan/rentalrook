
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

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

export default AdminPanel;