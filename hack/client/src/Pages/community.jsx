import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';

// Mock data for demonstration
const INITIAL_FORUMS = [
  {
    id: 1,
    title: "Business Funding",
    description: "Discuss various funding options and strategies for your business ventures",
    members: 2456,
    posts: 1289,
    category: "Finance"
  },
  {
    id: 2,
    title: "Budgeting for Families",
    description: "Share tips and advice on managing family finances effectively",
    members: 3892,
    posts: 2341,
    category: "Finance"
  },
  {
    id: 3,
    title: "Microloans for Women",
    description: "Connect with other women entrepreneurs and discuss microloan opportunities",
    members: 1845,
    posts: 956,
    category: "Entrepreneurship"
  },
  {
    id: 4,
    title: "Poultry Group",
    description: "Exchange knowledge about poultry farming and management",
    members: 1234,
    posts: 678,
    category: "Agriculture"
  },
  {
    id: 5,
    title: "Dairy Group",
    description: "Discuss dairy farming techniques and market opportunities",
    members: 2123,
    posts: 1432,
    category: "Agriculture"
  },
  {
    id: 6,
    title: "Investment Strategies",
    description: "Share and discuss different investment approaches and market insights",
    members: 3567,
    posts: 2145,
    category: "Finance"
  },
  {
    id: 7,
    title: "Retirement Planning",
    description: "Plan for a secure financial future through effective retirement strategies",
    members: 1876,
    posts: 943,
    category: "Finance"
  }
];

const INITIAL_QUESTIONS = [
  {
    id: 1,
    question: "What are the best low-risk investment options for beginners?",
    askedBy: "financial_newbie",
    date: "2025-03-25",
    answers: 12,
    views: 189,
    status: "answered"
  },
  {
    id: 2,
    question: "How do I calculate the ROI for my dairy farm?",
    askedBy: "dairy_farmer",
    date: "2025-03-27",
    answers: 5,
    views: 87,
    status: "answered"
  },
  {
    id: 3,
    question: "What's the difference between mutual funds and ETFs?",
    askedBy: "investment_curious",
    date: "2025-03-28",
    answers: 8,
    views: 122,
    status: "open"
  },
  {
    id: 4,
    question: "Best practices for small business cash flow management?",
    askedBy: "small_biz_owner",
    date: "2025-03-26",
    answers: 15,
    views: 213,
    status: "trending"
  }
];

const INITIAL_RESOURCES = [
  {
    id: 1,
    title: "Understanding Market Volatility",
    type: "Article",
    author: "financial_expert",
    date: "2025-03-20",
    likes: 154,
    views: 892
  },
  {
    id: 2,
    title: "Beginner's Guide to Budgeting",
    type: "Video",
    author: "money_mentor",
    date: "2025-03-22",
    likes: 287,
    views: 1432
  },
  {
    id: 3,
    title: "Tax Saving Strategies for 2025",
    type: "PDF",
    author: "tax_professional",
    date: "2025-03-15",
    likes: 421,
    views: 2356
  },
  {
    id: 4,
    title: "Introduction to Sustainable Farming",
    type: "Webinar Recording",
    author: "eco_farmer",
    date: "2025-03-18",
    likes: 198,
    views: 947
  }
];

const INITIAL_WEBINARS = [
  {
    id: 1,
    title: "Investing During Economic Uncertainty",
    host: "Janet Miller, Financial Advisor",
    date: "2025-04-05",
    time: "10:00 AM",
    participants: 412,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Small Business Loan Application Workshop",
    host: "Robert Garcia, Business Consultant",
    date: "2025-04-10",
    time: "2:00 PM",
    participants: 256,
    status: "upcoming"
  },
  {
    id: 3,
    title: "Agricultural Innovation and Technology",
    host: "Dr. Sarah Thompson, AgTech Specialist",
    date: "2025-04-15",
    time: "11:00 AM",
    participants: 189,
    status: "upcoming"
  },
  {
    id: 4,
    title: "Personal Finance Masterclass",
    host: "Michael Chen, CFP",
    date: "2025-03-25",
    time: "1:00 PM",
    participants: 523,
    status: "completed",
    recording: true
  }
];

// Badges for gamification
const BADGES = [
  {
    id: 1,
    name: "Conversation Starter",
    icon: "💬",
    description: "Started 5 discussions"
  },
  {
    id: 2,
    name: "Helpful Expert",
    icon: "🧠",
    description: "Answered 20 questions"
  },
  {
    id: 3,
    name: "Resource Contributor",
    icon: "📚",
    description: "Shared 10 resources"
  },
  {
    id: 4,
    name: "Community Champion",
    icon: "🏆",
    description: "Member for 1 year"
  }
];

