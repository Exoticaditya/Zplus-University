import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const StudentLogin = () => {
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
            const response = await fetch('http://localhost:8080/api/auth/me', {
                method: 'GET',
                headers: { 'Authorization': authHeader }
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('authHeader', authHeader);
                localStorage.setItem('userRole', user.role);
                localStorage.setItem('username', user.username);
                navigate('/student-dashboard');
            } else {
                setError('Invalid username or password.');
            }
        } catch (err) {
            setError('Server error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="text-center mb-8">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Student Login</h2>
                    <p className="text-gray-500 text-sm">Access your classes and resources</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

                    <input
                        type="text" placeholder="Username" required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        value={credentials.username} onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                    />
                    <input
                        type="password" placeholder="Password" required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                    />

                    <button
                        type="submit" disabled={loading}
                        className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30'}`}
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
