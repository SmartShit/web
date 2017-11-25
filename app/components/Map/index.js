import React from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import PropTypes from 'prop-types';

const Map = withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      {props.lat && props.lng && <Marker position={{ lat: props.lat, lng: props.lng }} />}
    </GoogleMap>
  );
});

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default Map;
