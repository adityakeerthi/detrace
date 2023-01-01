import React, { Component } from 'react'
import Hos from './hospitals.json'
import { Button } from 'rsuite';
import Icon from './marker.png'

const google = window.google
class MapContainer extends Component {
    constructor(){
        super()
        this.state = { 
            "hospitals" : true,
            "facemasks" : true,
            "ventil" : true,
            "glove" : true
        }
    }
    componentDidMount(){

        var heatmapData = []

        Hos.features.map((value, index) => {
          var weight = Math.floor(Math.random() * 10)
          heatmapData.push({location: new google.maps.LatLng( value.attributes.LATITUDE, value.attributes.LONGITUDE), weight: weight * Math.floor(Math.random() * 1000)})
          //heatmapData[heatmapData.length - 1].setMap(map)

        })

        // Hos.features.map((value, index) => {
        //   var weight = Math.floor(Math.random() * 10)
        //   heatmapData.push({location: new google.maps.LatLng( value.attributes.LATITUDE + Math.random(), value.attributes.LONGITUDE + Math.random()), weight: weight * Math.floor(Math.random() * 100)})
        //   //heatmapData[heatmapData.length - 1].setMap(map)

        // })

        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.7099, lng: -74.0048},
            zoom: 11
        });


        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            radius : 30
        });


        //heatmap.setMap(map);

        this.setState({map : map})


    }

    facemask(){
        if (this.state.facemasks === true){
            var heatmapData = []

            Hos.features.map((value, index) => {
              var weight = Math.floor(Math.random() * 10)
              heatmapData.push({location: new google.maps.LatLng( value.attributes.LATITUDE, value.attributes.LONGITUDE), weight: weight * Math.floor(Math.random() * 500)})
              //heatmapData[heatmapData.length - 1].setMap(map)
    
            })

            var g = [
                'rgba(255, 0, 0, 0)',
                'rgba(255, 255, 0, 0.9)',
                'rgba(0, 255, 0, 0.7)',
                'rgba(173, 255, 47, 0.5)',
                'rgba(152, 251, 152, 0)',
                'rgba(152, 251, 152, 0)',
                'rgba(0, 0, 238, 0.5)',
                'rgba(0, 0, 250, 1)',
                'rgba(0, 0, 250, 1)',
                'rgba(0, 0, 250, 1)'
            ]

            var heatmapf = new google.maps.visualization.HeatmapLayer({
                data: heatmapData,
                radius : 50,
            });
            heatmapf.setMap(this.state.map);
    
            this.setState(() => {
                return {
                    "heatmapf" : heatmapf,
                    "facemasks" : false
                }
            });
        }else{
            console.log("hi")
            
            this.state.heatmapf.setMap(null);
            
            this.setState({facemasks : true})
        }
       
    }
    ventil(){
        if (this.state.ventil === true){
            var heatmapData = []

            Hos.features.map((value, index) => {
              var weight = Math.floor(Math.random() * 10)
              heatmapData.push({location: new google.maps.LatLng( value.attributes.LATITUDE, value.attributes.LONGITUDE), weight: weight * Math.floor(Math.random() * 500)})
              //heatmapData[heatmapData.length - 1].setMap(map)
    
            })
    
            var heatmapv = new google.maps.visualization.HeatmapLayer({
                data: heatmapData,
                radius : 50
            });
            heatmapv.setMap(this.state.map);
    
            this.setState(() => {
                return {
                    "heatmapv" : heatmapv,
                    "ventil" : false
                }
            });
        }else{
            console.log("hi")
            
            this.state.heatmapv.setMap(null);
            
            this.setState({ventil : true})
        }
       
    }
    glove(){
        if (this.state.glove === true){
            var heatmapData = []

            Hos.features.map((value, index) => {
              var weight = Math.floor(Math.random() * 10)
              heatmapData.push({location: new google.maps.LatLng( value.attributes.LATITUDE, value.attributes.LONGITUDE), weight: weight * Math.floor(Math.random() * 500)})
              //heatmapData[heatmapData.length - 1].setMap(map)
    
            })
    
            var heatmapg = new google.maps.visualization.HeatmapLayer({
                data: heatmapData,
                radius : 50
            });
            heatmapg.setMap(this.state.map);
    
            this.setState(() => {
                return {
                    "heatmapg" : heatmapg,
                    "glove" : false
                }
            });
        }else{
            console.log("hi")
            
            this.state.heatmapg.setMap(null);
            
            this.setState({glove : true})
        }
       
    }


    addMarker(){
        if (this.state.hospitals == true){
            console.log(this.state.hospitals)
            var markerList = []

            var icon = {
              url: Icon, // url
              scaledSize: new google.maps.Size(20, 20), // scaled size
              origin: new google.maps.Point(0,0), // origin
              anchor: new google.maps.Point(0, 0) // anchor
          };

            Hos.features.map((value, index) => {
                markerList.push(new google.maps.Marker({
                    position: {lat: value.attributes.LATITUDE, lng: value.attributes.LONGITUDE},
                    map: this.state.map,
                    icon : icon
                }))
                
                markerList[markerList.length - 1].setMap(this.state.map)
            })
            this.setState(() => {
                return {
                    "markerList" : markerList,
                    "hospitals" : false
                }
            });
        }
        else {

            for (var i = 0; i < this.state.markerList.length; i++) {
                this.state.markerList[i].setMap(null);
            }
            this.setState({hospitals : true})

        }
    }
  render() {
    return (
      <div style={{ height: '100%', width: '100%', display: "flex", flexDirection: "column" }}>
        <div id="map" style={{height: "90%"}}></div>
        <div style={{width : "100%", height: "10%", display: "flex", justifyContent : "center", alignItems : "center"}}> 
            <Button appearance="primary" onClick={() => this.addMarker()} active style={{margin: "20px"}}>Hospitals</Button>
            <Button appearance="primary" onClick={() => this.facemask()} active style={{margin: "20px"}}>Facemasks</Button>
            <Button appearance="primary" onClick={() => this.ventil()} active style={{margin: "20px"}}>Ventilators</Button>
            <Button appearance="primary" onClick={() => this.glove()} active style={{margin: "20px"}}>Gloves</Button>
        </div>
      </div>
    )
  }
}

export default MapContainer