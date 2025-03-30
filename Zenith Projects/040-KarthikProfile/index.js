import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Header from './Header';
import Home from './Home';
import About from './About';
import Portfolio from './Portfolio';
import Contact from './Contact';
import App from './App';
import SocialMedia from './SocialMedia';

function App() {
    return (
        <div>
            <Header />
            <Home />
            <About />
            <Portfolio />
            <Contact />
            <SocialMedia />
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);