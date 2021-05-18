import React from "react";
import "./edit.css"
import Nav from "./Nav.js"
import swal from 'sweetalert'
import emailjs from 'emailjs-com'
import { init } from 'emailjs-com';

init("user_eQuTDdOKVg6qHspQzBx7u");

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validMobileRegex = RegExp(/^[6-9]{1}[0-9]{9}$/);

var n = sessionStorage.getItem("uname")
var e = sessionStorage.getItem("uemail")
var ph = sessionStorage.getItem("uphone")
var ad = sessionStorage.getItem("address")
console.log("Name", n);
console.log("Address", ad);
export class Edit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      n: false,
      e: false,
      ph: false,
      ad: false,
      email: e,
      phoneNumber: ph,
      name: n,
      address: ad,
      cpswd: '',
      errors: {
        name: '',
        email: '',
        address: '',
        mobile: '',
      }

    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state.name = sessionStorage.getItem("name")
  }

  componentDidMount() {
    this.setState({
      name: sessionStorage.getItem("uname"),
      email: sessionStorage.getItem("uemail"),
      address: sessionStorage.getItem("address"),
      phoneNumber: sessionStorage.getItem("uphone"),
    })

  }
  /*handleNameChange = event => {
   this.setState({
       n:true,
       name : event.target.value
     });
 }*/

  handleEmailChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.email =
      validEmailRegex.test(event.target.value)
        ? ''
        : 'Email is not valid!';
    console.log(errors.email)
    if (errors.email == '') {
      this.setState({ e: true });
    }
    this.setState({ errors, [name]: value });

  }
  handlePhoneNumberChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.mobile =
      (validMobileRegex.test(event.target.value))
        ? ''
        : 'Enter a valid phone number!';
    if (errors.mobile == '') {
      this.setState({ ph: true });
    }
    this.setState({ errors, [name]: value });

  }


  handleAddressChange = event => {
    this.setState({
      address: event.target.value
    });
  }
  handleCancel() {
    //window.location.href="/home";
    window.history.back();
  }
  handleUpdate(event) {

    event.preventDefault();
    console.log(this.state)
    var body = {
      name: sessionStorage.getItem("name"),
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      email: this.state.email,
    }
    console.log(body);



    const url = "http://localhost:9000/edit";
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
      .then(response => response.json())
      .then(contents => {
        console.log(contents);

      })
      .catch(() => console.log("can't access " + url + " response. "))


    //alert('Details are updated successful');
    swal({ title: "Good job!", text: 'Details are updated successfully', icon: "success", timer: 3000, closeOnClickOutside: false, });
    this.props.history.push("./profile");
    emailjs.send("service_vclyh4x", "template_9ghmwb3",
      {
        your_name: sessionStorage.getItem("name"),
        from_name: "JustNotBooks",
        message: "Your Details are updated",
        email: this.state.email,
      });



  }




  render() {
    const { errors } = this.state;
    return (
      <div><Nav />
        <div className="edit">

          <form onSubmit={this.displayLogin}>
            <h2>Edit User Details</h2>

            <div className="name">
              Name:{sessionStorage.getItem("name")}
            </div>
            <div className="email">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleEmailChange} required
              />
              <span className='error'>{errors.email}</span>
            </div>
            <div className="phoneNumber">
              <input
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handlePhoneNumberChange} required
              />
              <span className='error'>{errors.mobile}</span>
            </div>
            <div className="address">
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={this.state.address}
                onChange={this.handleAddressChange} required
              />
            </div>


            <input type="submit" value="Update" onClick={this.handleUpdate} />
            <input type="submit" value="Cancel" onClick={this.handleCancel} />
          </form>
        </div>
      </div>

    );
  }
}


export default Edit;