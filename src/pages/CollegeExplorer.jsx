import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, Briefcase, Filter, ArrowRight } from 'lucide-react';

const CollegeExplorer = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [location, setLocation] = useState('');
    const [maxFee, setMaxFee] = useState('');
    const [minPackage, setMinPackage] = useState('');

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = () => {
        setLoading(true);
        let url = 'http://localhost:8080/api/public/colleges';

        // Use search endpoint if any filter is active
        if (location || maxFee || minPackage) {
            const params = new URLSearchParams();
            if (location) params.append('location', location);
            if (maxFee) params.append('maxFee', maxFee);
            if (minPackage) params.append('minPackage', minPackage);
            url = `http://localhost:8080/api/public/colleges/search?${params.toString()}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setColleges(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching colleges:", err);
                setLoading(false);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchColleges();
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream College</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore to p-tier institutes, compare fees, and check placement records.
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-12 transform -translate-y-4">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> Location
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Delhi, Mumbai"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                <DollarSign className="h-4 w-4" /> Max Fee (₹)
                            </label>
                            <input
                                type="number"
                                placeholder="Max Budget"
                                value={maxFee}
                                onChange={(e) => setMaxFee(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                                <Briefcase className="h-4 w-4" /> Min Package (LPA)
                            </label>
                            <input
                                type="number"
                                placeholder="Min Expectation"
                                value={minPackage}
                                onChange={(e) => setMinPackage(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <Search className="h-5 w-5" /> Search
                        </button>
                    </form>
                </div>

                {/* Results Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading colleges...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {colleges.length === 0 ? (
                            <div className="col-span-full text-center py-20">
                                <h3 className="text-xl text-gray-600">No colleges found matching your criteria.</h3>
                            </div>
                        ) : (
                            colleges.map((college) => (
                                <Link to={`/colleges/${college.id}`} key={college.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={college.imageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"}
                                            alt={college.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                                            Recommended
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                                                    {college.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                    <MapPin className="h-3 w-3" /> {college.location}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                                            {college.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                            <div>
                                                <span className="block text-xs text-gray-500 uppercase tracking-wide font-semibold">Avg. Package</span>
                                                <span className="text-sm font-bold text-gray-900">₹{college.averagePackage} LPA</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-xs text-gray-500 uppercase tracking-wide font-semibold">Fees / Year</span>
                                                <span className="text-sm font-bold text-gray-900">₹{college.admissionFee}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-blue-600 font-semibold text-sm">
                                            <span>View Details</span>
                                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollegeExplorer;
