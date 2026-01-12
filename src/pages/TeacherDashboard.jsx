import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, BookOpen, LogOut } from 'lucide-react';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [newResource, setNewResource] = useState({
        title: '', type: 'NOTE', subject: '', contentUrl: '',
        branch: 'MBA', semester: '1', resourceCategory: 'Notes', file: null
    });

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        const authHeader = localStorage.getItem('authHeader');
        try {
            const res = await fetch('http://localhost:8080/api/admin/resources', { // Start with admin endpoint, verify permissions later
                headers: { 'Authorization': authHeader || '' }
            });
            if (res.status === 401 || res.status === 403) {
                // Try teacher specific if exists, or handle unauthorized
                navigate('/teacher-login');
                return;
            }
            if (res.ok) setResources(await res.json());
        } catch (error) { console.error("Failed to fetch resources", error); }
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

            const res = await fetch('http://localhost:8080/api/admin/resources', { // Reuse Admin endpoint if allowed, or create /api/teacher/resources
                method: 'POST',
                headers: {
                    'Authorization': authHeader || ''
                },
                body: formData
            });

            if (res.ok) {
                setNewResource({
                    title: '', type: 'NOTE', subject: '', contentUrl: '',
                    branch: 'MBA', semester: '1', resourceCategory: 'Notes', file: null
                });
                fetchResources();
                alert("Resource Added Successfully!");
            } else {
                alert('Failed to add resource. Ensure you have Teacher permissions.');
            }
        } catch (error) {
            alert('Error adding resource');
        } finally { setSubmitting(false); }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/teacher-login');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <BookOpen className="h-8 w-8 text-purple-600" />
                        Teacher Dashboard
                    </h1>
                    <button onClick={handleLogout} className="flex items-center text-red-600 hover:text-red-700 font-medium">
                        <LogOut className="h-5 w-5 mr-2" /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Resource Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload Study Material</h2>
                            <form onSubmit={handleAddResource} className="space-y-4">
                                <input
                                    type="text" placeholder="Title (e.g., Data Structures Unit 1)" required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={newResource.title} onChange={e => setNewResource({ ...newResource, title: e.target.value })}
                                />

                                <div className="grid grid-cols-2 gap-2">
                                    <select
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        value={newResource.branch} onChange={e => setNewResource({ ...newResource, branch: e.target.value })}
                                    >
                                        <option value="MBA">MBA</option>
                                        <option value="BTech">BTech</option>
                                        <option value="BBA">BBA</option>
                                    </select>
                                    <select
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        value={newResource.semester} onChange={e => setNewResource({ ...newResource, semester: e.target.value })}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Sem {s}</option>)}
                                    </select>
                                </div>

                                <select
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={newResource.resourceCategory} onChange={e => setNewResource({ ...newResource, resourceCategory: e.target.value })}
                                >
                                    <option value="Notes">Notes</option>
                                    <option value="PYQ">PYQ (Past Papers)</option>
                                    <option value="Syllabus">Syllabus</option>
                                    <option value="Lab Manual">Lab Manual</option>
                                </select>

                                <input
                                    type="text" placeholder="Subject" required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={newResource.subject} onChange={e => setNewResource({ ...newResource, subject: e.target.value })}
                                />

                                <div className="border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 text-center">
                                    <p className="mb-2 text-sm text-gray-500">Upload PDF/Image</p>
                                    <input
                                        type="file"
                                        onChange={e => setNewResource({ ...newResource, file: e.target.files[0] })}
                                        className="block w-full text-sm text-gray-500"
                                    />
                                </div>

                                <button type="submit" disabled={submitting} className={`w-full text-white py-2 rounded-lg transition-colors ${submitting ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}>
                                    {submitting ? 'Uploading...' : 'Publish Content'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Pending/Active Resources List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold mb-6 text-gray-700">My Uploads</h2>
                            <div className="space-y-4">
                                {resources.length === 0 ? <p className="text-gray-500 italic">You haven't uploaded any resources yet.</p> :
                                    resources.map(resource => (
                                        <div key={resource.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-purple-50 transition-colors">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2 py-0.5 text-xs rounded bg-purple-100 text-purple-700 font-medium">
                                                        {resource.branch} - Sem {resource.semester}
                                                    </span>
                                                    <h3 className="font-bold text-gray-800">{resource.title}</h3>
                                                </div>
                                                <p className="text-sm text-gray-500">{resource.subject} • {resource.resourceCategory}</p>
                                            </div>
                                            <button className="text-red-400 hover:text-red-600 p-2">
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
