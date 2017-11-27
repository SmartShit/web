import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';
import DefaultTemplate from '../DefaultTemplate';
import Map from '../../components/Map';
import { Box, Wrapper } from './styled';

export default class Detailextends extends React.Component {
  static propTypes = {
    match: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  async componentWillMount() {
    axios.get(`https://smartshit-api.herokuapp.com/route`)
      .then((res) => {
        this.setState({
          ...res.data,
          loading: false,
        });
      });
  }


  componentDidMount() {
    this.interval = setInterval(() => {
      axios.get(`https://smartshit-api.herokuapp.com/route`)
        .then((res) => {
          this.setState({
            ...res.data,
            loading: false,
          });
        });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const cesspool = this.state;
    console.log(this.state);
    return this.state.loading ? (<div>LOADING</div>) : (

      <DefaultTemplate>
        <Wrapper>
          nevim
        </Wrapper>
      </DefaultTemplate>

    );
  }
}
