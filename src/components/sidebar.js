import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class sidebar extends Component {
  render() {
    return (
      <section>
        <nav>
          <Link to="/">Login</Link>
          <Link to="/search">search</Link>
        </nav>
      </section>
    );
  }
}

export default sidebar;
