import React, { Component } from 'react';
import MapGoogle from './comp-map.js'

/*
* Use this component as a launching-pad to build your functionality.
*
*/
class YourComponent extends Component {
  render() {
    return (
      <div style={divStyle}>
        <MapGoogle/>
      </div>
    );
  }
}

var divStyle = {
  border: 'red',
  borderWidth: 2,
  borderStyle: 'solid',
  padding: 20
};

export default YourComponent;
