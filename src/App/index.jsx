import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';

import Navigation from './Navigation';
import Footer from './Footer';

import Writer from '../Writer';
import Books from '../Book/AllBooks';
import WriterListItemDetailContainer from '../Writer/WriterListItemDetail';
import BookListItemDetailContainer from '../Book/BookListItemDetail';
import SignIn from '../Session/SignIn';
import { useAuth } from '../Session/AuthContext';
import { SIGN_IN, WRITERS } from '../constants/routes';

const PrivateRoute = ({ element }) => {
  const { token } = useAuth();
  return token ? element : <Navigate to={SIGN_IN} replace />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

const App = () => (
  <Router>
    <div className="app">
      <Navigation />
      {/* 'lg' -> default | 'md' | 'sm' | 'xl' | 'xs' | false */}
      <Container maxWidth="lg">
        <div>
          <Routes>
            <Route path={SIGN_IN} element={<SignIn />} />
            <Route path="/writers" element={<PrivateRoute element={<Writer />} />} />
            <Route path="/libri" element={<PrivateRoute element={<Books />} />} />
            <Route path="/writer/:id/:name/:surname" element={<PrivateRoute element={<WriterListItemDetailContainer />} />} />
            <Route path="/book/:bookId/:title" element={<PrivateRoute element={<BookListItemDetailContainer />} />} />
            <Route path="*" element={<Navigate to={WRITERS} replace />} />
          </Routes>
        </div>
      </Container>
      <Footer />
    </div>
  </Router>
);

export default App;
