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
import SearchField from "react-search-field";
import './Nav.css';


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    }
  }
  searchText = "Search for an item"
  searchStyle = {
    width: '50%',
    backgroundColor: 'blue'
  }
  items = [
    {
      id: 1,
      name: 'apron'
    },
    {
      id: 2,
      name: 'drafter'
    },
    {
      id: 3,
      name: 'calculator'
    },
    {
      id: 4,
      name: 'book'
    }
  ]
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
  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <center><h1>JustNotBooks-Buy.Borrow.Rent</h1></center>
            <ul className="header">
              <li><a href="/home"><img src={h} /></a></li>
              <li><a href="/buyer">Exchanges</a></li>
              <li><a href="/seller">Transaction</a></li>
              <div style={{ width: "650px", display: "inline-block", verticalAlign: "middle", zIndex: "100" }}>
                <li className="liSearch">
                  <ReactSearchAutocomplete
                    items={this.items}
                    onSearch={this.handleOnSearch}
                    onSelect={this.handleOnSelect}
                    placeholder='Search for an item'
                    autoFocus
                  />
                </li>
              </div>
              <li>< a class="p" href="/survey"><img src={ic} /></a></li>
              <li><a class="p" href="/profile">{sessionStorage.getItem("name")}'s Profile</a></li>
              <li><a href="/notification" class="notification"><span><img src={bell} /></span><span class="badge">{sessionStorage.getItem("l")}</span></a></li>
            </ul>
          </div>
        </HashRouter>
      </div>
    )
  }
}

export default Nav;