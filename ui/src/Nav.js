import React, { Component } from "react";
import search from './images/search.jpg';
import ic from './images/log.png'
import h from './images/ho.png'
import bell from './images/bellll.png'
import "./Nav.css"
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
      search: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEnter = this.onEnter.bind(this);

  }
  handleChange(value, event) {
    this.setState({
      search: value
    });
    sessionStorage.setItem("search", value);
  }
  handleSubmit() {
    window.location.href = "./search";
  }
  onEnter(value, event) {
    this.handleSubmit();
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
              <li>
                <SearchField
                  placeholder="Search for an item"
                  onChange={this.handleChange}
                  onSearchClick={this.handleSubmit}
                  onEnter={this.onEnter}
                  classNames="searchBar"
                />
              </li>
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