import React, { useState } from 'react';
import women1 from './women1.webp';
import women2 from './women2.jpg';
import man1 from './man1.jpg';
import man2 from './man2.jpg';

const SuccessStories = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const stories = [
    {
      id: 1,
      title: "Success sweet like Honey",
      author: "Avishkar Ghodke",
      region: "Gujarat",
      sector: "farming",
      challenge: "loan-application",
      thumbnail: man2,
      views: 1234,
      likes: 456,
      date: "March 15, 2025",
      summary: "How I transformed my 1-acre farm into a successful beekeeping business",
      keyLessons: [
        "Optimizing hive placement for higher yield",
    "Identifying and preventing common bee diseases",
    "Innovative techniques for honey extraction"
      ],
      hasVideo: true
    },
    {
      id: 2,
      title: "Building a Women's Dairy Cooperative",
      author: "Lakshmi Singh",
      region: "Punjab",
      sector: "dairy",
      challenge: "savings",
      thumbnail: women2,
      views: 2345,
      likes: 789,
      date: "March 10, 2025",
      summary: "Uniting 50 women to create a successful dairy business",
      keyLessons: [
        "Importance of community collaboration",
        "Financial planning for cooperatives",
        "Effective quality control systems"
      ],
      hasAudio: true
    },
    {
      id: 3,
      title: "Digital Transformation of Traditional Craft",
      author: "Rajesh Kumar",
      region: "Rajasthan",
      sector: "small-business",
      challenge: "digital-adoption",
      thumbnail: man1,
      views: 1567,
      likes: 234,
      date: "March 5, 2025",
      summary: "Taking our family's handicraft business online during the pandemic",
      keyLessons: [
        "Digital marketing fundamentals",
        "E-commerce platform selection",
        "International shipping logistics"
      ],
      hasVideo: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Success Stories & Case Studies</h1>
          <p className="text-lg text-green-600 mb-8">Real stories of financial empowerment and growth</p>
          
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300">
            Share Your Story
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search stories..."
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Sectors</option>
              <option value="farming">Farming</option>
              <option value="dairy">Dairy</option>
              <option value="small-business">Small Business</option>
            </select>

            <select
              className="px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Regions</option>
              <option value="gujarat">Gujarat</option>
              <option value="punjab">Punjab</option>
              <option value="rajasthan">Rajasthan</option>
            </select>
          </div>
        </div>

        {/* Featured Story */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={women1}
                alt="Featured success story" 
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  Featured Story
                </span>
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                From Small Farm to Thriving Business
              </h2>
              <p className="text-gray-600 mb-6">
                Maya Patel shares her inspiring journey of transforming a small farm into a successful organic produce business, overcoming financial and operational challenges along the way.
              </p>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300">
                Read Full Story
              </button>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map(story => (
            <div key={story.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={story.thumbnail}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
                {story.hasVideo && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-lg px-3 py-1 text-white text-sm">
                    Video
                  </div>
                )}
                {story.hasAudio && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-lg px-3 py-1 text-white text-sm">
                    Audio
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {story.sector}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {story.region}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-green-800 mb-2">{story.title}</h3>
                <p className="text-gray-600 mb-4">{story.summary}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">Key Lessons:</h4>
                  <ul className="space-y-1">
                    {story.keyLessons.map((lesson, index) => (
                      <li key={index} className="text-gray-600 text-sm flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {story.views}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {story.likes}
                    </span>
                  </div>
                  <span>{story.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;