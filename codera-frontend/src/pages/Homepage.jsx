import React from 'react';
import useFetch from '../hooks/useFetch';
import ReviewCard from '../components/ReviewCard';
import { REVIEWS_URL } from '../constants/urls';

export default function Homepage() {
  const { loading, error, data } = useFetch(`${REVIEWS_URL}?populate=coverImage`);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data.error || error) {
    return <p>ERROR!</p>;
  }

  return (
    <div>
      {data.data.map(review => <ReviewCard review={review} />)}
    </div>
  );
}
