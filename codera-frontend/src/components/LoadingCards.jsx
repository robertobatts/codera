import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

const LoadingCard = () => {
  return (
    <Card className='card-margin'>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder style={{height: '200px'}} xs={12} />
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={2} />
      </Card.Body>
    </Card>
  );
}

export default function LoadingCards({ howMany = 1 }) {

  const getCards = () => {
    const cards = [];
    for (let i = 0; i < howMany; i++) {
      cards.push(<LoadingCard key={i} />);
    }
    return cards;
  }

  return (
    <>
      {getCards()}
    </>
  );
}