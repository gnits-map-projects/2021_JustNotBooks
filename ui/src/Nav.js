import React, { Component } from "react";
import search from './images/search.jpg';
import ic from './images/log.png'
import h from './images/ho.png'
import bell from './images/bellll.png'
import "./Nav.css"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import './Nav.css';
class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <center><br /><br />
            <h3>You Have New Notifications</h3>
            <br />
            <input type="submit" value="Click to see" onClick={event => window.location.href = './notification'} style={{ "float": "Left", padding: "5px" }} />
            <button onClick={event => window.location.reload()} style={{ position: 'absolute', top: 5, right: 5, backgroundColor: "white", color: "gray" }} > <b>X</b></button>
          </center></div>
      </div>
    );
  }
}

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      items: []
    }
  }

  searchStyle = {
    width: '50%',
    backgroundColor: 'blue'
  }

  handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter the string searched and for the second the results.
    this.setState({
      search: string
    });
    sessionStorage.setItem("search", string);
    console.log(string, results)
  }
  handleOnSelect = (item) => {
    // the item selected
    window.location.href = "./search";
    console.log(item)
  }
  fetchItems = async () => {
    const itemsfromDb = await fetch("http://localhost:9000/itemnames");
    const response = await itemsfromDb.json();
    let index = 0;
    let tempItems = [];
    response.forEach((item) => {
      tempItems = [...tempItems, { 'id': index++, 'name': item }]
    })
    this.setState({ 'items': tempItems });
  };
  componentDidMount() {
    this.fetchItems();
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <center><h1><b>JustNotBooks-Buy.Borrow.Rent</b></h1></center>
            <ul className="header">
              <li><a href="/home"><img src={h} /></a></li>
              <li><a href="/buyer">Exchanges</a></li>
              <li><a href="/seller">Transaction</a></li>
              <div style={{ width: "600px", display: "inline-block", verticalAlign: "middle", zIndex: "100" }}>
                <li className="liSearch">
                  <ReactSearchAutocomplete
                    items={this.state.items}
                    onSearch={this.handleOnSearch}
                    onSelect={this.handleOnSelect}
                    placeholder='Search for an item'
                    autoFocus
                  />
                </li>
              </div>
              <li>< a class="p" href="/survey"><img src={ic} /></a></li>
              <li><a class="p" href="/profile">{sessionStorage.getItem("name")}'s Profile</a></li>
              <li><a class="notification"><span><img src={bell} onClick={this.togglePopup.bind(this)} /></span><span class="badge">{sessionStorage.getItem("l")}</span></a></li>
            </ul>
            {this.state.showPopup ?
              <Popup
                closePopup={this.togglePopup.bind(this)}
              />
              : null
            }
          </div>
        </HashRouter>
      </div>
    )
  }
}

export default Nav;