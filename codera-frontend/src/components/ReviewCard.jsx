import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { BACKEND_PREFIX } from '../constants/urls';
import './ReviewCard.css';

export default function ReviewCard({ review, isPreview }) {
  const { coverImage, title, body, rating } = review.attributes;

  const getCardText = () => {
    return (
      <>
        <Card.Text>
          {isPreview? body.substring(0, 200) + '...' : body}
        </Card.Text>
        {isPreview && <a href={`/details/${review.id}`}><Button variant='primary'>Read more</Button></a>}
      </>
    );
  };

  return (
    <Card className='card-margin'>
      {coverImage.data &&
        <Card.Img style={{height: '200px', objectFit: 'cover'}} variant='top' src={`${BACKEND_PREFIX}${coverImage.data.attributes.formats.large.url}`} />
      }
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {getCardText()}
      </Card.Body>
    </Card>
  );
};