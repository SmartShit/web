import React from 'react';
import axios from 'axios';
import DefaultTemplate from '../DefaultTemplate/index';
import { Link } from 'react-router-dom';

const fetch = () => {
  axios.get('https://smartshit-api.herokuapp.com/sumps')
    .then((res) => {
      this.setState({
        sesPools: res.data,
        loading: false,
      });
    });
}


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
        <li key={sesPool.id}>
          <Link to={`/detail/${sesPool.id}`}>
            {sesPool.name} - {sesPool.sensor_id}
            {sesPool.address_city}, {sesPool.address_street}
            {sesPool.fullness_pct}
          </Link>
        </li>
      );
    });
  }

  render() {
    return this.state.loading ? (<div>LOADING</div>) : (
      <DefaultTemplate>
        <ul>
          {this.renderSesPools(this.state.sesPools)}
        </ul>
      </DefaultTemplate>
    );
  }
}
