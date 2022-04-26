// import propTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Carregando from '../Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisbled: true,
      nameInput: '',
      carregando: false,
      repag: undefined,
    };
  }

  input = ({ target }) => {
    const { name, value } = target;
    const numMenor = 3;
    this.setState({
      [name]: value,
    });
    if (value.length >= numMenor) {
      this.setState({ isButtonDisbled: false });
    }
  }

  clickEvent = () => {
    console.log('teste');
    const { nameInput } = this.state;
    this.setState({
      carregando: true,
    }, async () => {
      await createUser({ name: nameInput });
      this.setState({ carregando: false,
        isButtonDisbled: true,
        nameInput: '',
        repag: '/search',
      });
    });
  }

  render() {
    const { isButtonDisbled, nameInput, carregando, repag } = this.state;
    if (repag) {
      return <Redirect to={ repag } />;
    }
    return (
      <div data-testid="page-login">
        {carregando ? <Carregando />
          : (
            <form>
              <label htmlFor="nome">
                Insira seu Nome
                <input
                  data-testid="login-name-input"
                  id="nome"
                  type="text"
                  name="nameInput"
                  value={ nameInput }
                  onChange={ this.input }
                />
              </label>
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ isButtonDisbled }
                onClick={ this.clickEvent }
              >
                Entrar
              </button>
            </form>
          )}
      </div>);
  }
}
// olhei os git hub de carla, flavio e kelder.
export default Login;
