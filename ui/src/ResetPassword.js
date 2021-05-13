import React, { Component } from "react";
import "./edit.css"

import swal from 'sweetalert'
import emailjs from 'emailjs-com'
import { init } from 'emailjs-com';

init("user_eQuTDdOKVg6qHspQzBx7u");

export class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          
          oldPswd:'',
          newPswd:'',
          name : '',
          errors: {
            password: '',
          }
    
    
        }
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleNewPswdChange=this.handleNewPswdChange.bind(this)
        this.handleOldPswdChange=this.handleOldPswdChange.bind(this)
        this.handleNameChange=this.handleNameChange.bind(this)
        this.handleok=this.handleok.bind(this)
        

    }
    

  
  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  }
  handleNewPswdChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.password =
      event.target.value.length < 8
        ? 'Password must be 8 characters long!'
        : '';
    if (errors.password == '') {
      this.setState({ p: true });
    }
    this.setState({ errors, [name]: value });

  }
  handleOldPswdChange = event => {
    this.setState({
      oldPswd: event.target.value
    });

  }


  handleUpdate(event) {

    event.preventDefault();
    console.log(this.state)

    var body = {
      name: this.state.name,
      oldPswd: this.state.oldPswd,
      newPswd: this.state.newPswd
    }
    console.log(body);
    const url = "http://localhost:9000/editPassword";
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
        if (response.ok) {

          swal("Good Job!", "Password Changed Successfully!", "success")
          this.props.history.push("/profile");
          emailjs.send("service_vclyh4x", "template_9ghmwb3",
            {
              your_name: sessionStorage.getItem("name"),
              from_name: "JustNotBooks",
              message: "Your password is successfully reset",
              email: sessionStorage.getItem("uemail"),
            });
          return response.text()
            .then(res => {
              console.log(res)
              window.location.href = "/Login";
            })
          //return window here

        }
        else {
          //alert("Old Password does not matched")
          swal("Sorry", "Error occured while processing your request", "error")
        }
      })

  }
  render() {

    return (
      <div>
        <div className="edit">

          <form >
            <h2>RESET Password</h2>
            <div className="name">
              <input
                type="text"
                placeholder="User Name"
                name="name"
                value={this.state.name}
                onChange={this.handleNameChange} required

              />
            </div>


            <div className="oldPswd">
              <input
                type="password"
                placeholder="Password"
                name="oldPswd"
                value={this.state.oldPswd}
                onChange={this.handleOldPswdChange} required
              />

            </div>
            <div className="newPswd">
              <input
                type="password"
                placeholder="Confirm Password"
                name="newPswd"
                value={this.state.newPswd}
                onChange={this.handleNewPswdChange} required
              />
              <span className='error'>{this.state.errors.password}</span>
            </div>


            <input type="submit" value="Update" onClick={this.handleUpdate} />
            <p><a href="/login">Login here</a></p>

          </form>
        </div>
      </div>

    );
  }
}
export default ResetPassword;
/*return response.text()
                      .then(res=> {
                        console.log(res)
                        window.location.href="/Login";
                    })*/