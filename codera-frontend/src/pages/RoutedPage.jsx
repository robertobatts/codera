import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import ReviewDetails from './ReviewDetails';
import Category from './Category';

export default function RoutedPage() {
  return (
    <Routes>
      <Route exact path='/' element={<Homepage />}/>
      <Route path='/details/:id' element={<ReviewDetails />} />
      <Route path='/category/:id' element={<Category />} />
    </Routes>
  );
};