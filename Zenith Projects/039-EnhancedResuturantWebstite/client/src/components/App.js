import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import Orders from './Orders';
import Reviews from './Reviews';
import 'bootstrap/dist/css/bootstrap.min.css';
import MobileApp from './MobileApp';
import Accessibility from './Accessibility';
import LoyaltyProgram from './LoyaltyProgram';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/menu" component={Menu} />
                <Route path="/orders" component={Orders} />
                <Route path="/reviews" component={Reviews} />
                <Route path="/mobile-app" component={MobileApp} />
                <Route path="/accessibility" component={Accessibility} />
                <Route path="/loyalty-program" component={LoyaltyProgram} />
                <Route path="/navbar" component={Navbar} />
                <Route path="/footer" component={Footer} />

            </Switch>
        </BrowserRouter>
    );
}

export default App;