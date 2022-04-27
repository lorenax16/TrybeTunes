import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loanding: false,
    };
  }

  componentDidMount() {
    this.recupNome();
  }

  recupNome = () => {
    this.setState({ loanding: true }, async () => {
      const usuario = await getUser();
      this.setState({
        userName: usuario.name,
        loanding: false,
      });
    });
  }

  render() {
    const { userName, loanding } = this.state;
    return (
      <header data-testid="header-component">
        {loanding ? (<Carregando />)
          : (
            <div>
              <div>
                <h1 data-testid="header-user-name">
                  {userName}
                </h1>
              </div>
              <nav>
                <Link data-testid="link-to-search" to="/search">
                  Search
                </Link>
                <Link data-testid="link-to-favorites" to="/favorites">
                  favorites
                </Link>
                <Link data-testid="link-to-profile" to="/profile">
                  profile
                </Link>
              </nav>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
