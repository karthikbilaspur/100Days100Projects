import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CityList from './CityList';
import CityDetails from './CityDetails';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';

const App = () => {
  return (
    <BrowserRouter>
      <SearchBar />
      <Switch>
        <Route path="/" exact component={CityList} />
        <Route path="/cities/:id" component={CityDetails} />
        <Route path="/map" component={MapView} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;