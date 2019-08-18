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
  }

  onInfoWindowOpen(props, e) {
    const button = (<button className="fav-btn" onClick={this.addFav.bind(this, this.state.selectedPlace)}><i className="fas fa-star"></i></button>);
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
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <div className="fav-div">
              <h5 className="fav-list-title">Tus tiendas favoritas irán apareciendo aquí, sólo debes abrir una tienda!</h5>
              <div>
                {this.state.favorites.map(e => {
                  return (
                    <div className="row store-container">
                      <div className="col-9">
                        <p className="store-name" key={e.Address}>{e.Name}</p>
                      </div>
                      <div className="col-3">
                        <button className="fav-delete-btn" onClick={this.removeFav.bind(this, e)}><i className="fas fa-times"></i></button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-9">
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
                  <div className="div-infowindow">
                    <h4 className="fav-window-title">{this.state.selectedPlace.Name}</h4>
                    <p className="fav-p">Agrega esta tienda a favoritos</p>
                    <div id="div-fav"></div>
                  </div>
              </InfoWindow>
            </Map>
          </div>
        </div>
      </div>
    )
  }
};

const style = {
  width: '100%',
  height: '800px'
}
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBymZs7mwtaNKsnJ3Fpt5tzvY1HPp2cQzY")
})(MapGoogle)