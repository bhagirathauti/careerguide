import React from 'react';
import { Link } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { careers } from '../data/careers';
import CareerCard from '../components/CareerCard';

function Results() {
  const { recommendations } = useTest();
  const recommendedCareers = careers.filter(career => recommendations.includes(career.id));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Career Recommendations</h1>
      <p className="text-gray-600 mb-8">
        Based on your personality test responses, here are the careers that best match your profile:
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {recommendedCareers.map(career => (
          <CareerCard key={career.id} career={career} />
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Link
          to="/explore"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore More Careers
        </Link>
        <Link
          to="/test"
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Retake Test
        </Link>
      </div>
    </div>
  );
}

export default Results;