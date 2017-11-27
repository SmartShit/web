import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';
import DefaultTemplate from '../DefaultTemplate';
import Map from '../../components/Map';
import { Box, Wrapper } from './styled';

const mockData = {
  id: 15654516,
  name: 'Los Žumpos',
  address: {
    lat: 50.091816,
    lng: 14.455096,
  },
  percentage: 59,
};

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
    const id = this.props.match.params.id;
    axios.get(`https://smartshit-api.herokuapp.com/sumps/${id}`)
      .then((res) => {
        this.setState({
          ...res.data,
          loading: false,
        });
      });
  }

  componentDidMount() {
    let width = window.innerWidth - 110;
    if (window.innerWidth > 768) {
      width = 290;
    }
    this.setState({
      width: width
    });
    window.addEventListener("resize", this.updateDimensions);

    this.interval = setInterval(() => {
      const id = this.props.match.params.id;
      axios.get(`https://smartshit-api.herokuapp.com/sumps/${id}`)
        .then((res) => {
          this.setState({
            ...res.data,
            loading: false,
          });
        });
    }, 1000);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);

    clearInterval(this.interval);
  }

  updateDimensions(event) {
    let width = event.currentTarget.innerWidth - 110;
    if (window.innerWidth > 768) {
      width = 290;
    }
    this.setState({
      width: width
    });
  }


  render() {
    const cesspool = this.state;
    const number = !this.state.loading && 0.12 * cesspool.fullness_pct;
    const rounded = Math.round( number * 10 ) / 10;
    return this.state.loading ? (<div>LOADING</div>) : (

      <DefaultTemplate>
        <Wrapper>
          <Box>
            <h1>{cesspool.name}</h1>
            <div>
              deviceId: {cesspool.sensor_id}
            </div>
            <div>
              systemID: {cesspool.id}
            </div>
          </Box>
          <div style={{ width: "100%", float: "left" }}></div>
          <Box width="48%">
            <h2>Umístění</h2>
            <div>
              {cesspool.address_city}{cesspool.address_street && ', ' + cesspool.address_street}
            </div>
            <div>
              {cesspool.latitude}, {cesspool.longitude}
            </div>
            <Map lat={cesspool.latitude} lng={cesspool.longitude}
                 loadingElement={<div style={{ height: `100%` }} />}
                 containerElement={<div style={{ height: `376px` }} />}
                 mapElement={<div style={{ height: `100%` }} />} />
          </Box>
          <Box>
            <h2>Zaplnění nádrže</h2>
            <div>{rounded} litrů</div>
            <Loader percentage={cesspool.fullness_pct} size={this.state.width} />
          </Box>
        </Wrapper>
      </DefaultTemplate>

    );
  }
}
