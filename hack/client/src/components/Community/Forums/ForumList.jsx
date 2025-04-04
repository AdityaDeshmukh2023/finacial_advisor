import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_FORUMS } from '../../../data/communityData';

const ForumList = () => {
  const [joinedForums, setJoinedForums] = useState(new Set());
  const [forumFilter, setForumFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [forums, setForums] = useState(INITIAL_FORUMS);
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = INITIAL_FORUMS;
    
    if (searchQuery) {
      filtered = filtered.filter(forum => 
        forum.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        forum.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (forumFilter !== "All") {
      filtered = filtered.filter(forum => forum.category === forumFilter);
    }
    
    setForums(filtered);
  }, [searchQuery, forumFilter]);

  const handleJoinForum = (forumId) => {
    setJoinedForums(prev => {
      const newSet = new Set(prev);
      if (newSet.has(forumId)) {
        newSet.delete(forumId);
      } else {
        newSet.add(forumId);
        navigate(`/community/forums/${forumId}`);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      {/* Search and filter UI */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-green-800">Discussion Forums</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search forums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {/* Search icon */}
          </div>
          <select
            value={forumFilter}
            onChange={(e) => setForumFilter(e.target.value)}
            className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="All">All Categories</option>
            <option value="Finance">Finance</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Entrepreneurship">Entrepreneurship</option>
          </select>
        </div>
      </div>
      
      {/* Forum list */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {forums.map(forum => (
          <div key={forum.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
            {/* Forum card content */}
            <button
              onClick={() => handleJoinForum(forum.id)}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                joinedForums.has(forum.id)
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
              }`}
            >
              {joinedForums.has(forum.id) ? 'View Forum' : 'Join Forum'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumList;