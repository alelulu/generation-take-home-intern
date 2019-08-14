import React, { Component } from 'react';
import './comp-map.css'

class MapGoogle extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef(); 
  }

  componentDidMount() {
    var myLatLng = {lat: 19.4978, lng: -99.1269};

    var map = new window.google.maps.Map(this.mapRef.current, {
      zoom: 9,
      center: myLatLng
    });
    
  
    var marker = new window.google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }

  render() {
    return (
      <div>
        <div id="map" ref={this.mapRef}></div>
      </div>
    )
  }
};

export default MapGoogle;