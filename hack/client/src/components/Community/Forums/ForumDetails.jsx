import React from 'react';
import { useParams } from 'react-router-dom';
import { INITIAL_FORUMS } from '../../../data/communityData';

const ForumDetails = () => {
  const { id } = useParams();
  const forum = INITIAL_FORUMS.find(f => f.id === parseInt(id));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-4">{forum.title}</h1>
      <p className="text-gray-600 mb-6">{forum.description}</p>
      
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Forum Details</h2>
        <p>Members: {forum.members.toLocaleString()}</p>
        <p>Posts: {forum.posts.toLocaleString()}</p>
      </div>
      
      {/* Forum posts and discussion would go here */}
    </div>
  );
};

export default ForumDetails;