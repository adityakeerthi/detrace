import React, { Component } from 'react';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="notification-element">
                <div className="notification-element-title">{this.props.title}</div>   
            </div>
        );
    }
}
 
export default Notification;