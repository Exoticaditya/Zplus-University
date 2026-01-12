import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Courses from './pages/Courses';
import Admissions from './pages/Admissions';
import AdminLogin from './pages/AdminLogin';
import TeacherLogin from './pages/TeacherLogin';
import StudentLogin from './pages/StudentLogin';
import Signup from './pages/Signup';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CollegeExplorer from './pages/CollegeExplorer';
import CollegeDetails from './pages/CollegeDetails';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/colleges" element={<CollegeExplorer />} />
                    <Route path="/colleges/:id" element={<CollegeDetails />} />
                    <Route path="/admissions" element={<Admissions />} />
                    <Route path="/student-login" element={<StudentLogin />} />
                    <Route path="/teacher-login" element={<TeacherLogin />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected Routes */}
                    <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                    <Route path="/student-dashboard" element={<StudentDashboard />} />

                    {/* Protected Route Logic */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    </Route>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
