import React from "react";
import swal from 'sweetalert'

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "./login.css";

export class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      pswd: '',
      name: '',

    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  }

  handlePasswordChange = event => {
    this.setState({
      pswd: event.target.value
    });
  }
  handleCancel(event) {
    window.history.back();
    // this.props.history.push("/");
  }

  handleSubmit = event => {
    event.preventDefault();
    //console.log(this.state)
    var body = {
      pswd: this.state.pswd,
      name: this.state.name,
    }
    //console.log(body);
    if (this.state.name == "") {
      alert('Please enter the name')

    }
    else if (this.state.pswd == "") {
      alert('Please enter the password')
    }
    else {
      const url = "http://localhost:9000/personVal";
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      headers.append('Access-Control-Allow-origin', url);
      headers.append('Access-Control-Allow-Credentials', 'true');

      headers.append('POST', 'GET');

      fetch(url, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.redirected) {
            //UserProfile.setName(this.state.name);
            sessionStorage.setItem("name", this.state.name)
            //alert(sessionStorage.getItem("name"))
            // window
            this.props.history.push("/home");


            //window.location.href="/main";
          }
          else {
            //alert("Invalid Credentials")
            swal("Error", "Invalid Credentials", "error")
            //swal({title:"Error!!",text:"Invalid Credentials",type:"success",timer:5000});
          }
        })
    }
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.displayLogin}>
          <h2>Login</h2>
          <div className="username">
            <input
              type="text"
              placeholder="Username..."
              value={this.state.name}
              onChange={this.handleNameChange}
              name="name"
            />
          </div>

          <div className="password">
            <input
              type="password"
              placeholder="Password..."
              value={this.state.pswd}
              onChange={this.handlePasswordChange}
              name="pswd"
            />
          </div>

          <input type="submit" value="Login" onClick={this.handleSubmit} />
          <input type="submit" value="Reset" onClick={this.handleCancel} />
        </form>

        <a href="/">Create an account</a>
        <div><a href="/ResetPassword" >Forgot Password?</a></div>
      </div>
    );
  }
}
export default Login;