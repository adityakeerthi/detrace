import React, { Component } from 'react';
import "./status.css"

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    accept: {
        background: "#5f9650",
        margin: "5px",
        color: "white",
        "&:hover": {
            background: "#335c28"
        }
    },
    report: {
        background: "#a82f2f",
        margin: "5px",
        color: "white",
        "&:hover": {
            background: "#701a1a"
        }
    },
}

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status : ""
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
        
        fetch("http://localhost:3005/getCovidStatus", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(typeof result)
            // result = Boolean(result);
            if (result === "true") {
                this.setState({
                    status: "You Have Contracted COVID 19"
                })
            } else {
                this.setState({
                    status: "You Do Not Have COVID 19"
                })
            }
          })
          .catch(error => console.log('error', error));
        //HANDLE API CALL AND SET STATE 
    }

    nonInfect(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"address":this.props.address,"status":false});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3005/changeCovidStatus", requestOptions)
          .then(response => response.text())
          .then(result => {
              this.setState({
                  status: "You Do Not Have COVID 19"
              })
          })
          .catch(error => console.log('error', error));
    }

    infect(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"address":this.props.address,"status":true});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3005/changeCovidStatus", requestOptions)
          .then(response => response.text())
          .then(result => {
              this.setState({
                  status: "You Have Contracted COVID 19"
              })
          })
          .catch(error => console.log('error', error));
    }

    render() { 
        const { classes } = this.props;

        return (
            <div className="status-div">
                <div className="status-content-div">
                    <div> Your status: <br /> <div style={{fontSize : "30px", margin : "20px"}}>{this.state.status}</div></div>  
                    <div>
                        <Button variant="contained" classes={{ root: classes.accept }} onClick={() => this.nonInfect()}> NOT INFECTED </Button>
                        <Button variant="contained" classes={{ root: classes.report }} onClick={() => this.infect()}> INFECTED </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Status);
