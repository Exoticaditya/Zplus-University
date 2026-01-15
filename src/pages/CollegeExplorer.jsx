import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, Briefcase, ArrowRight, Heart, ArrowUpDown, X, Plus } from 'lucide-react';
import API_BASE_URL from '../config/api';
import BackToTop from '../components/BackToTop';

const CollegeExplorer = () => {
    const [colleges, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [compareList, setCompareList] = useState([]);
    const [showCompare, setShowCompare] = useState(false);

    // Filter States
    const [location, setLocation] = useState('');
    const [maxFee, setMaxFee] = useState('');
    const [minPackage, setMinPackage] = useState('');

    // Load favorites from localStorage on mount
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favoriteColleges') || '[]');
        setFavorites(savedFavorites);
    }, []);

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = () => {
        setLoading(true);
        let url = `${API_BASE_URL}/api/public/colleges`;

        // Use search endpoint if any filter is active
        if (location || maxFee || minPackage) {
            const params = new URLSearchParams();
            if (location) params.append('location', location);
            if (maxFee) params.append('maxFee', maxFee);
            if (minPackage) params.append('minPackage', minPackage);
            url = `${API_BASE_URL}/api/public/colleges/search?${params.toString()}`;
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

    // Sort colleges
    const sortedColleges = () => {
        let sorted = [...colleges];
        switch (sortBy) {
            case 'fee-low':
                return sorted.sort((a, b) => a.admissionFee - b.admissionFee);
            case 'fee-high':
                return sorted.sort((a, b) => b.admissionFee - a.admissionFee);
            case 'package-low':
                return sorted.sort((a, b) => a.averagePackage - b.averagePackage);
            case 'package-high':
                return sorted.sort((a, b) => b.averagePackage - a.averagePackage);
            default:
                return sorted;
        }
    };

    // Toggle favorite
    const toggleFavorite = (collegeId) => {
        const newFavorites = favorites.includes(collegeId)
            ? favorites.filter(id => id !== collegeId)
            : [...favorites, collegeId];
        setFavorites(newFavorites);
        localStorage.setItem('favoriteColleges', JSON.stringify(newFavorites));
    };

    // Toggle comparison list
    const toggleCompare = (college) => {
        if (compareList.find(c => c.id === college.id)) {
            setCompareList(compareList.filter(c => c.id !== college.id));
        } else if (compareList.length < 3) {
            setCompareList([...compareList, college]);
        }
    };

    const displayColleges = sortedColleges();

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream College</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore top-tier institutes, compare fees, and check placement records.
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-4">
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

                    {/* Sort */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-3">
                            <ArrowUpDown className="h-5 w-5 text-gray-500" />
                            <span className="text-sm font-semibold text-gray-600">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                            >
                                <option value="">Default</option>
                                <option value="fee-low">Fees: Low to High</option>
                                <option value="fee-high">Fees: High to Low</option>
                                <option value="package-low">Package: Low to High</option>
                                <option value="package-high">Package: High to Low</option>
                            </select>
                        </div>

                        {compareList.length > 0 && (
                            <button
                                onClick={() => setShowCompare(!showCompare)}
                                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-semibold text-sm"
                            >
                                Compare ({compareList.length})
                            </button>
                        )}
                    </div>
                </div>

                {/* Comparison View */}
                {showCompare && compareList.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">College Comparison</h3>
                            <button
                                onClick={() => setShowCompare(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto">
                            {compareList.map((college) => (
                                <div key={college.id} className="border border-gray-200 rounded-xl p-4">
                                    <h4 className="font-bold text-lg mb-4 text-gray-900">{college.name}</h4>
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <span className="text-gray-500">Location:</span>
                                            <p className="font-medium">{college.location}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Fees/Year:</span>
                                            <p className="font-medium">₹{college.admissionFee}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Avg. Package:</span>
                                            <p className="font-medium">₹{college.averagePackage} LPA</p>
                                        </div>
                                        <button
                                            onClick={() => toggleCompare(college)}
                                            className="text-red-600 hover:text-red-700 text-sm font-semibold"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Results Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading colleges...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayColleges.length === 0 ? (
                            <div className="col-span-full text-center py-20">
                                <h3 className="text-xl text-gray-600">No colleges found matching your criteria.</h3>
                            </div>
                        ) : (
                            displayColleges.map((college) => (
                                <div key={college.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full relative">
                                    {/* Favorite & Compare Buttons */}
                                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                                        <button
                                            onClick={() => toggleFavorite(college.id)}
                                            className={`p-2 rounded-full backdrop-blur-sm transition-all ${favorites.includes(college.id)
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-white/90 text-gray-600 hover:text-red-500'
                                                }`}
                                        >
                                            <Heart className={`h-5 w-5 ${favorites.includes(college.id) ? 'fill-current' : ''}`} />
                                        </button>
                                        <button
                                            onClick={() => toggleCompare(college)}
                                            disabled={compareList.length >= 3 && !compareList.find(c => c.id === college.id)}
                                            className={`p-2 rounded-full backdrop-blur-sm transition-all ${compareList.find(c => c.id === college.id)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-white/90 text-gray-600 hover:text-blue-500 disabled:opacity-50'
                                                }`}
                                        >
                                            <Plus className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <Link to={`/colleges/${college.id}`} className="flex flex-col h-full">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={college.imageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"}
                                                alt={college.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
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
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            <BackToTop />
        </div>
    );
};

export default CollegeExplorer;
