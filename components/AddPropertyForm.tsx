
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Property, PropertyType } from '../types';
import { LOCATION_DATA } from '../constants';

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
            // Using placeholder images
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
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
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

export default AddPropertyForm;