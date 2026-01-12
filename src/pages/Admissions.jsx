import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Building2, Star } from 'lucide-react';

const Admissions = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('none'); // none, fee-asc, fee-desc, pkg-high

    // Sort Logic
    const sortedColleges = [...colleges].sort((a, b) => {
        if (sortBy === 'fee-asc') return (a.admissionFee || 0) - (b.admissionFee || 0);
        if (sortBy === 'fee-desc') return (b.admissionFee || 0) - (a.admissionFee || 0);
        if (sortBy === 'pkg-high') return (b.highestPackage || 0) - (a.highestPackage || 0);
        return 0;
    });

    useEffect(() => {
        fetch('http://localhost:8080/api/public/colleges')
            .then(res => res.json())
            .then(data => {
                setColleges(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching colleges:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Hero Section */}
            <div className="relative bg-blue-900 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1568792923760-d70635a89fdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" className="w-full h-full object-cover" alt="Background" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                        Admissions & Colleges
                    </h1>

                    {/* Filter Control */}
                    <div className="mt-8 flex justify-center">
                        <select
                            className="px-4 py-2 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-blue-400 bg-white/90 backdrop-blur"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="none">Sort By: Recommended</option>
                            <option value="fee-asc">Fees: Low to High</option>
                            <option value="fee-desc">Fees: High to Low</option>
                            <option value="pkg-high">Placement: Highest Package</option>
                        </select>
                    </div>

                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mt-4">
                        Discover prestigious institutions and take the first step towards your dream career.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading colleges...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {colleges.length === 0 ? (
                            <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-sm">
                                <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                                <h3 className="text-xl font-medium text-gray-900">No colleges listed yet</h3>
                                <p className="text-gray-500 mt-2">Check back soon for new admission updates.</p>
                            </div>
                        ) : (
                            sortedColleges.map(college => (
                                <div key={college.id} className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full">
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            src={college.imageUrl || "https://images.unsplash.com/photo-1541339907198-e021fc9d13f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"}
                                            alt={college.name}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <div className="flex items-center gap-1 text-sm font-medium bg-white/20 backdrop-blur-md px-2 py-1 rounded mb-2 w-fit">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> Top Rated
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {college.name}
                                        </h3>
                                        <div className="flex items-center text-gray-500 mb-4 text-sm">
                                            <MapPin className="h-4 w-4 mr-1 text-red-500" />
                                            {college.location}
                                        </div>

                                        {/* Stats Row */}
                                        <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-700 bg-gray-50 p-2 rounded-lg">
                                            <div>
                                                <span className="text-gray-400 text-xs block">Fee/Year</span>
                                                ₹{college.admissionFee ? college.admissionFee.toLocaleString() : 'N/A'}
                                            </div>
                                            <div className="text-right">
                                                <span className="text-gray-400 text-xs block">Highest Pkg</span>
                                                {college.highestPackage ? `₹${college.highestPackage} LPA` : 'N/A'}
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                                            {college.description}
                                        </p>

                                        <button className="w-full flex items-center justify-center px-6 py-3.5 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5">
                                            View Details & Apply <ArrowRight className="h-4 w-4 ml-2" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admissions;
