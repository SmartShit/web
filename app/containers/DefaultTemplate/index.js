import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Logo } from './styled';

const logo = require('./assets/logo.png');

export default class DefaultTemplate extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        <div>
          <Link to="/">
            <Logo src={logo} alt="logo" />
          </Link>
        </div>
        {children}
      </div>
    );
  }
}
