import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader';
import DefaultTemplate from '../DefaultTemplate';
import Map from '../../components/Map';

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
    clearInterval(this.interval);
  }

  render() {
    const cesspool = this.state;
    return this.state.loading ? (<div>LOADING</div>) : (
      <div>
        <DefaultTemplate>
          <h1>{cesspool.name} - {cesspool.sensor_id}</h1>
          <h2>{cesspool.latitude}, {cesspool.longitude}</h2>
          <Map lat={cesspool.latitude} lng={cesspool.longitude}
               loadingElement={<div style={{ height: `100%` }} />}
               containerElement={<div style={{ height: `400px` }} />}
               mapElement={<div style={{ height: `100%` }} />} />
          <Loader percentage={cesspool.fullness_pct} />
        </DefaultTemplate>
      </div>
    );
  }
}
