import React, { Component } from 'react';

import "./search.css"

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css'

let data = {
	name: 'Parent',
	children: [
        {
        name: 'Depth 1',
        children : [
            {
                name : 'Depth 2',
                children : [
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    }
                ]
            },
            {
                name : 'Depth 2',
                children : [
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    }
                ]
            },
            {
                name : 'Depth 2',
                children : [
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    }
                ]
            }
        ]
        }, 
        {
        name: 'Depth 1',
        children : [
            {
                name : 'Depth 2',
                children : [
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    }
                ]
            },
            {
                name : 'Depth 2',
                children : [
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    }
                ]
            },
            {
                name : 'Depth 2',
                children : [
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    }
                ]
            }
        ]
        }, 
        {
        name: 'Depth 1',
        children : [
            {
                name : 'Depth 2',
                children : [
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    }
                ]
            },
            {
                name : 'Depth 2',
                children : [
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    }
                ]
            },
            {
                name : 'Depth 2',
                children : [
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    }
                ]
            }
        ]
        }, 
        {
        name: 'Depth 1',
        children : [
            {
                name : 'Depth 2',
                children : [
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    }
                ]
            },
            {
                name : 'Depth 2',
                children : [
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'Depth 3'
                    }
                ]
            },
            {
                name : 'Depth 2',
                children : [
                    {
                        name : 'Depth 3'
                    },
                    {
                        name : 'gay 3'
                    },
                    {
                        name : 'Depth 3'
                    }
                ]
            }
        ]
        }
    ]
};


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
        console.log("n^n");
    }

    render() { 
        return (
            <div className="search-div">
                <div className="search-title">Search by Address</div>
                <div className="search-field">
                    <TextField id="standard-basic" label="Enter an Address" />
                    <Button variant="contained" color="primary"> Search</Button>
                </div>
                <div className="tree-div">
                   
                <Tree
                animated={true}
                data={data}
                circleProps={ {className: 'node', style : {fill : "blue"}}}
                textProps={ {className: 'node', style : {background : "blue", fontSize : "20px"} } }
                height={600}
                width={1200}/>
                </div>


            </div>
        );
    }
}
 
export default Search;