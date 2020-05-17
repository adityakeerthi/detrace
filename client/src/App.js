import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import { ethers } from 'ethers';
import "./App.css";

import Navbar from "./components/navbar/navbar.js"
import Status from "./pages/status/status.js"
import Notification from "./pages/notification/notification.js"
import Search from "./pages/search/search.js"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Contact from "./pages/contact/contact.js"

class App extends Component {
  constructor() {
    super();
    this.state ={
      web3: null,
      accounts: null,
      account: null,
      ipfsDB: null,
      longitude: null,
      latitude: null,
    }
  }

  showPosition = (pos) => {
    this.setState({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    })
  } 

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      
      const account = accounts[0];

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({web3, accounts, account});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);

      // const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner() 
      // this.setState({
      //   signer 
      // })
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      // do something that says YOU NEED TO GIVE YOUR LOCATION FOR THIS TO WORK
      alert("YOU NEED TO GIVE YOUR LOCATION FOR THIS TO WORK") // yes this is so smart look at me
    }


  };

  render() {
    if (!this.state.account) {
      return <div> Loading Web3, accounts </div>;
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar></Navbar>
          <div className="content-div">
            <Switch>
              <Route path="/status">
                <Status address={this.state.account} />
              </Route>
              <Route path="/notifications">
                <Notification/>
              </Route>
              <Route path="/contacts">
                <Contact></Contact>
              </Route>
              <Route path="/search">
                <Search/>
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
