
import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import PropertyCard from './PropertyCard';
import { LOCATION_DATA } from '../constants';
import { PropertyType } from '../types';

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

export default PropertyList;
