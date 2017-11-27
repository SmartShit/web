import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Logo, Header, Button } from './styled';
import axios from 'axios';

const logo = require('./assets/logo.png');

export default class DefaultTemplate extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

  }

  // async componentWillMount() {
  //   axios.get(`https://smartshit-api.herokuapp.com/route`)
  //     .then((res) => {
  //       this.setState({
  //         routes: res.data,
  //         loading: false,
  //       });
  //     });
  // }
  //
  //
  componentDidMount() {
    this.interval = setInterval(() => {
      axios.get(`https://smartshit-api.herokuapp.com/route`)
        .then((res) => {
          this.setState({
            routes: res.data,
            loading: false,
          });
        });
    }, 1000);
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <Header>
          <Link to="/">
            <Logo src={logo} alt="logo" />
          </Link>
          {!this.state.loading &&
          <Button
            target="_blank"
            href={`https://www.google.com/maps/dir/${this.state.routes[0].latitude},+${this.state.routes[0].longitude}/${this.state.routes[1].latitude},+${this.state.routes[1].longitude}/${this.state.routes[2].latitude},+${this.state.routes[2].longitude}/@52.0409505,12.2041696,7z/data=!3m1!4b1!4m14!4m13!1m3!2m2!1d14.443908!2d54.041145!1m3!2m2!1d14.443908!2d52.041145!1m3!2m2!1d14.443908!2d50.041145!3e0`}>
            Cesta svozu
          </Button>
          }
        </Header>
        {children}
      </div>
    );
  }
}