const CommunityHub = () => {
  const [joinedForums, setJoinedForums] = useState(new Set());
  const [notifications, setNotifications] = useState(3);
  const [userPoints, setUserPoints] = useState(145);
  const [userLevel, setUserLevel] = useState(2);
  const [messages, setMessages] = useState(2);
  const [forumFilter, setForumFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [forums, setForums] = useState(INITIAL_FORUMS);
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [webinars, setWebinars] = useState(INITIAL_WEBINARS);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Filtering forums based on search and category
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
        setUserPoints(prevPoints => prevPoints + 10);
      }
      return newSet;
    });
  };

  const registerForWebinar = (webinarId) => {
    setWebinars(prev => 
      prev.map(webinar => 
        webinar.id === webinarId 
          ? {...webinar, participants: webinar.participants + 1, registered: true} 
          : webinar
      )
    );
    setUserPoints(prevPoints => prevPoints + 15);
  };

  const likeResource = (resourceId) => {
    setResources(prev => 
      prev.map(resource => 
        resource.id === resourceId 
          ? {...resource, likes: resource.likes + 1, liked: true} 
          : resource
      )
    );
    setUserPoints(prevPoints => prevPoints + 5);
  };

  // Tab labels with icons
  const tabLabels = [
    { name: "Forums", icon: "👥" },
    { name: "Q&A", icon: "❓" },
    { name: "Resources", icon: "📚" },
    { name: "Webinars", icon: "🎥" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-700">Community Hub</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-green-100 transition-colors focus:outline-none">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Messages */}
              <div className="relative">
                <button 
                  onClick={() => setShowNewMessageModal(true)}
                  className="p-2 rounded-full hover:bg-green-100 transition-colors focus:outline-none"
                >
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                  {messages > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {messages}
                    </span>
                  )}
                </button>
              </div>
              
              {/* User Profile */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-green-100 transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
                    JS
                  </div>
                  <span className="hidden md:block text-gray-700 font-medium">John Smith</span>
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Lvl {userLevel} • {userPoints} pts
                    </span>
                  </div>
                </button>
                
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-green-50">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-green-50">Your Badges</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-green-50">Settings</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-green-50">Sign out</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tab.Group onChange={setSelectedTab} defaultIndex={0}>
          <Tab.List className="flex p-1 space-x-2 bg-white rounded-xl shadow-md mb-8">
            {tabLabels.map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `w-full rounded-lg py-3 text-sm font-medium leading-5 transition-all duration-300
                  ${selected 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                  }`
                }
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.name}</span>
                </div>
              </Tab>
            ))}
          </Tab.List>
          
          <Tab.Panels className="mt-2">
            {/* Forums Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
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
                      <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
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
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {forums.map(forum => (
                    <div key={forum.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-green-800">{forum.title}</h3>
                          <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {forum.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 h-12 overflow-hidden">{forum.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {forum.members.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            {forum.posts.toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={() => handleJoinForum(forum.id)}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                            joinedForums.has(forum.id)
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                          }`}
                        >
                          {joinedForums.has(forum.id) ? 'Leave Forum' : 'Join Forum'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* User's Joined Forums */}
              {joinedForums.size > 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-green-800 mb-6">Your Forums</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {forums.filter(forum => joinedForums.has(forum.id)).map(forum => (
                      <div key={forum.id} className="bg-green-50 rounded-xl border border-green-200 overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-green-800 mb-2">{forum.title}</h3>
                          <p className="text-gray-600 mb-4">Recent activity: 5 new posts today</p>
                          <button className="w-full py-2 px-4 bg-white text-green-700 rounded-lg font-medium border border-green-300 hover:bg-green-700 hover:text-white transition-colors">
                            View Forum
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Tab.Panel>
            
            {/* Q&A Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                  <h2 className="text-2xl font-bold text-green-800">Questions & Answers</h2>
                  <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Ask a Question
                  </button>
                </div>
                
                <div className="space-y-4">
                  {questions.map(question => (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900 hover:text-green-700 transition-colors cursor-pointer">
                          {question.question}
                        </h3>
                        {question.status === "trending" && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                            Trending
                          </span>
                        )}
                        {question.status === "answered" && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            Answered
                          </span>
                        )}
                        {question.status === "open" && (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                            Open
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                        <span>Asked by: {question.askedBy}</span>
                        <span>Date: {question.date}</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                          </svg>
                          {question.answers} answers
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          {question.views} views
                        </span>
                      </div>
                      
                      <div className="mt-4 flex justify-end space-x-2">
                        <button className="text-sm font-medium text-green-600 hover:text-green-800 transition-colors">
                          View Answers
                        </button>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                          Answer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Load More Questions
                  </button>
                </div>
              </div>
            </Tab.Panel>
            
            {/* Resources Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                  <h2 className="text-2xl font-bold text-green-800">Knowledge Resources</h2>
                  <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Share Resource
                  </button>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {resources.map(resource => (
                    <div key={resource.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            resource.type === "Article" ? "bg-blue-100 text-blue-800" :
                            resource.type === "Video" ? "bg-red-100 text-red-800" :
                            resource.type === "PDF" ? "bg-orange-100 text-orange-800" :
                            "bg-purple-100 text-purple-800"
                          }`}>
                            {resource.type}
                          </span>
                        </div>
                        
                        <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                          <span>By: {resource.author}</span>
                          <span>Date: {resource.date}</span>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                              </svg>
                              {resource.likes} likes
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                              </svg>
                              {resource.views} views
                            </span>
                          </div>
                          
                          <button 
                            onClick={() => likeResource(resource.id)}
                            className={`inline-flex items-center rounded-full p-1 transition-colors ${
                              resource.liked 
                                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                            }`}
                          >
                            <svg className="w-5 h-5" fill={resource.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                          </button>
                        </div>
                        
                        <div className="mt-4">
                          <button className="w-full py-2 px-4 bg-green-50 text-green-700 rounded-lg font-medium border border-green-200 hover:bg-green-700 hover:text-white transition-colors">
                            View Resource
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Panel>
            
            {/* Webinars Panel */}
            <Tab.Panel>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                  <h2 className="text-2xl font-bold text-green-800">Live Webinars & Workshops</h2>
                  <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    View Calendar
                  </button>
                </div>
                
                <div className="space-y-6">
                  {webinars.map(webinar => (
                    <div key={webinar.id} className={`border rounded-lg p-6 ${
                      webinar.status === "upcoming" 
                        ? "border-green-200 bg-green-50" 
                        : "border-gray-200 bg-gray-50"
                    }`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 mr-2">{webinar.title}</h3>
                            {webinar.status === "upcoming" && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                Upcoming
                              </span>
                            )}
                            {webinar.status === "completed" && webinar.recording && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                Recording Available
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 mb-2">Hosted by: {webinar.host}</p>
                          <div className="flex items-center text-sm text-gray-500 mb-4">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span>{webinar.date}</span>
                            <span className="mx-2">•</span>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>{webinar.time}</span>
                            <span className="mx-2">•</span>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span>{webinar.participants} participants</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0">
                          {webinar.status === "upcoming" && !webinar.registered && (
                            <button 
                              onClick={() => registerForWebinar(webinar.id)}
                              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            >
                              Register Now
                            </button>
                          )}
                          {webinar.status === "upcoming" && webinar.registered && (
                            <button className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium border border-green-200">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              Registered
                            </button>
                          )}
                          {webinar.status === "completed" && webinar.recording && (
                            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              Watch Recording
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      
      {/* Badges and Gamification Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Your Achievement Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {BADGES.map(badge => (
              <div key={badge.id} className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className="font-medium text-gray-900">{badge.name}</h3>
                <p className="text-sm text-gray-500">{badge.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-800 mb-2">Progress to Next Level</h3>
              <div className="relative pt-1">
                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-green-200">
                  <div style={{ width: "45%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600 transition-all duration-500"></div>
                </div>
                <div className="flex justify-between text-xs text-green-700">
                  <span>Level {userLevel}</span>
                  <span>{userPoints} / 300 points</span>
                  <span>Level {userLevel + 1}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Messages</h3>
              <button onClick={() => setShowNewMessageModal(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-4 max-h-60 overflow-y-auto space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">System</span>
                  <span className="text-sm text-gray-500">Today</span>
                </div>
                <p className="mt-1 text-gray-700">Welcome to the Community Hub! Check out the new resources in your areas of interest.</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">financial_expert</span>
                  <span className="text-sm text-gray-500">Yesterday</span>
                </div>
                <p className="mt-1 text-gray-700">Thanks for your question about investment options. I've shared a detailed response in the Q&A section.</p>
              </div>
            </div>
            
            <div className="mb-4">
              <textarea className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent" rows="3" placeholder="Write a message..."></textarea>
            </div>
            
            <div className="flex justify-between">
              <button onClick={() => setShowNewMessageModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHub;