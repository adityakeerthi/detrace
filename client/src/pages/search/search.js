import React, { Component } from 'react';

import "./search.css"

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { address : "", data : null, test : 0}
    }

    componentDidMount(){
        
        var nodes = document.getElementsByClassName("node")
        console.log(nodes[0]) 
        console.log("HI")
        
    }

    change(e){
        var value = e.target.value
        this.setState({address : value})
    }

    find(){
        //GET ADDRESS THINGY
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"address": this.state.address});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:3005/getConnection", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            result = JSON.parse(result)
            var original = result.original;
            console.log(result)
            var data = {
                name : original,
                children : result[original]
            }
            // console.log(result[original])
            console.log(Object.keys(result))
            // console.log(typeof original)
            // for (var i = 0; i < data.children.length; i++){
            //     data.children.push({name : result[original]}) 
            // }
            // this.setState({data : data})
            // console.log(data)
            this.setState({data : original})

            var circle = document.getElementsByClassName("node")[0].childNodes[0].style.fill="red"
            console.log(circle)

            if (this.state.test == 1){
                var d = document.getElementsByClassName("node")[2].childNodes[0].style.fill="red"
                console.log(d)
            }
            
            
        })
        .catch(error => console.log('error', error));
    }

    test(){
        this.setState({test : 1})
    }

    render() { 
        return (
            <div className="search-div">
                <div className="search-title" onClick={() => this.test()}> Search by Address </div>
                <div className="search-field">
                    <TextField id="standard-basic" label="Enter an Address" onChange={(e) => this.change(e)}/>
                    <Button variant="contained" color="primary" onClick={() => {this.find()}}> Search </Button>
                </div>
                <div className="tree-div">
                {this.state.data !== null ? 
                
                <Tree
                animated={true}
                data={this.state.data}
                nodeRadius={15}
                margins={{ bottom : 10, left : 20, right : 150, top : 10}	}
                circleProps={ {style : {fill : "blue"}}}
                textProps={ {className: 'node', style : {background : "blue", fontSize : "14px"} } }
                height={600}
                width={1100}/> 
                
                
                
                : 
                null
        }
                </div>


            </div>
        );
    }
}
 
export default Search;