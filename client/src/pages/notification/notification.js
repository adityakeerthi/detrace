import React, { Component } from 'react';

import NotificationE from "../../components/notification/notificationE.js"

import "./notification.css"

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            firstAddress: null,
            secondAddress: null
        }
    }

    componentDidMount(){

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"address":this.props.address});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3005/checkCorona", requestOptions)
          .then(response => response.text())
          .then(result => {
              this.setState({
                  firstAddress: result
              })
          })
          .catch(error => console.log('error', error));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"address":this.props.address});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3005/checkSecondary", requestOptions)
          .then(response => response.text())
          .then(result => {
              this.setState({
                  secondAddress: result
              })
          })
          .catch(error => console.log('error', error));

        this.setState({[this.state.firstAddress, this.state.secondAddress]})
        
        const notificationHTML = notifications.map((notification) => {
            notifi
            return (
                <NotificationE title="Depth 1 connection has contracted COVID 19"/> 
 
            )


        })

    }

    render() { 
        return (
            <div className="notification-div">
                <div className="notification-elements-container">
                    <div className="notification-title">My Notifications</div>



                    <NotificationE title="Depth 1 connection has contracted COVID 19"/>
                    <NotificationE title="Depth 1 connection has contracted COVID 19"/>
                    <NotificationE title="Depth 1 connection has contracted COVID 19"/>
                    <NotificationE title="Depth 1 connection has contracted COVID 19"/>



                    
                </div>
                <div className="notification-counter-div">
                    <div className="notification-counter">
                        <div className="notification-counter-inner">
                            <div className="notification-counter-title">
                                Direct Connection Cases:
                            </div>
                            <div className="counter-num">10</div>
                            <div style={{background : "#ed6b6b", width : "40%", height : "20px", borderRadius : "10px", marginTop : "60px"}}></div>
                            <div style={{background : "#ed6b6b", width : "70%", height : "30px", borderRadius : "20px", marginTop : "10px"}}></div>
                        </div>
                        <div className="notification-counter-inner">
                            <div className="notification-counter-title">
                                Indirect Connection Cases:
                            </div>
                            <div className="counter-num">112</div>
                            <div style={{background : "#eded6b", width : "40%", height : "20px", borderRadius : "10px", marginTop : "60px"}}></div>
                            <div style={{background : "#eded6b", width : "70%", height : "30px", borderRadius : "20px", marginTop : "10px"}}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Notification;