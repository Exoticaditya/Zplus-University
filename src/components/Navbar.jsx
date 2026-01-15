import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LogIn, Menu, X } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Helper to check active state
    const isActive = (path) => location.pathname === path;

    // Handle scroll to add shadow when scrolled
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const navLinks = [
        { to: '/courses', label: 'Study Hub' },
        { to: '/colleges', label: 'Colleges' },
        { to: '/admissions', label: 'Admissions' },
    ];

    return (
        <>
            <nav className={`glassmorphism sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
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
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`font-medium transition-colors relative ${isActive(link.to) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                >
                                    {link.label}
                                    {isActive(link.to) && (
                                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
                                    )}
                                </Link>
                            ))}

                            <div className="h-6 w-px bg-gray-200"></div>

                            <Link
                                to="/student-login"
                                className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                <LogIn className="h-4 w-4" />
                                <span className="text-sm font-semibold">Login</span>
                            </Link>

                            <Link
                                to="/signup"
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Sign Up
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6 text-gray-700" />
                            ) : (
                                <Menu className="h-6 w-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="mobile-menu-overlay md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Drawer */}
            <div className={`mobile-menu-drawer md:hidden ${mobileMenuOpen ? 'open' : 'closed'}`}>
                <div className="p-6">
                    {/* Close Button */}
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-xl font-bold text-gray-900">Menu</span>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="h-6 w-6 text-gray-700" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-2 mb-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`block px-4 py-3 rounded-xl font-medium transition-all ${isActive(link.to)
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="space-y-3">
                        <Link
                            to="/student-login"
                            className="flex items-center justify-center space-x-2 w-full px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-md"
                        >
                            <LogIn className="h-4 w-4" />
                            <span className="font-semibold">Login</span>
                        </Link>
                        <Link
                            to="/signup"
                            className="block w-full text-center px-5 py-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold transition-all"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <div className="space-y-2 text-sm">
                            <Link to="/teacher-login" className="block text-gray-600 hover:text-gray-900 transition-colors">
                                Teacher Login
                            </Link>
                            <Link to="/admin-login" className="block text-gray-600 hover:text-gray-900 transition-colors">
                                Admin Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
