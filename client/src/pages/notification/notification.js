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

    notificationHTML = null

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
              console.log(result);
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
              console.log(result, "secondary stuff")
              this.setState({
                  secondAddress: result
              })
          })
          .catch(error => console.log('error', error));

        var notifs = this.state.notifications
        notifs.push(this.state.firstAddress);
        notifs.push(this.state.secondAddress);
        console.log(notifs);
        this.setState({notifications: notifs})
        
        console.log(this.state.notifications);

    }

    render() { 


        return (
            <div className="notification-div">
                <div className="notification-elements-container">
                    <div className="notification-title">My Notifications</div>
                    
                    {/* <NotificationE title={`${this.state.firstAddress} of your Depth 1 connections has contracted COVID 19`}/>  */}
                    
                {/* {   this.state.notifications.map((notification) => {
                        if (notification % 2 === 0) {
                            return (
                               <NotificationE title={`${notification} of your Depth 1 connections has contracted COVID 19`}/> 
                            )
                        } else {
                            return (
                                <NotificationE title={`${notification} of your Depth 2+ connections has contracted COVID 19`}/>
                            )
                        }
                    })
                    } */}


                {this.state.firstAddress ? <NotificationE title={`${this.state.firstAddress} of your Depth 1 connections has contracted COVID 19`}/> : null }
                {this.state.secondAddress ? <NotificationE title={`${this.state.secondAddress} of your Depth 2+ connections has contracted COVID 19`}/> : null }


                </div>
                <div className="notification-counter-div">
                    <div className="notification-counter">
                        <div className="notification-counter-inner">
                            <div className="notification-counter-title">
                                Direct Connection Cases:
                            </div>
                            <div className="counter-num">{this.state.firstAddress}</div>
                            <div style={{background : "#ed6b6b", width : "40%", height : "20px", borderRadius : "10px", marginTop : "60px"}}></div>
                            <div style={{background : "#ed6b6b", width : "70%", height : "30px", borderRadius : "20px", marginTop : "10px"}}></div>
                        </div>
                        <div className="notification-counter-inner">
                            <div className="notification-counter-title">
                                Indirect Connection Cases:
                            </div>
                            <div className="counter-num">{this.state.secondAddress}</div>
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