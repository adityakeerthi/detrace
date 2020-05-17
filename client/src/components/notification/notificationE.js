import React, { Component } from 'react';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="notification-element">
                <div className="notification-element-title">Depth 1 connection has contracted COVID 19</div>   
            </div>
        );
    }
}
 
export default Notification;