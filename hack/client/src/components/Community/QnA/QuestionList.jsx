import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_QUESTIONS } from '../../../data/communityData';

const QuestionList = () => {
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-green-800">Questions & Answers</h2>
        <button 
          onClick={() => navigate('/community/qna/ask')}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
        >
          Ask a Question
        </button>
      </div>
      
      <div className="space-y-4">
        {questions.map(question => (
          <div 
            key={question.id} 
            className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors cursor-pointer"
            onClick={() => navigate(`/community/qna/${question.id}`)}
          >
            {/* Question preview */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;