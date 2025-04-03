import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Gallery from './components/Gallery';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { CSRFToken } from 'react-csrf-token';

const Form = () => {
  return (
    <form>
      <CSRFToken />
      {/* form fields */}
    </form>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  Auth.currentAuthenticatedUser()
    .then((user) => setUser(user))
    .catch((error) => console.error(error));

  return (
    <BrowserRouter>
    <div className="app">
    <Route path="/protected" render={() => (user ? <Protected /> : <Redirect to="/login" />)} />
      <Route path="/login" component={Login} />
      <h1>Photo Gallery</h1>
      <Gallery />
    </div>
    </BrowserRouter>
  );
};

App.propTypes = {};

export default App;