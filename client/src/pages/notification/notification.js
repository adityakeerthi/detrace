import React, { Component } from 'react';

import "./notification.css"

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="notification-div">
                <div className="notification-elements-container">
                    <div className="notification-title">My Notifications</div>

                </div>
                <div className="notification-counter-div">
                    <div className="notification-counter">
                        <div className="notification-counter-inner">
                            <div className="notification-counter-title">
                                Direct Connection Cases:
                            </div>
                            <div className="counter-num">10</div>
                            <div style={{background : "#eded6b", width : "40%", height : "20px", borderRadius : "10px", marginTop : "60px"}}></div>
                            <div style={{background : "#eded6b", width : "70%", height : "30px", borderRadius : "20px", marginTop : "10px"}}></div>
                        </div>
                        <div className="notification-counter-inner">
                            <div className="notification-counter-title">
                                Indirect Connection Cases:
                            </div>
                            <div className="counter-num">112</div>
                            <div style={{background : "#ed6b6b", width : "40%", height : "20px", borderRadius : "10px", marginTop : "60px"}}></div>
                            <div style={{background : "#ed6b6b", width : "70%", height : "30px", borderRadius : "20px", marginTop : "10px"}}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Notification;