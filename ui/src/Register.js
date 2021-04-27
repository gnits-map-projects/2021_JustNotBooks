import React from "react";
import "./register.css";
import swal from 'sweetalert'
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';

init("user_eQuTDdOKVg6qHspQzBx7u");
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validMobileRegex = RegExp(/^[6-9]{1}[0-9]{9}$/);

export class Register extends React.Component {

  constructor(props) {
    super(props);
      
    this.state={

      e:false,
      p:false,
      ph:false,
      email:'',
      phoneNumber:'',
      pswd : '',
      name : '',
      cpswd : '',
      errors: {
        name: '',
        email: '',
        password: '',
        mobile : '',
      }

    }
    this.handleNameChange=this.handleNameChange.bind(this)
    this.handleEmailChange=this.handleEmailChange.bind(this)
    this.handlePhoneNumberChange=this.handlePhoneNumberChange.bind(this)
	  this.handlePasswordChange=this.handlePasswordChange.bind(this)
	  this.handleConfirmPasswordChange=this.handleConfirmPasswordChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleCancel=this.handleCancel.bind(this)
	
  }
  
  handleNameChange=event=>{
    this.setState({
      name : event.target.value
    });
  }
  handleEmailChange=event=>{
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.email = 
          validEmailRegex.test(event.target.value)
            ? ''
            : 'Email is not valid!';
    console.log(errors.email)
    if(errors.email ==  '')
      {
        this.setState({e : true});
     }       
     this.setState({errors, [name]: value});
    
  }
  handlePhoneNumberChange=event=>{
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.mobile = 
    (validMobileRegex.test(event.target.value))
      ? ''
      : 'Enter a valid phone number!';
   if(errors.mobile==  '')
    {
      this.setState({ph : true});
    }
    this.setState({errors, [name]: value});
    
  }

  handlePasswordChange=event=>{
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.password = 
    event.target.value.length < 8
      ? 'Password must be 8 characters long!'
      : '';
    if(errors.password ==  '')
      {
        this.setState({p : true});
      }
      this.setState({errors, [name]: value});
  }
  handleConfirmPasswordChange=event=>{
    this.setState({
      cpswd : event.target.value
    });
  }

  handleCancel(){
    //window.location.href="/home";
    window.location.reload();
  }

  handleSubmit(event) {
    
    event.preventDefault();
    console.log(this.state)
     var body = {
      pswd : this.state.pswd,
      name : this.state.name,
      phoneNumber: this.state.phoneNumber,
      email : this.state.email,
    }
    console.log(body);
    if(this.state.name==""){
      alert('Please enter the name')

    }
  else if(this.state.email==""){
    alert('Please enter the email')
}
else if(this.state.phoneNumber==""){
  alert('Please enter the phone number')
}
else if(this.state.pswd==""){
  alert('Please enter the password')
}
	else if(this.state.cpswd!=this.state.pswd){
			alert('confirm password does not matched')
	  
		  }
    else{
    

  const url = "http://localhost:9000/check";
    let headers = new Headers();
 
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
 
    headers.append('Access-Control-Allow-origin',url);
    headers.append('Access-Control-Allow-Credentials','true');
 
    headers.append('POST','GET');
 
    fetch(url, {
       headers:headers,
       method: 'POST',
       body: JSON.stringify(body)
    })
  /*.then(response => response.json())
    .then(contents => {console.log(contents); })*/
 

      .then(response => {if(response.ok){
            
        //alert('Details submitted successfully!!');
        //swal({title:"Error",text:"Details submitted successfully!!",type:"success",timer:5000});
        swal("Good Job!","Details submitted successfully!!","success")
        //this.fun.bind(this);
        this.props.history.push("/login");
            //window.location.href="/main";
            emailjs.send("service_vclyh4x","template_9ghmwb3",
            {
             your_name:this.state.name,
             from_name: "JustNotBooks",
             message: "Thanks for registering",
             email:this.state.email,
             });
      }
      else {

        
        //this.fun.bind(this);
        //alert('Username already exists!!Please try to login');
        //swal({title:"Error",text:"Username already exists!!Please try to login",type:"error",timer:5000});
        swal("Error!","Username already exists!!Please try to login","error")
        this.props.history.push("/login");

      }
      })
      .catch(()=> console.log("can't access " + url + " response. "))
        }

      }


  
  
  
  render() {
    const {errors} = this.state;
    return (
		<div className="register">
				<form onSubmit={this.displayLogin}>
					<h2>Register</h2>
					<p><b>Already Registered?  </b> <a href ="/login">Login here!</a></p>
					<div className="name">
						<input
							type="text"
							placeholder="User Name"
							name="name"
							value={this.state.name}
							onChange={this.handleNameChange} required
						/>
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


					<div className="pasword">
						<input
							type="password"
							placeholder="Password"
							name="pswd"
							value={this.state.pswd}
							onChange={this.handlePasswordChange} required
						/>
            <span className='error'>{errors.password}</span>
					</div>
					<div className="confirm pasword">
						<input
							type="password"
							placeholder="Confirm Password"
							name="cpswd"
							value={this.state.cpswd}
							onChange={this.handleConfirmPasswordChange} required
						/>
					</div>


		

					<input type="submit" value="Register" onClick={this.handleSubmit}/>
          <input type="submit" value="Cancel" onClick={this.handleCancel}/>
				</form>


			</div>
      
    );
  }
}


export default Register;