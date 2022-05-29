import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SiteHeader from './components/SiteHeader';
import Sidebar from './components/Sidebar';
import RoutedPage from './pages/RoutedPage';

function App() {

  const sidebar = useMemo(() => <Sidebar />, []);

  return (
    <BrowserRouter>
      <SiteHeader />
      <Container style={{ marginTop: '60px' }}>
        <Row xs={12}>
          <Col xs='auto'>
            {sidebar}
          </Col>
          <Col>
            <RoutedPage />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
