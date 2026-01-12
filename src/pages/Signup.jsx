import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import API_BASE_URL from '../config/api';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        email: '',
        role: 'ROLE_STUDENT'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert("Registration Successful! Please Login.");
                navigate(formData.role === 'ROLE_TEACHER' ? '/teacher-login' : '/student-login');
            } else {
                const data = await res.json();
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex relative overflow-hidden">
            {/* Creative Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse"></div>
                <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 relative z-10 w-full lg:w-1/2 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-8">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <GraduationCap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">Zplus Uni</span>
                        </Link>
                        <h2 className="mt-6 text-3xl font-extrabold text-white">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">
                            Join our community of learners and educators.
                        </p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-300">Full Name</label>
                                <div className="mt-1">
                                    <input
                                        type="text" required
                                        className="appearance-none block w-full px-3 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                                        value={formData.fullName}
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300">Username</label>
                                <div className="mt-1">
                                    <input
                                        type="text" required
                                        className="appearance-none block w-full px-3 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                                        value={formData.username}
                                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300">Email Address (Optional)</label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        className="appearance-none block w-full px-3 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300">Password</label>
                                <div className="mt-1">
                                    <input
                                        type="password" required
                                        className="appearance-none block w-full px-3 py-3 border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white sm:text-sm"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300">I am a...</label>
                                <div className="mt-1 grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: 'ROLE_STUDENT' })}
                                        className={`flex justify-center items-center px-4 py-3 border rounded-lg shadow-sm text-sm font-medium transition-all ${formData.role === 'ROLE_STUDENT' ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-900/30 text-white' : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                    >
                                        <BookOpen className="mr-2 h-5 w-5" /> Student
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: 'ROLE_TEACHER' })}
                                        className={`flex justify-center items-center px-4 py-3 border rounded-lg shadow-sm text-sm font-medium transition-all ${formData.role === 'ROLE_TEACHER' ? 'border-purple-500 ring-2 ring-purple-500 bg-purple-900/30 text-white' : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                    >
                                        <GraduationCap className="mr-2 h-5 w-5" /> Teacher
                                    </button>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all ${loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
                                >
                                    {loading ? 'Creating Account...' : 'Sign Up'} <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Visual Side */}
            <div className="hidden lg:block relative w-0 flex-1">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1541339907198-e021fc9d13f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                    alt="University Background"
                />
                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center p-12">
                    <div className="max-w-lg text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">Start Your Journey</h2>
                        <p className="text-xl text-gray-200">
                            "Education is the most powerful weapon which you can use to change the world."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
