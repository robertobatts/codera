import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { BACKEND_PREFIX } from '../constants/urls';

export default function ReviewCard(props) {
  const {id} = props.review;
  const {coverImage, title, body, rating } = props.review.attributes;

  return (
    <Card key={id} style={{ width: '30rem' }}>
      {coverImage.data && 
      <Card.Img variant='top' src={`${BACKEND_PREFIX}${coverImage.data.attributes.formats.medium.url}`}/>
      }
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {body.substring(0, 200)}...
        </Card.Text>
        <a href={`/details/${id}`}><Button variant='primary'>Read more</Button></a>
      </Card.Body>
    </Card>
  );
};