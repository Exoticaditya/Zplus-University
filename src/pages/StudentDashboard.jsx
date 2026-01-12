import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Book, Clock, LogOut } from 'lucide-react';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole') || 'Student';
    const username = localStorage.getItem('username') || 'User';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/student-login');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-8 border-b pb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Student Portal</h1>
                        <p className="text-gray-500 mt-1">Welcome back, {username}!</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        <LogOut className="h-4 w-4 mr-2" /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="h-10 w-10 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{username}</h2>
                            <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                                {userRole}
                            </span>

                            <div className="mt-6 space-y-3 text-left">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Course</span>
                                    <span className="font-medium">B.Tech (CSE)</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Semester</span>
                                    <span className="font-medium">3rd Sem</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">CGPA</span>
                                    <span className="font-medium text-green-600">8.4</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <Book className="h-6 w-6 text-purple-600" />
                                    <h3 className="font-semibold text-purple-900">Enrolled Courses</h3>
                                </div>
                                <p className="text-3xl font-bold text-purple-700">6</p>
                            </div>
                            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <Clock className="h-6 w-6 text-orange-600" />
                                    <h3 className="font-semibold text-orange-900">Attendance</h3>
                                </div>
                                <p className="text-3xl font-bold text-orange-700">85%</p>
                            </div>
                        </div>

                        {/* Recent Activity / Enrolled Courses */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">My Schedule</h3>
                            <div className="space-y-4">
                                {[
                                    { time: '09:00 AM', subject: 'Data Structures', type: 'Lecture' },
                                    { time: '11:00 AM', subject: 'Digital Logic', type: 'Lab' },
                                    { time: '02:00 PM', subject: 'Mathematics III', type: 'Tutorial' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                                        <div className="w-20 text-sm font-semibold text-gray-500">{item.time}</div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{item.subject}</h4>
                                            <p className="text-xs text-blue-500">{item.type}</p>
                                        </div>
                                        <button className="text-xs bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-700">
                                            Join Class
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => navigate('/courses')}
                                className="w-full mt-6 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Browse Study Hub Resources
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
