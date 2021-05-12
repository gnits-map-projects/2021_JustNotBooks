import React, { Component} from "react";
import "./forgot.css"
import swal from 'sweetalert'
import axios from 'axios';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
import { Redirect } from "react-router";

init("user_eQuTDdOKVg6qHspQzBx7u");

export class Forgot extends Component {
    constructor(props) {
        super(props);
           
    this.state={
      
        email : '',
  
      }
      axios.post('forgot',this.state.email).then(
        res=>{
          console.log(res)
        }
      ).catch(err=>{
        console.log(err);
      })
        this.handleSubmit=this.handleSubmit.bind(this)
    }
   
    handleEmailChange=event=>{
        this.setState({
          email : event.target.value
        });
      }
    handleSubmit=event=>{
        event.preventDefault();
        console.log(this.state)
     var body = {
      
      email : this.state.email,
    }
    
    if(this.state.email==""){
       alert('Please enter the email')
    }
    else{
        //this.props.history.push("/editPswd");
        swal("Good Job!","Check your email to reset your password","success")
        //window.location.href="/login";
        emailjs.send("service_vclyh4x","template_9ghmwb3",
            {
             your_name: sessionStorage.getItem("name"),
             from_name: "JustNotBooks",
             message: "Are you trying to change your JustNotBooks paasword? If yes, Click http://localhost:3000/ResetPassword to change",
             email:this.state.email,
             });
            /* const sleep = ms => new Promise(res => setTimeout(res, ms));
             (async () => {
              
              await sleep(150000000000);
              
            })();
             window.history.back();*/
    }
        
    }
     

  render(){
    
      return(
        <div className="forgot">
        <form >
            <h2>Forgot Password</h2>
            <div className="email">
						<input
              type="text"
							placeholder="Email"
							name="email"
							value={this.state.email}
                            onChange={this.handleEmailChange} required
							/>
                        </div>
            <input type="submit" value="Submit" onClick={this.handleSubmit}/>
            </form>
        </div>
            
      );
    }
}
export default Forgot;