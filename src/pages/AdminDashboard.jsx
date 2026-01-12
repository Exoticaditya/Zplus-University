import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, BookOpen, Building2 } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('colleges');
    const [colleges, setColleges] = useState([]);
    const [resources, setResources] = useState([]);
    const [pendingTeachers, setPendingTeachers] = useState([]);

    // Form States
    const [newCollege, setNewCollege] = useState({ name: '', location: '', description: '', imageUrl: '', admissionFee: '', averagePackage: '', highestPackage: '' });
    const [newResource, setNewResource] = useState({
        title: '', type: 'NOTE', subject: '', contentUrl: '',
        branch: 'MBA', semester: '1', resourceCategory: 'Notes', file: null
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchColleges();
        fetchColleges();
        fetchResources();
        fetchPendingTeachers();
    }, []);

    const fetchPendingTeachers = async () => {
        const authHeader = localStorage.getItem('authHeader');
        try {
            const res = await fetch('http://localhost:8080/api/admin/users/pending-teachers', {
                headers: { 'Authorization': authHeader || '' }
            });
            if (res.ok) setPendingTeachers(await res.json());
        } catch (error) { console.error("Failed to fetch teachers", error); }
    };

    const handleApproveTeacher = async (id) => {
        const authHeader = localStorage.getItem('authHeader');
        try {
            await fetch(`http://localhost:8080/api/admin/users/${id}/approve`, {
                method: 'PUT',
                headers: { 'Authorization': authHeader || '' }
            });
            fetchPendingTeachers();
            alert("Teacher Approved!");
        } catch (error) { alert("Failed to approve"); }
    };

    const fetchColleges = async () => {
        const authHeader = localStorage.getItem('authHeader');
        try {
            const res = await fetch('http://localhost:8080/api/admin/colleges', {
                headers: { 'Authorization': authHeader || '' }
            });
            if (res.status === 401 || res.status === 403) {
                navigate('/admin-login');
                return;
            }
            if (res.ok) {
                const data = await res.json();
                setColleges(data);
            }
        } catch (err) {
            console.error("Error fetching colleges:", err);
        }
    };

    const fetchResources = async () => {
        const authHeader = localStorage.getItem('authHeader');
        try {
            const res = await fetch('http://localhost:8080/api/admin/resources', {
                headers: { 'Authorization': authHeader || '' }
            });
            if (res.ok) setResources(await res.json());
        } catch (error) { console.error("Failed to fetch resources", error); }
    };

    const handleAddCollege = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const authHeader = localStorage.getItem('authHeader');

        try {
            const res = await fetch('http://localhost:8080/api/admin/colleges', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader || ''
                },
                body: JSON.stringify(newCollege)
            });

            if (res.status === 401 || res.status === 403) {
                navigate('/admin-login');
                return;
            }

            if (res.ok) {
                setNewCollege({ name: '', location: '', description: '', imageUrl: '' });
                fetchColleges();
            } else {
                alert('Failed to add college');
            }
        } catch (error) { alert('Error adding college'); }
        finally { setSubmitting(false); }
    };

    const handleAddResource = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const authHeader = localStorage.getItem('authHeader');
        try {
            const formData = new FormData();
            const resourceData = {
                title: newResource.title,
                type: newResource.type,
                subject: newResource.subject,
                contentUrl: newResource.contentUrl,
                branch: newResource.branch,
                semester: newResource.semester,
                resourceCategory: newResource.resourceCategory
            };

            formData.append('resource', new Blob([JSON.stringify(resourceData)], { type: 'application/json' }));
            if (newResource.file) {
                formData.append('file', newResource.file);
            }

            const res = await fetch('http://localhost:8080/api/admin/resources', {
                method: 'POST',
                headers: {
                    'Authorization': authHeader || ''
                    // Content-Type is auto-set for FormData
                },
                body: formData
            });

            if (res.status === 401 || res.status === 403) {
                navigate('/admin-login');
                return;
            }

            if (res.ok) {
                setNewResource({
                    title: '', type: 'NOTE', subject: '', contentUrl: '',
                    branch: 'MBA', semester: '1', resourceCategory: 'Notes', file: null
                });
                fetchResources();
            } else {
                alert('Failed to add resource');
            }
        } catch (error) {
            console.error(error);
            alert('Error adding resource');
        } finally { setSubmitting(false); }
    };

    const handleDeleteCollege = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        const authHeader = localStorage.getItem('authHeader');
        await fetch(`http://localhost:8080/api/admin/colleges/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': authHeader || '' }
        });
        fetchColleges();
    };

    const handleDeleteResource = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        const authHeader = localStorage.getItem('authHeader');
        await fetch(`http://localhost:8080/api/admin/resources/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': authHeader || '' }
        });
        fetchResources();
    };

    const renderContent = () => {
        if (activeTab === 'teachers') {
            return (
                <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-3">
                    <h2 className="text-xl font-semibold mb-6">Pending Teacher Approvals</h2>
                    <div className="space-y-4">
                        {pendingTeachers.length === 0 ? <p className="text-gray-500">No pending approvals.</p> :
                            pendingTeachers.map(teacher => (
                                <div key={teacher.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                                    <div>
                                        <h3 className="font-bold text-lg">{teacher.fullName}</h3>
                                        <p className="text-sm text-gray-600">@{teacher.username} • {teacher.email}</p>
                                    </div>
                                    <button
                                        onClick={() => handleApproveTeacher(teacher.id)}
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
                                    >
                                        Approve Access
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Plus className="h-5 w-5" /> Add New {activeTab === 'colleges' ? 'College' : 'Resource'}
                        </h2>

                        {activeTab === 'colleges' ? (
                            <form onSubmit={handleAddCollege} className="space-y-4">
                                <input
                                    type="text" placeholder="College Name" required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newCollege.name} onChange={e => setNewCollege({ ...newCollege, name: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="Location" required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newCollege.location} onChange={e => setNewCollege({ ...newCollege, location: e.target.value })}
                                />
                                <textarea
                                    placeholder="Description"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newCollege.description} onChange={e => setNewCollege({ ...newCollege, description: e.target.value })}
                                />
                                <div className="grid grid-cols-3 gap-2">
                                    <input
                                        type="number" placeholder="Fee (Yearly)"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newCollege.admissionFee} onChange={e => setNewCollege({ ...newCollege, admissionFee: e.target.value })}
                                    />
                                    <input
                                        type="number" placeholder="Avg Pkg (LPA)"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newCollege.averagePackage} onChange={e => setNewCollege({ ...newCollege, averagePackage: e.target.value })}
                                    />
                                    <input
                                        type="number" placeholder="High Pkg (LPA)"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newCollege.highestPackage} onChange={e => setNewCollege({ ...newCollege, highestPackage: e.target.value })}
                                    />
                                </div>
                                <input
                                    type="text" placeholder="Image URL"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newCollege.imageUrl} onChange={e => setNewCollege({ ...newCollege, imageUrl: e.target.value })}
                                />
                                <button type="submit" disabled={submitting} className={`w-full text-white py-2 rounded-lg transition-colors ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}>
                                    {submitting ? 'Adding College...' : 'Add College'}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleAddResource} className="space-y-4">
                                <input
                                    type="text" placeholder="Resource Title" required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newResource.title} onChange={e => setNewResource({ ...newResource, title: e.target.value })}
                                />

                                {/* New Fields */}
                                <div className="grid grid-cols-2 gap-2">
                                    <select
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newResource.branch} onChange={e => setNewResource({ ...newResource, branch: e.target.value })}
                                    >
                                        <option value="MBA">MBA</option>
                                        <option value="BTech">BTech</option>
                                        <option value="BBA">BBA</option>
                                    </select>
                                    <select
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newResource.semester} onChange={e => setNewResource({ ...newResource, semester: e.target.value })}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Sem {s}</option>)}
                                    </select>
                                </div>

                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newResource.resourceCategory} onChange={e => setNewResource({ ...newResource, resourceCategory: e.target.value })}
                                >
                                    <option value="Notes">Notes</option>
                                    <option value="PYQ">PYQ (Past Papers)</option>
                                    <option value="Syllabus">Syllabus</option>
                                    <option value="Lab Manual">Lab Manual</option>
                                </select>

                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newResource.type} onChange={e => setNewResource({ ...newResource, type: e.target.value })}
                                >
                                    <option value="NOTE">Document (PDF/Image)</option>
                                    <option value="CLASS">Video Class</option>
                                </select>

                                <input
                                    type="text" placeholder="Subject" required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newResource.subject} onChange={e => setNewResource({ ...newResource, subject: e.target.value })}
                                />

                                {/* File Input */}
                                <div className="border border-dashed border-gray-300 p-4 rounded-lg text-center">
                                    <p className="mb-2 text-sm text-gray-500">Upload File (PDF/Image)</p>
                                    <input
                                        type="file"
                                        onChange={e => setNewResource({ ...newResource, file: e.target.files[0] })}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    <p className="mt-2 text-xs text-gray-400">OR Provide External URL below</p>
                                </div>

                                <input
                                    type="text" placeholder="Content/Video URL (Optional if uploading file)"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newResource.contentUrl} onChange={e => setNewResource({ ...newResource, contentUrl: e.target.value })}
                                />
                                <button type="submit" disabled={submitting} className={`w-full text-white py-2 rounded-lg transition-colors ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}>
                                    {submitting ? 'Adding Resource...' : 'Add Resource'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-6">Existing {activeTab}</h2>
                        <div className="space-y-4">
                            {activeTab === 'colleges' ? (
                                colleges.length === 0 ? <p className="text-gray-500">No colleges found.</p> :
                                    colleges.map(college => (
                                        <div key={college.id} className="flex justify-between items-start p-4 border rounded-lg hover:bg-gray-50">
                                            <div>
                                                <h3 className="font-bold text-lg">{college.name}</h3>
                                                <p className="text-sm text-gray-600">{college.location}</p>
                                            </div>
                                            <button onClick={() => handleDeleteCollege(college.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))
                            ) : (
                                resources.length === 0 ? <p className="text-gray-500">No resources found.</p> :
                                    resources.map(resource => (
                                        <div key={resource.id} className="flex justify-between items-start p-4 border rounded-lg hover:bg-gray-50">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 text-xs rounded text-white ${resource.type === 'NOTE' ? 'bg-yellow-500' : 'bg-purple-500'}`}>
                                                        {resource.type}
                                                    </span>
                                                    <h3 className="font-bold text-lg">{resource.title}</h3>
                                                </div>
                                                <p className="text-sm text-gray-600">{resource.subject}</p>
                                            </div>
                                            <button onClick={() => handleDeleteResource(resource.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('colleges')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'colleges' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Building2 className="h-5 w-5" /> Manage Colleges
                    </button>
                    <button
                        onClick={() => setActiveTab('resources')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'resources' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <BookOpen className="h-5 w-5" /> Manage Resources
                    </button>
                    <button
                        onClick={() => setActiveTab('teachers')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'teachers' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Edit2 className="h-5 w-5" /> Approvals
                    </button>
                </div>

                {/* Content Area */}
                {renderContent()}

                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Plus className="h-5 w-5" /> Add New {activeTab === 'colleges' ? 'College' : 'Resource'}
                        </h2>

                        {activeTab === 'colleges' ? (
                            <form onSubmit={handleAddCollege} className="space-y-4">
                                <input
                                    type="text" placeholder="College Name" required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newCollege.name} onChange={e => setNewCollege({ ...newCollege, name: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="Location" required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newCollege.location} onChange={e => setNewCollege({ ...newCollege, location: e.target.value })}
                                />
                                <textarea
                                    placeholder="Description"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newCollege.description} onChange={e => setNewCollege({ ...newCollege, description: e.target.value })}
                                />
                                <div className="grid grid-cols-3 gap-2">
                                    <input
                                        type="number" placeholder="Fee (Yearly)"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newCollege.admissionFee} onChange={e => setNewCollege({ ...newCollege, admissionFee: e.target.value })}
                                    />
                                    <input
                                        type="number" placeholder="Avg Pkg (LPA)"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newCollege.averagePackage} onChange={e => setNewCollege({ ...newCollege, averagePackage: e.target.value })}
                                    />
                                    <input
                                        type="number" placeholder="High Pkg (LPA)"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newCollege.highestPackage} onChange={e => setNewCollege({ ...newCollege, highestPackage: e.target.value })}
                                    />
                                </div>
                                <input
                                    type="text" placeholder="Image URL"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newCollege.imageUrl} onChange={e => setNewCollege({ ...newCollege, imageUrl: e.target.value })}
                                />
                                <button type="submit" disabled={submitting} className={`w-full text-white py-2 rounded-lg transition-colors ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}>
                                    {submitting ? 'Adding College...' : 'Add College'}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleAddResource} className="space-y-4">
                                <input
                                    type="text" placeholder="Resource Title" required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newResource.title} onChange={e => setNewResource({ ...newResource, title: e.target.value })}
                                />

                                {/* New Fields */}
                                <div className="grid grid-cols-2 gap-2">
                                    <select
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newResource.branch} onChange={e => setNewResource({ ...newResource, branch: e.target.value })}
                                    >
                                        <option value="MBA">MBA</option>
                                        <option value="BTech">BTech</option>
                                        <option value="BBA">BBA</option>
                                    </select>
                                    <select
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={newResource.semester} onChange={e => setNewResource({ ...newResource, semester: e.target.value })}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Sem {s}</option>)}
                                    </select>
                                </div>

                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newResource.resourceCategory} onChange={e => setNewResource({ ...newResource, resourceCategory: e.target.value })}
                                >
                                    <option value="Notes">Notes</option>
                                    <option value="PYQ">PYQ (Past Papers)</option>
                                    <option value="Syllabus">Syllabus</option>
                                    <option value="Lab Manual">Lab Manual</option>
                                </select>

                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newResource.type} onChange={e => setNewResource({ ...newResource, type: e.target.value })}
                                >
                                    <option value="NOTE">Document (PDF/Image)</option>
                                    <option value="CLASS">Video Class</option>
                                </select>

                                <input
                                    type="text" placeholder="Subject" required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newResource.subject} onChange={e => setNewResource({ ...newResource, subject: e.target.value })}
                                />

                                {/* File Input */}
                                <div className="border border-dashed border-gray-300 p-4 rounded-lg text-center">
                                    <p className="mb-2 text-sm text-gray-500">Upload File (PDF/Image)</p>
                                    <input
                                        type="file"
                                        onChange={e => setNewResource({ ...newResource, file: e.target.files[0] })}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                    <p className="mt-2 text-xs text-gray-400">OR Provide External URL below</p>
                                </div>

                                <input
                                    type="text" placeholder="Content/Video URL (Optional if uploading file)"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newResource.contentUrl} onChange={e => setNewResource({ ...newResource, contentUrl: e.target.value })}
                                />
                                <button type="submit" disabled={submitting} className={`w-full text-white py-2 rounded-lg transition-colors ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}>
                                    {submitting ? 'Adding Resource...' : 'Add Resource'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-6">Existing {activeTab}</h2>
                        <div className="space-y-4">
                            {activeTab === 'colleges' ? (
                                colleges.length === 0 ? <p className="text-gray-500">No colleges found.</p> :
                                    colleges.map(college => (
                                        <div key={college.id} className="flex justify-between items-start p-4 border rounded-lg hover:bg-gray-50">
                                            <div>
                                                <h3 className="font-bold text-lg">{college.name}</h3>
                                                <p className="text-sm text-gray-600">{college.location}</p>
                                            </div>
                                            <button onClick={() => handleDeleteCollege(college.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))
                            ) : (
                                resources.length === 0 ? <p className="text-gray-500">No resources found.</p> :
                                    resources.map(resource => (
                                        <div key={resource.id} className="flex justify-between items-start p-4 border rounded-lg hover:bg-gray-50">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 text-xs rounded text-white ${resource.type === 'NOTE' ? 'bg-yellow-500' : 'bg-purple-500'}`}>
                                                        {resource.type}
                                                    </span>
                                                    <h3 className="font-bold text-lg">{resource.title}</h3>
                                                </div>
                                                <p className="text-sm text-gray-600">{resource.subject}</p>
                                            </div>
                                            <button onClick={() => handleDeleteResource(resource.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AdminDashboard;
