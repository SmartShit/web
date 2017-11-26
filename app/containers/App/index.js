import React from 'react';
import axios from 'axios';
import DefaultTemplate from '../DefaultTemplate/index';
import { Box, GreyText, Percentage } from './styled';

const poopIcon = require('./poop.png');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sesPools: null,
    };

    this.renderSesPools = this.renderSesPools.bind(this);
  }

  async componentWillMount() {
    axios.get('https://smartshit-api.herokuapp.com/sumps')
      .then((res) => {
        this.setState({
          sesPools: res.data,
          loading: false,
        });
      });
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      axios.get('https://smartshit-api.herokuapp.com/sumps')
        .then((res) => {
          this.setState({
            sesPools: res.data,
            loading: false,
          });
        });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderSesPools(sesPools) {
    return sesPools.map((sesPool) => {
      return (
        <Box key={sesPool.id} to={`/detail/${sesPool.id}`}>
          <h2>{sesPool.name}<br /><GreyText>device id: {sesPool.sensor_id}</GreyText></h2>
          {sesPool.address_city}{sesPool.address_street && ', ' + sesPool.address_street}
          <Percentage>
            <img src={poopIcon} />{sesPool.fullness_pct} %
          </Percentage>
        </Box>
      );
    });
  }

  render() {
    return this.state.loading ? (<div>LOADING</div>) : (
      <DefaultTemplate>
        {this.renderSesPools(this.state.sesPools)}
      </DefaultTemplate>
    );
  }
}
