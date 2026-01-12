import React, { useState, useEffect } from 'react';
import { BookOpen, Video, FileText, Filter, Search, Download } from 'lucide-react';
import API_BASE_URL from '../config/api';

const Courses = () => {
    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [selectedBranch, setSelectedBranch] = useState('ALL');
    const [selectedSemester, setSelectedSemester] = useState('ALL');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/public/resources`)
            .then(res => res.json())
            .then(data => {
                setResources(data);
                setFilteredResources(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching resources:", err);
                setLoading(false);
            });
    }, []);

    // Apply Filters
    useEffect(() => {
        let result = resources;
        if (selectedBranch !== 'ALL') result = result.filter(r => r.branch === selectedBranch);
        if (selectedSemester !== 'ALL') result = result.filter(r => String(r.semester) === selectedSemester);
        if (selectedCategory !== 'ALL') result = result.filter(r => r.resourceCategory === selectedCategory);

        if (searchQuery) {
            result = result.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.subject.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setFilteredResources(result);
    }, [selectedBranch, selectedSemester, selectedCategory, searchQuery, resources]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

            {/* Sidebar Filters */}
            <aside className="w-full md:w-72 bg-white border-r border-gray-200 z-30 flex-shrink-0">
                <div className="p-6 sticky top-20">
                    <div className="flex items-center gap-2 mb-8 text-gray-900">
                        <Filter className="h-5 w-5 text-blue-600" />
                        <h2 className="text-xl font-bold font-heading">Filters</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search topics..."
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                        </div>

                        {/* Branch Filter */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Branch</h3>
                            <div className="space-y-2">
                                {['ALL', 'MBA', 'BTech', 'BBA'].map(branch => (
                                    <label key={branch} className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg transition-colors ${selectedBranch === branch ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-600'}`}>
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedBranch === branch ? 'border-blue-600' : 'border-gray-300'}`}>
                                            {selectedBranch === branch && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="branch"
                                            checked={selectedBranch === branch}
                                            onChange={() => setSelectedBranch(branch)}
                                            className="hidden"
                                        />
                                        <span className="font-medium">{branch === 'ALL' ? 'All Branches' : branch}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Semester Filter */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Semester</h3>
                            <div className="grid grid-cols-4 gap-2">
                                <button
                                    onClick={() => setSelectedSemester('ALL')}
                                    className={`col-span-4 py-2 text-sm font-medium rounded-lg border ${selectedSemester === 'ALL' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
                                >
                                    All Semesters
                                </button>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSemester(String(s))}
                                        className={`py-2 text-sm font-medium rounded-lg border ${selectedSemester === String(s) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Resource Type</h3>
                            <div className="space-y-2">
                                {['ALL', 'Notes', 'Video Lectures', 'Assignments', 'PYQ', 'Syllabus'].map(cat => (
                                    <label key={cat} className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-600'}`}>
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedCategory === cat ? 'border-blue-600' : 'border-gray-300'}`}>
                                            {selectedCategory === cat && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={selectedCategory === cat}
                                            onChange={() => setSelectedCategory(cat)}
                                            className="hidden"
                                        />
                                        <span className="font-medium">{cat === 'ALL' ? 'All Types' : cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
                {/* Modern Banner */}
                <div className="bg-gray-900 border-b border-gray-800 py-12 px-8 shadow-sm">
                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold font-heading text-white mb-2">
                            Learning Hub
                        </h1>
                        <p className="text-gray-400">
                            Access curated notes, video lectures, and assignments.
                        </p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto p-8">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-500 font-medium">
                            Showing {filteredResources.length} resources
                        </p>
                    </div>

                    {/* Resource Grid */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading resources...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredResources.length === 0 ? (
                                <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900">No resources found</h3>
                                    <p className="text-gray-500">Try adjusting your filters or search query.</p>
                                </div>
                            ) : (
                                filteredResources.map(resource => (
                                    <div key={resource.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group">
                                        <div className={`h-1.5 w-full ${resource.resourceCategory === 'PYQ' ? 'bg-amber-500' : 'bg-blue-500'}`} />

                                        <div className="p-6 flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex gap-2">
                                                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                                                        {resource.branch}
                                                    </span>
                                                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                                                        Sem {resource.semester}
                                                    </span>
                                                </div>
                                                {resource.type === 'CLASS' ? (
                                                    <Video className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                ) : (
                                                    <BookOpen className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                )}
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                                                {resource.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-2 font-medium">{resource.subject}</p>
                                            <span className={`inline-block text-xs font-bold px-2 py-1 rounded ${resource.resourceCategory === 'PYQ' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                                                }`}>
                                                {resource.resourceCategory}
                                            </span>
                                        </div>

                                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                            <a
                                                href={resource.contentUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold rounded-lg text-white bg-gray-900 hover:bg-blue-600 transition-colors"
                                            >
                                                {resource.type === 'CLASS' ? 'Watch Class' : 'View Document'}
                                                <Download className="h-4 w-4 ml-2" />
                                            </a>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Courses;
