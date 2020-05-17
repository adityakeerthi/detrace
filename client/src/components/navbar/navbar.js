import React, { Component } from 'react';
import "./navbar.css"

import {Link} from "react-router-dom"

import BeenhereIcon from '@material-ui/icons/Beenhere';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import SearchIcon from '@material-ui/icons/Search';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

class Navbar extends Component {
    constructor(props) {
        super(props);
        
    }

    render() { 
        return (
            <div className="navbar-div">
                <div className="navbar-title">THIS IS THE NAME</div>
                <div className="navbar-links">
                    <Link className="navbar-link" to="status" style={{textDecoration : "none", color : "white"}}><div className="filler1"/><BeenhereIcon/>Status</Link>
                    <Link className="navbar-link" to="notifications" style={{textDecoration : "none", color : "white"}}><div className="filler1"/><NotificationsActiveIcon/>Notifications</Link>
                    <Link className="navbar-link" to="search" style={{textDecoration : "none", color : "white"}}> <div className="filler1"/><SearchIcon/>Search</Link>
                    <Link className="navbar-link" to="contacts" style={{textDecoration : "none", color : "white"}}> <div className="filler1"/><PermContactCalendarIcon/>Contacts</Link>
                </div>
            </div>

        );
    }
}
 
export default Navbar;