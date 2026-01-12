import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../config/api';

const TeacherLogin = () => {
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
            // Verify by fetching User Details
            const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
                method: 'GET',
                headers: { 'Authorization': authHeader }
            });

            if (response.ok) {
                const user = await response.json();
                if (user.role === 'ROLE_TEACHER' || user.role === 'ROLE_ADMIN') {
                    if (user.role === 'ROLE_TEACHER' && !user.approved) {
                        setError('Account Pending Approval by Admin.');
                        return;
                    }
                    localStorage.setItem('authHeader', authHeader);
                    localStorage.setItem('userRole', user.role);
                    localStorage.setItem('username', user.username);
                    navigate('/teacher-dashboard');
                } else {
                    setError('Access Restricted: Teachers Only.');
                }
            } else {
                setError('Invalid credentials.');
            }
        } catch (err) {
            setError('Server error.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-purple-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <div className="w-full p-8 md:p-10">
                    <div className="text-center mb-8">
                        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <GraduationCap className="h-8 w-8 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Faculty Portal</h2>
                        <p className="text-gray-500 text-sm">Sign in to manage course content</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

                        <input
                            type="text" placeholder="Username" required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                            value={credentials.username} onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                        />
                        <input
                            type="password" placeholder="Password" required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                            value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                        />

                        <button
                            type="submit" disabled={loading}
                            className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${loading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30'}`}
                        >
                            {loading ? 'Verifying...' : 'Access Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TeacherLogin;
