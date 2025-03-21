import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { careers } from '../data/careers';

function CareerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [resources, setResources] = useState([]);

  // Mock YouTube resources - in a real app, these would come from an API
  const mockYoutubeResources = [
    { id: 'video1', title: 'Introduction to Career Path', thumbnail: 'https://via.placeholder.com/320x180', url: 'https://www.youtube.com/watch?v=example1' },
    { id: 'video2', title: 'Essential Skills Overview', thumbnail: 'https://via.placeholder.com/320x180', url: 'https://www.youtube.com/watch?v=example2' },
    { id: 'video3', title: 'Learning Roadmap Explained', thumbnail: 'https://via.placeholder.com/320x180', url: 'https://www.youtube.com/watch?v=example3' },
  ];

  useEffect(() => {
    const foundCareer = careers.find(c => c.id === parseInt(id));
    if (foundCareer) {
      setCareer(foundCareer);
    } else {
      // Handle career not found
      navigate('/explore');
    }
  }, [id, navigate]);

  const handleTakeTest = () => {
    navigate(`/skill-assessment/instructions/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Mock search results - in a real app, this would call an API
    if (searchQuery.trim()) {
      setSearchResults([
        { id: 'result1', title: `${searchQuery} for ${career?.name} - Tutorial`, thumbnail: 'https://via.placeholder.com/320x180', url: 'https://www.youtube.com/watch?v=search1' },
        { id: 'result2', title: `Learn ${searchQuery} - Complete Guide`, thumbnail: 'https://via.placeholder.com/320x180', url: 'https://www.youtube.com/watch?v=search2' },
      ]);
    }
  };

  const handleGetResources = () => {
    // Mock fetching resources
    const fetchedResources = [
      { id: 'resource1', title: 'Resource 1', thumbnail: 'https://via.placeholder.com/320x180' },
      { id: 'resource2', title: 'Resource 2', thumbnail: 'https://via.placeholder.com/320x180' },
      { id: 'resource3', title: 'Resource 3', thumbnail: 'https://via.placeholder.com/320x180' },
    ];
    setResources(fetchedResources);
  };

  if (!career) {
    return <div className="max-w-6xl mx-auto px-4 py-12">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      {/* Back button */}
      <button 
        onClick={() => navigate('/explore')}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Career Exploration
      </button>

      {/* Career Header - Section 1 */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-800">{career.name}</h1>
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {career.category}
              </span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">{career.description}</p>
          </div>
          
          <div className="flex-shrink-0">
            <button 
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors flex items-center shadow-sm"
              onClick={handleTakeTest}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Take A Test
            </button>
          </div>
        </div>
      </div>

      {/* Key Skills Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Key Skills</h2>
          <div className="flex flex-wrap gap-3">
            {career.skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed mt-4 max-w-4xl">
            These are the essential skills required to excel as a {career.name}. Developing these skills will help you build a strong foundation for your career.
          </p>
          {/* Get Resources Button */}
          {resources.length == 0 && <button 
            onClick={handleGetResources} 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Get Resources
          </button>}
          {/* Resources Grid */}
          {resources.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {resources.map((resource, index) => (
                <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-md">
                  <img src={resource.thumbnail} alt={resource.title} className="w-full h-44 object-cover" />
                  <div className="p-4">
                    <h4 className="font-medium text-gray-800">{resource.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Career Path Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">Career Progression</h2>
          <div className="relative py-6">
            {/* Horizontal line */}
            <div className="absolute left-0 right-0 h-0.5 bg-blue-300 top-12 z-0"></div>
            
            {/* Timeline items */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {career.potentialPaths.map((path, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  {/* Circle with number */}
                  <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-lg mb-4 z-10 shadow-md">
                    {index + 1}
                  </div>
                  {/* Path name */}
                  <h5 className="font-medium text-gray-800">{path}</h5>
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-4xl">
            This career path shows the typical progression for a {career.name}. Keep in mind that career paths can vary based on industry, company size, and personal goals.
          </p>
        </div>
      </div>

      {/* Learning Roadmap Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-800">Learning Roadmap</h2>
          <div className="relative py-6">
            {/* Horizontal line */}
            <div className="absolute left-0 right-0 h-0.5 bg-green-300 top-12 z-0"></div>
            
            {/* Timeline items */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {career.roadmap && career.roadmap.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  {/* Circle with number */}
                  <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white font-medium text-lg mb-4 z-10 shadow-md">
                    {index + 1}
                  </div>
                  {/* Step description */}
                  <p className="text-gray-800">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-4xl">
            This learning roadmap provides a structured approach to developing the skills needed for a successful career as a {career.name}.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CareerDetails; 