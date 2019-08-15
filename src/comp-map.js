import React, { Component } from 'react';
import './comp-map.css';
import stores from './store_directory.json'

class MapGoogle extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      markers: [],
      favorites: []
    }
  }

  componentDidMount() {
    var myLatLng = {lat: 19.4978, lng: -99.1269};

    var map = new window.google.maps.Map(this.mapRef.current, {
      zoom: 10,
      center: myLatLng
    });
    
    /* this.getData() */
    console.log(stores)
    stores.forEach(element => {
      let marker = new window.google.maps.Marker({
        position: element.Coordinates,
        map: map,
        title: element.Name
      });
      
      this.setState({
        markers: this.state.markers.push({
          position: element.Coordinates,
          address: element.Address,
          name: element.Name
        })
      })
      
    });
    console.log(this.state.markers)
  
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