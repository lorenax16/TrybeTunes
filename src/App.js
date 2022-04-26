import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/pages/Login';
import search from './components/pages/Search';
import album from './components/pages/Album';
import favorites from './components/pages/Favorites';
import profile from './components/pages/Profile';
import profileEdit from './components/pages/ProfileEdit';
import notFound from './components/pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <section>
        <p>TrybeTunes</p>
        <Route path="/" component={ Login } />
        <Route path="/search" component={ search } />
        <Route path="/album/:id" component={ album } />
        <Route path="/favorites" component={ favorites } />
        <Route path="/profile" component={ profile } />
        <Route path="/profile/edit" component={ profileEdit } />
        <Route path="*" exact component={ notFound } />
      </section>
    );
  }
}

export default App;
