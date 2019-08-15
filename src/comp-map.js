import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './comp-map.css';
import stores from './store_directory.json'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapGoogle extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: [],
      favorites: []
    }
    this.addFav = this.addFav.bind(this)
  }

  onInfoWindowOpen(props, e) {
    const button = (<button onClick={this.addFav.bind(this, this.state.selectedPlace)}>Agragar favorito</button>);
    ReactDOM.render(React.Children.only(button), document.getElementById("div-fav"));
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props.place_,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  addFav(store) {
    let existsFav = false;
    this.state.favorites.forEach(favStore => {
      if(favStore.Name === store.Name){
        existsFav = true;
      }
    })
    if(!existsFav){
      this.setState({
        favorites: this.state.favorites.concat([store])
      })
      alert("Tienda agregada a favoritos")
    }
    else{
      alert("Ya existe esta tienda en favoritos ⭐")
    }
    
    console.log(this.state.favorites)
    this.setState()
  }

  removeFav(store) {
      const removed = this.state.favorites.filter(storeToDelete => storeToDelete.Address !== store.Address)
      this.setState({
        favorites: removed
      })
    }

  render() {
    return (
      <div>
        <div>
          <h1>Tus tiendas favoritas:</h1>
          <div>
            {this.state.favorites.map(e => {
              return (
                <h5 key={e.Address}>{e.Name} <span><button onClick={this.removeFav.bind(this, e)}>Quitar de favoritos</button></span></h5>
              )
            })}
          </div>
        </div>
        <Map
          style={style}
          google={this.props.google}
          initialCenter={{
            lat: 19.4978,
            lng: -99.1269
          }}
          zoom={10}
          onClick={this.onMapClicked}
        > 
        {
          stores.map(element => {
            this.state.markers.push({
              position: element.Coordinates,
              address: element.Address,
              name: element.Name
            })
            return (
              <Marker
                onClick={this.onMarkerClick}
                name={element.Name}
                key={element.Address}
                position={element.Coordinates}
                place_={element}
              />
            )
          })
        }
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onOpen={e => {
              this.onInfoWindowOpen(this.props, e);
            }}>
              <div>
                <h1>{this.state.selectedPlace.Name}</h1>
                <div id="div-fav"></div>
              </div>
          </InfoWindow>
        </Map>
      </div>  
    )
  }
};


const style = {
  width: '100%',
  height: '80%'
}
export default GoogleApiWrapper({
  apiKey: ("AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A")
})(MapGoogle)