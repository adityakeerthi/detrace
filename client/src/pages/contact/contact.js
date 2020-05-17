import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CloseIcon from '@material-ui/icons/Close';
import "./contact.css"

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="contact-div">
                <div>
                    <div className="contact-title">Add Contacts</div>
                    <div className="contact-add-div">
                        <div className="filler2"></div>
                        <TextField id="standard-basic" label="Enter an Address" />
                        <div className="filler2"></div>
                        <Button variant="contained" color="primary"> ADD CONTACT </Button>
                    </div>
                </div>
                <div className="special-1">
                    <div className="contact-title">Your Contacts</div>
                    <div className="contact-contacts-div">
                        <div className="contact-element"><div style={{width : "20px"}}></div>thisisasuperlonghashthatishouldgetfromanendpointhtaticurrentlycannotaccess <div className="close" style={{flex : 1, display : "flex", justifyContent : "flex-end", marginRight: "20px", fontWeight : "bold"}}>X</div></div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Contact;