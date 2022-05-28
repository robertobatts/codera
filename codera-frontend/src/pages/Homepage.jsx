import React from 'react';
import useFetch from '../hooks/useFetch';
import ReviewCard from '../components/ReviewCard';
import { getReviewsUrl } from '../constants/urls';

export default function Homepage() {
  const { loading, error, data } = useFetch(getReviewsUrl());

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>ERROR!</p>;
  }

  return (
    <div>
      {data.map(review => <ReviewCard key={review.id} review={review} isPreview={true}/>)}
    </div>
  );
}
