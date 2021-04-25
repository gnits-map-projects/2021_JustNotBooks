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
            <center><h1>JustNotBooks-Buy.Borrow.Rent</h1></center>
            <ul className="header">
              <li><a href="/home"><img src={h} /></a></li>
              <li><a href="/buyer">Exchanges</a></li>
              <li><a href="/seller">Transaction</a></li>
              <li>
                <input type="search" placeholder="Search for an item" width="500px" value={this.state.search} onChange={this.handleChange} name="search" />
                <button className="btnstyle2" onClick={this.handleSubmit}><img src={search} alt="Logo" width="25px" height="25px" /></button>
              </li>
              <li>< a class="p" href="/survey"><img src={ic} /></a></li>
              <li><a class="p" href="/profile">{sessionStorage.getItem("name")}'s Profile</a></li>
              <li><a href="/notification" class="notification"><span><img src={bell}/></span><span class="badge">{sessionStorage.getItem("l")}</span></a></li>
            </ul>
          </div>
        </HashRouter>

      </div>
    )
  }

}

export default Nav;