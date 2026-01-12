import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LogIn } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    // Helper to check active state
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="glassmorphism sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold font-heading text-gray-900 tracking-tight">
                                Zplus<span className="text-blue-600">University</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/courses" className={`font-medium transition-colors ${isActive('/courses') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Study Hub</Link>
                        <Link to="/colleges" className={`font-medium transition-colors ${isActive('/colleges') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Colleges</Link>
                        <Link to="/admissions" className={`font-medium transition-colors ${isActive('/admissions') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Admissions</Link>

                        {/* Admin Link Removed - Moved to Footer */}

                        <div className="h-6 w-px bg-gray-200"></div>

                        <Link to="/student-login" className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            <LogIn className="h-4 w-4" />
                            <span className="text-sm font-semibold">Login</span>
                        </Link>

                        <Link to="/signup" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
