import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ReactGA } from 'react-ga';

ReactGA.initialize('UA-XXXXX-X');
ReactGA.pageview(window.location.pathname + window.location.search);


ReactDOM.render(
    <React.StrictMode>
        <App />
        <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GA_TRACKING_ID}');
        `,
      }}
    />
    </React.StrictMode>,
    document.getElementById('root')
);