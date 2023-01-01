import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CloseIcon from '@material-ui/icons/Close';
import "./contact.css";
import CircularProgress from '@material-ui/core/CircularProgress';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address : "",
            upload: null,
            contacts: [],
            loading : true
        }
    }

    componentDidMount() {
        var address = this.props.address

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"address":this.props.address});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3005/getConnection", requestOptions)
          .then(response => response.text())
          .then(result => {
              result = JSON.parse(result);
              var original = result["original"];
              var directAddresses = result[original];
              if (directAddresses == undefined){
                directAddresses = []
              }
              this.setState({loading : false})
              this.setState({
                  contacts: directAddresses
              })

          })
          .catch(error => console.log('error', error));

        // await Contract.setTree(address)
        // var nextAddresses = await Contract.getTree(address);
        // await Contract.clearArr();

    }

    handleAddress(e) {
        this.setState({
            address: e.target.value
        })
    }

    addContact(e) {
        e.preventDefault();
        
        const signer = this.props.address;
        const to = this.state.address;
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"address":signer,"contact":to});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3005/getContact", requestOptions)
          .then(response => response.text())
          .then(result => {
              this.setState({loading : false})
              this.setState({
                upload: "Contact successfully added!"
              })





          })
          .catch(error => console.log('error', error));

    }

    render() { 

        // const 

        return (
            <div className="contact-div">
                <div>
                    <div className="contact-title">Add Contacts</div>
                    <div className="contact-add-div">
                        <div className="filler2"></div>
                        <TextField onChange={(e) => {this.handleAddress(e)}} id="standard-basic" label="Enter an Address"/>
                        <div className="filler2"></div>
                        <Button variant="contained" onClick={(e) => {this.addContact(e)}} color="primary"> ADD CONTACT </Button>
                        <div className="filler2">{this.state.upload}</div>
                    </div>
                </div>
                <div className="special-1">
                    <div className="contact-title">Your Contacts</div>
                    <div className="contact-contacts-div">
                        {this.state.loading ? <div style={{width: "60px", marginLeft: "100px"}}><CircularProgress/> </div>: <div></div>}
                        {this.state.contacts.map((hash) => {
                            return (
                                <div className="contact-element"><div style={{width : "20px"}}></div>{hash} <div className="close" style={{flex : 1, display : "flex", justifyContent : "flex-end", marginRight: "20px", fontWeight : "bold"}}></div></div>
                            )


                        })}



                        {/* <div className="contact-element"><div style={{width : "20px"}}></div>thisisasuperlonghashthatishouldgetfromanendpointhtaticurrentlycannotaccess <div className="close" style={{flex : 1, display : "flex", justifyContent : "flex-end", marginRight: "20px", fontWeight : "bold"}}></div></div>
                        <div className="contact-element"><div style={{width : "20px"}}></div>thisisasuperlonghashthatishouldgetfromanendpointhtaticurrentlycannotaccess <div className="close" style={{flex : 1, display : "flex", justifyContent : "flex-end", marginRight: "20px", fontWeight : "bold"}}></div></div> */}
                    
                    
                    
                    
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Contact;