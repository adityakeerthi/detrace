import React, { Component } from 'react';

import "./search.css"

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'

// let data = {
// 	name: 'Parent',
// 	children: [
//         {
//         name: 'Depth 1',
//         children : [
//             {
//                 name : 'Depth 2',
//                 children : [
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     }
//                 ]
//             },
//             {
//                 name : 'Depth 2',
//                 children : [
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     }
//                 ]
//             },
//             {
//                 name : 'Depth 2',
//                 children : [
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     }
//                 ]
//             }
//         ]
//         }, 
//         {
//         name: 'Depth 1',
//         children : [
//             {
//                 name : 'Depth 2',
//                 children : [
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     }
//                 ]
//             },
//             {
//                 name : 'Depth 2',
//                 children : [
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     }
//                 ]
//             },
//             {
//                 name : 'Depth 2',
//                 children : [
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     }
//                 ]
//             }
//         ]
//         }, 
//         {
//         name: 'Depth 1',
//         children : [
//             {
//                 name : 'Depth 2',
//                 children : [
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     }
//                 ]
//             },
//             {
//                 name : 'Depth 2',
//                 children : [
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     }
//                 ]
//             },
//             {
//                 name : 'Depth 2',
//                 children : [
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     }
//                 ]
//             }
//         ]
//         }, 
//         {
//         name: 'Depth 1',
//         children : [
//             {
//                 name : 'Depth 2',
//                 children : [
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     }
//                 ]
//             },
//             {
//                 name : 'Depth 2',
//                 children : [
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     }
//                 ]
//             },
//             {
//                 name : 'Depth 2',
//                 children : [
//                     {
//                         name : 'Depth 3'
//                     },
//                     {
//                         name : 'gay 3'
//                     },
//                     {
//                         name : 'Depth 3'
//                     }
//                 ]
//             }
//         ]
//         }
//     ]
// };


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { address : "", data : null}
    }

    componentDidMount(){
        
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
            result = JSON.parse(result)
            var original = result.original;
            console.log(result, original)
            var data = {
                name : original,
                children : result[original]
            }
            // console.log(result[original])
            console.log(typeof Object.keys(result))
            console.log(typeof original)
            for (var i = 0; i < data.children.length; i++){
                data.children.push({name : result[original]}) 
            }
            console.log(data)
        })
        .catch(error => console.log('error', error));
    }

    render() { 
        return (
            <div className="search-div">
                <div className="search-title">Search by Address</div>
                <div className="search-field">
                    <TextField id="standard-basic" label="Enter an Address" onChange={(e) => this.change(e)}/>
                    <Button variant="contained" color="primary" onClick={() => {this.find()}}> Search</Button>
                </div>
                <div className="tree-div">
                {this.state.data !== null ? 
                
                <Tree
                animated={true}
                data={this.state.data}
                circleProps={ {className: 'node', style : {fill : "blue"}}}
                textProps={ {className: 'node', style : {background : "blue", fontSize : "20px"} } }
                height={600}
                width={1200}/> 
                
                
                : 
                null
        }
                </div>


            </div>
        );
    }
}
 
export default Search;