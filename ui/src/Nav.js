import React, { Component } from "react";
import search from './images/search.jpg';
import "./Nav.css"
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(event) {
    this.setState({
      search: event.target.value
    });
    sessionStorage.setItem("search", this.state.search);
  }
  handleSubmit() {
    window.location.href = "./search";
  }
  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <h1>JustNotBooks-Buy.Borrow.Rent</h1>
            <ul className="header">
              <li><a href="/home">Home</a></li>
              <li><a href="/buyer">Discovery</a></li>
              <li><a href="/seller">Transaction</a></li>
              <li>
                <input type="search" placeholder="Search for an item" width="500px" value={this.state.search} onChange={this.handleChange} name="search" />
                <button className="btnstyle2" onClick={this.handleSubmit}><img src={search} alt="Logo" width="25px" height="28px" /></button>
              </li>
              <li>< a class="p" href="/logout">Logout</a></li>
              <li><a class="p" href="/profile">{sessionStorage.getItem("name")}'s Profile</a></li>
              <li><a href="/notification" class="notification"><span>Notifications</span><span class="badge">{sessionStorage.getItem("l")}</span></a></li>
            </ul>
          </div>
        </HashRouter>

      </div>
    )
  }

}

export default Nav;