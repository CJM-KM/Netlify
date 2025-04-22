import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/comments') 
      .then(res => setReviews(res.data.comments)) 
      .catch(err => console.error('Error fetching reviews:', err));
  }, []);

  return (
    <div className="bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">User Reviews</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">{new Date(review.date).toDateString()}</p>
              </div>
            </div>
            <div className="flex space-x-1 text-yellow-400 mb-3">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i}>{i < 4 ? '★' : '☆'}</span> 
              ))}
            </div>
            <p className="text-gray-700 mb-2">{review.body}</p>
            <button className="text-blue-500 hover:underline text-sm">Read more</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
