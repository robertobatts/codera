import React from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from '../components/ReviewCard';
import { getReviewUrl } from '../constants/urls';
import useFetch from '../hooks/useFetch';

export default function ReviewDetails() {
  const { id } = useParams();
  const { loading, error, data } = useFetch(getReviewUrl(id));

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>ERROR!</p>;
  }
  
  return (
    <div>
      <ReviewCard review={data} isPreview={false}/>
    </div>
  )
}
