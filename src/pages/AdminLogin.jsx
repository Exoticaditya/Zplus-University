import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const authHeader = 'Basic ' + btoa(`${credentials.username}:${credentials.password}`);

        try {
            // Test credentials against a secured endpoint
            const response = await fetch('http://localhost:8080/api/admin/colleges', {
                method: 'GET',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Success: Store Credentials securely (Mocking secure storage with localStorage for MVP)
                localStorage.setItem('isAdmin', 'true');
                localStorage.setItem('authHeader', authHeader);
                navigate('/admin-dashboard');
            } else {
                setError('Invalid credentials or access denied.');
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError('Server unavailable. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-2xl shadow-2xl border border-gray-700">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-white">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Protected by Spring Security
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded text-sm text-center">
                            {error}
                        </div>
                    )}
                    <div className="rounded-md shadow-sm space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-colors"
                                placeholder="Admin Username"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-colors"
                                placeholder="Master Password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all`}
                        >
                            {loading ? 'Authenticating...' : 'Secure Login'}
                            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
