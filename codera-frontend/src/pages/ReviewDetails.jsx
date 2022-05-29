import React from 'react';
import { Fade } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LoadingCards from '../components/LoadingCards';
import ReviewCard from '../components/ReviewCard';
import { getReviewUrl } from '../constants/urls';
import useFetch from '../hooks/useFetch';

export default function ReviewDetails() {
  const { id } = useParams();
  const { loading, error, data } = useFetch(getReviewUrl(id));

  if (loading) {
    return <LoadingCards />;
  }

  if (error) {
    return <p>ERROR!</p>;
  }

  return (
    <Fade appear={true} in={true}>
      <div>
        <ReviewCard review={data} isPreview={false} />
      </div>
    </Fade>
  );
}
