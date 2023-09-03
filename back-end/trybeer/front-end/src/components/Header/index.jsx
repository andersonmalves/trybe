import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearStorage, getStorage } from '../../services/localStorage';
import HeaderButtons from '../HeaderButtons/HeaderButtons';

import './styles.css';

function Header({ children }) {
  const history = useHistory();
  const [sideMenu, setSideMenu] = useState(true);
  const [role, setRole] = useState('client');

  useEffect(() => {
    const user = getStorage('user');
    if (user && user.role === 'administrator') setRole('administrator');
  }, []);

  function handleClick({ target }) {
    switch (target.name) {
    case 'products':
      return history.push('/products');
    case 'orders':
      return history.push('/orders');
    case 'profile':
      return history.push('/profile');
    default:
      clearStorage('user');
      return history.push('/');
    }
  }

  function handleClickAdm({ target }) {
    switch (target.name) {
    case 'orders':
      return history.push('/admin/orders');
    case 'profile':
      return history.push('/admin/profile');
    default:
      return history.push('/');
    }
  }

  return (
    <header className="header">
      <div data-testid="admin-side-bar-container">
        {role === 'client' && (
          <button
            type="button"
            className={ sideMenu ? 'menuHide' : 'menu' }
            data-testid="top-hamburguer"
            onClick={ () => setSideMenu(!sideMenu) }
          >
            <div />
            <div />
            <div />
          </button>
        )}
        <HeaderButtons
          sideMenu={ sideMenu }
          role={ role }
          handleClick={ handleClick }
          handleClickAdm={ handleClickAdm }
        />
      </div>
      <h2 data-testid="top-title">{ children }</h2>
    </header>
  );
}

export default Header;

Header.propTypes = {
  children: PropTypes.node.isRequired,
};