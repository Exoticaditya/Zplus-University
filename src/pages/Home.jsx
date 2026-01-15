import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Trophy, Building2, MapPin, Star, Quote } from 'lucide-react';
import BackToTop from '../components/BackToTop';

const Home = () => {
    const [counters, setCounters] = useState({ courses: 0, students: 0, years: 0 });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateValue('courses', 0, 50, 1500);
                    animateValue('students', 0, 12000, 2000);
                    animateValue('years', 0, 25, 1500);
                }
            },
            { threshold: 0.5 }
        );

        const statsElement = document.getElementById('stats-section');
        if (statsElement) {
            observer.observe(statsElement);
        }

        return () => {
            if (statsElement) {
                observer.unobserve(statsElement);
            }
        };
    }, [hasAnimated]);

    const animateValue = (key, start, end, duration) => {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, 16);
    };

    return (
        <div className="min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                        alt="University Campus"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in">
                        Empowering Minds, <br />
                        <span className="text-blue-400">Shaping Futures</span>
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 animate-fade-in delay-100">
                        Join Zplus University for a world-class education experience.
                        Where tradition meets innovation.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in delay-200">
                        <Link to="/admissions" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2">
                            Apply Now <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link to="/courses" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 rounded-full font-semibold text-lg transition-all text-white flex items-center justify-center gap-2">
                            Explore Courses <BookOpen className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats-section" className="py-12 bg-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="p-4">
                            <h3 className="text-4xl font-bold mb-2">{counters.courses}+</h3>
                            <p className="text-blue-200">Courses Offered</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl font-bold mb-2">{counters.students.toLocaleString()}+</h3>
                            <p className="text-blue-200">Students Enrolled</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl font-bold mb-2">100%</h3>
                            <p className="text-blue-200">Placement Support</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl font-bold mb-2">{counters.years}+</h3>
                            <p className="text-blue-200">Years of Excellence</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values/Features Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Zplus?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We provide more than just degrees. We provide a pathway to success.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                                <Users className="h-7 w-7 text-blue-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Expert Faculty</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Learn from industry veterans and academic scholars dedicated to your growth.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                                <Building2 className="h-7 w-7 text-purple-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">World-Class Campus</h3>
                            <p className="text-gray-600 leading-relaxed">
                                State-of-the-art labs, libraries, and sports facilities designed for holistic development.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                                <Trophy className="h-7 w-7 text-green-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Top Placements</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our dedicated placement cell ensures you land your dream job at top MNCs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Real experiences from students who transformed their careers with us.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-2xl relative hover:shadow-lg transition-shadow duration-300">
                            <Quote className="absolute top-6 right-6 h-8 w-8 text-blue-100" />
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "Zplus University gave me the perfect foundation for my career. The faculty is incredibly supportive and the placement cell helped me land my dream job."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                                    PS
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                                    <p className="text-sm text-gray-500">B.Tech CSE, 2023</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl relative hover:shadow-lg transition-shadow duration-300">
                            <Quote className="absolute top-6 right-6 h-8 w-8 text-blue-100" />
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "The hands-on practical approach and industry connections made all the difference. I'm now working at a top MNC, all thanks to Zplus!"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                                    RK
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Rahul Kumar</h4>
                                    <p className="text-sm text-gray-500">MBA, 2022</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl relative hover:shadow-lg transition-shadow duration-300">
                            <Quote className="absolute top-6 right-6 h-8 w-8 text-blue-100" />
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "Best decision of my life! The campus, faculty, and learning environment are world-class. Highly recommend to anyone looking for quality education."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold">
                                    AP
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Anjali Patel</h4>
                                    <p className="text-sm text-gray-500">BBA, 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BackToTop />

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h4 className="text-2xl font-bold mb-4">Zplus University</h4>
                            <p className="text-gray-400 max-w-sm">
                                Creating leaders for tomorrow through excellence in education and innovation.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                                <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
                                <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
                                <li><Link to="/admin-login" className="hover:text-red-400 transition-colors text-sm">Admin Access</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Muzaffarnagar, UP</li>
                                <li>info@zplus.edu</li>
                                <li>+91 98765 43210</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                        &copy; 2024 Zplus University. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
