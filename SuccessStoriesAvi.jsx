import React, { useState, useMemo } from "react";
import women2 from "./women2.jpg";
import man1 from "./man1.jpg";
import man2 from "./man2.jpg";

const SuccessStoriesAvi = () => {
  const [likedStories, setLikedStories] = useState({});
  const [showFullStory, setShowFullStory] = useState({});
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedValue, setSelectedValue] = useState("All");

  const stories = [
    // ...existing stories array...
  ];

  // Extract unique values for filtering using useMemo
  const filterOptions = useMemo(() => ({
    All: [],
    Region: [...new Set(stories.map((s) => s.region))],
    Sector: [...new Set(stories.map((s) => s.sector))],
    Challenge: [...new Set(stories.map((s) => s.challenge))],
  }), [stories]);

  // Filter stories based on selection using useMemo
  const filteredStories = useMemo(() => {
    if (selectedFilter === "All" || selectedValue === "All") return stories;
    return stories.filter((story) => story[selectedFilter.toLowerCase()] === selectedValue);
  }, [selectedFilter, selectedValue, stories]);

  const toggleLike = (id) => {
    setLikedStories((prev) => ({
      ...prev,
      [id]: prev[id] ? undefined : (stories.find((s) => s.id === id).likes + 1),
    }));
  };

  const toggleFullStory = (id) => {
    setShowFullStory((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
          Success Stories & Case Studies
        </h1>

        {/* Filter Dropdowns */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <select
            className="p-3 border rounded-md shadow-md"
            value={selectedFilter}
            onChange={(e) => {
              setSelectedFilter(e.target.value);
              setSelectedValue("All"); // Reset value when category changes
            }}
          >
            <option value="All">All</option>
            <option value="Region">Region</option>
            <option value="Sector">Sector</option>
            <option value="Challenge">Challenge</option>
          </select>

          {selectedFilter !== "All" && (
            <select
              className="p-3 border rounded-md shadow-md"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="All">All</option>
              {filterOptions[selectedFilter].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Stories Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredStories.length > 0 ? (
            filteredStories.map((story) => {
              const isLiked = likedStories[story.id] !== undefined;
              const likeCount = isLiked ? likedStories[story.id] : story.likes;

              return (
                <div
                  key={story.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={story.thumbnail}
                      alt={`Thumbnail for ${story.title}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{story.summary}</p>
                    <h4 className="font-semibold text-green-800 mb-2">
                      Key Lessons:
                    </h4>
                    <ul className="space-y-1">
                      {story.keyLessons.map((lesson, index) => (
                        <li
                          key={index}
                          className="text-gray-600 text-sm flex items-center"
                        >
                          ✅ {lesson}
                        </li>
                      ))}
                    </ul>
                    {showFullStory[story.id] && (
                      <p className="text-gray-700 mt-4">{story.fullStory}</p>
                    )}
                    <button
                      className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
                      onClick={() => toggleFullStory(story.id)}
                    >
                      {showFullStory[story.id] ? "Hide Story" : "Read Full Story"}
                    </button>
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                      <span>👀 {story.views} Views</span>
                      <button
                        className="text-lg transition-colors duration-300"
                        onClick={() => toggleLike(story.id)}
                      >
                        {isLiked ? "❤️" : "🩶"} {likeCount}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No stories match the selected filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesAvi;
