import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <GraduationCap className="h-8 w-8 text-blue-500" />
                            <span className="text-2xl font-bold">Zplus<span className="text-blue-500">Uni</span></span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Empowering the next generation of leaders through world-class education and innovation.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/courses" className="hover:text-blue-500 transition-colors">Study Hub</Link></li>
                            <li><Link to="/admissions" className="hover:text-blue-500 transition-colors">Admissions</Link></li>
                            <li><Link to="/signup" className="hover:text-blue-500 transition-colors">Apply Now</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>admissions@zplus.edu</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>Mumbai, India</span>
                            </li>
                        </ul>
                    </div>

                    {/* Admin Access & Legal */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal & access</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
                            <li><span className="hover:text-white cursor-pointer">Terms of Service</span></li>
                            {/* MOVED ADMIN LINK HERE */}
                            <li className="pt-4 border-t border-gray-800 mt-4">
                                <Link to="/admin-login" className="text-xs text-gray-600 hover:text-red-500 transition-colors flex items-center">
                                    Admin Panel Access
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Zplus University. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
