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
            console.log(result);
          })
          .catch(error => console.log('error', error));
        //HANDLE API CALL AND SET STATE 
    }

    nonInfect(){
        
        //HANDLE API CALL

    }

    infect(){
    
        //HANDLE API CALL
    }

    render() { 
        const { classes } = this.props;

        return (
            <div className="status-div">
                <div className="status-content-div">
                    <div>Your status: {this.state.status}</div>  
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
