import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, DollarSign, Briefcase, CheckCircle, ArrowLeft, Globe, Phone, Mail } from 'lucide-react';

const CollegeDetails = () => {
    const { id } = useParams();
    const [college, setCollege] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/api/public/colleges/${id}`)
            .then(res => res.json())
            .then(data => {
                setCollege(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching college details:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!college) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
                Error loading college details.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Banner */}
            <div className="relative h-[50vh]">
                <img
                    src={college.imageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"}
                    alt={college.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>

                <div className="absolute top-8 left-4 sm:left-8">
                    <Link to="/colleges" className="inline-flex items-center text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Explorer
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{college.name}</h1>
                    <div className="flex flex-wrap gap-6 text-lg text-gray-200">
                        <span className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-blue-400" /> {college.location}
                        </span>
                        <span className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-blue-400" /> www.zplus.edu (Official)
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">About the University</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {college.description}
                                <br /><br />
                                This institution is committed to academic excellence and holistic development. With state-of-the-art infrastructure and a curriculum designed by industry experts, we ensure our students are ready to lead the future.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Placement Statistics</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 dark:border-blue-50/50">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                            <Briefcase className="h-6 w-6" />
                                        </div>
                                        <span className="text-gray-600 font-medium">Highest Package</span>
                                    </div>
                                    <p className="text-4xl font-bold text-gray-900 mt-2">₹{college.highestPackage} LPA</p>
                                    <p className="text-sm text-green-600 font-medium mt-1">+12% from last year</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="p-3 bg-green-100 rounded-lg text-green-600">
                                            <DollarSign className="h-6 w-6" />
                                        </div>
                                        <span className="text-gray-600 font-medium">Average Package</span>
                                    </div>
                                    <p className="text-4xl font-bold text-gray-900 mt-2">₹{college.averagePackage} LPA</p>
                                    <p className="text-sm text-green-600 font-medium mt-1">Consistent Growth</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Facilities & Highlights</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['Modern Computer Labs', 'Digital Library', 'Sports Complex', 'Hostel Facilities', 'Wi-Fi Campus', 'Transportation'].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="font-medium text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Admissions & Fees</h3>

                            <div className="space-y-6">
                                <div>
                                    <span className="block text-sm text-gray-500 mb-1">Annual Fee Structure</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-gray-900">₹{college.admissionFee}</span>
                                        <span className="text-gray-500">/ year</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">* Additional charges may apply for hostel</p>
                                </div>

                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                                    Apply Now
                                </button>

                                <div className="pt-6 border-t border-gray-100">
                                    <h4 className="font-semibold text-gray-900 mb-4">Contact Admission Office</h4>
                                    <ul className="space-y-3 text-sm text-gray-600">
                                        <li className="flex items-center gap-3">
                                            <Phone className="h-4 w-4 text-blue-500" /> +91 98765 43210
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Mail className="h-4 w-4 text-blue-500" /> admissions@zplus.edu
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeDetails;
