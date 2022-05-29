import React from 'react';
import useFetch from '../hooks/useFetch';
import ReviewCard from '../components/ReviewCard';
import { getReviewsUrl } from '../constants/urls';
import LoadingCards from '../components/LoadingCards';
import { Fade } from 'react-bootstrap';

export default function Homepage() {
  const { loading, error, data } = useFetch(getReviewsUrl());

  if (loading) {
    return <LoadingCards howMany={2} />;
  }

  if (error) {
    return <p>ERROR!</p>;
  }

  return (
    <Fade appear={true} in={true}>
      <div>
        {data.map(review => <ReviewCard key={review.id} review={review} isPreview={true} />)}
      </div>
    </Fade>
  );
}
