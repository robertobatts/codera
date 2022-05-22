import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ReviewDetails from './pages/ReviewDetails';
import Category from './pages/Category';
import SiteHeader from './components/SiteHeader';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SiteHeader />
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/details/:id' element={<ReviewDetails />} />
          <Route path='/category/:id' element={<Category />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
