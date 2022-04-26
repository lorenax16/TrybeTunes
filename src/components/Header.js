import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <header data-testid="header-component">
          <section>
            <div>
              <Link
                data-testid="link-to-search"
                to="/search"
              >
                Search
              </Link>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
              >
                favorites
              </Link>
              <Link
                data-testid="link-to-profile"
                to="/profile"
              >
                profile
              </Link>
            </div>
          </section>
        </header>
      </div>
    );
  }
}

export default Header;
