import React, { Component } from 'react';
import "./map.css"

import MapContainer from "../../components/mapComp/mapComp.js"

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="map-page-div">
                <MapContainer/>
            </div>
        );
    }
}
 
export default Map;