import React from "react";
import ic from './images/log.png'
import h from './images/ho.png'
import bell from './images/bellll.png'
import "./Nav.css"
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { NavLink } from "react-router-dom";
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

        <div>
          <center><h1><b>JustNotBooks-Buy.Borrow.Rent</b></h1></center>
          <ul className="header">


            <li><NavLink exact to="/home" activeClassName="active" ><img src={h} alt="home" /></NavLink></li>

            <li><NavLink exact to="/buyer" activeClassName="active">Exchanges</NavLink></li>

            <li><NavLink exact to="/seller" activeClassName="active" >Transaction</NavLink></li>

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

            <li>< a className="p" href="/survey"><img src={ic} alt="" /></a></li>
            <li><NavLink exact to="/profile" activeClassName="active" className="p">{sessionStorage.getItem("name")}'s Profile</NavLink></li>
            <li><a className="notification"><img src={bell} alt="notification" onClick={this.togglePopup.bind(this)} /><p className="badge">{sessionStorage.getItem("l")}</p></a></li>
          </ul>
          {this.state.showPopup ?
            <Popup
              closePopup={this.togglePopup.bind(this)}
            />
            : null
          }
        </div>

      </div>
    )
  }
}

export default Nav;
//<li><a class="active" href="/home"><img src={h} /></a></li>
/*<li><NavLink exact to="/buyer" style={{color: 'black', textDecoration: 'none'}} activeStyle={{backgroundColor:'red', textDecoration: 'none'}}
              >Exchanges</NavLink></li>*/