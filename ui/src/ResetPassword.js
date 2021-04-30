import React, { Component} from "react";
import "./edit.css"
import swal from 'sweetalert'
import emailjs from 'emailjs-com'
import{ init } from 'emailjs-com';

init("user_eQuTDdOKVg6qHspQzBx7u");

export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
      
          oldPswd:'',
          newPswd:'',
          errors: {
            password: '',
          }
    
    
        }
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleNewPswdChange=this.handleNewPswdChange.bind(this)
        this.handleOldPswdChange=this.handleOldPswdChange.bind(this)
        

    }
    
    handleNewPswdChange=event=>{
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
      handleOldPswdChange=event=>{
        this.setState({
          oldPswd : event.target.value
        });
        
      }
    
       
      handleUpdate(event) {
        
            event.preventDefault();
            console.log(this.state)
            var body = {
              name:this.state.name,
              oldPswd:this.state.oldPswd,
              newPswd:this.state.newPswd
            }
            console.log(body);
            if(this.state.oldPswd==""){
              alert('Please enter the password')

            }
            else if (this.state.oldPswd==""){
              alert('Please confirm the password')
            }
            else if(this.state.cpswd!=this.state.pswd){
              alert('confirm password does not matched')
            }
            
            else{
    
                const url = "http://localhost:9000/editPassword";
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
                .then(response => {if(response.ok){
                    const templateId = 'template_Ne4ypnOa';
                    this.sendFeedback(templateId, {message_html: "Your Password has been changed", from_name: "JustNotBooks", email: sessionStorage.getItem("uemail")})
                    //alert("Password Changed")
                    swal("Good Job!","Password Changed Successfully!","success")
                     this.props.history.push("/profile");
                     }
                    else {
                      //alert("Old Password does not matched")
                      swal("Good Job!","Password Changed Successfully! This window will be closed","success")
                      
                      emailjs.send("service_vclyh4x","template_9ghmwb3",
            {
             your_name: this.state.name,
             from_name: "JustNotBooks",
             message: "Your password is successfully reset",
             email:this.state.email,
             });
                  
                  }
               })
              }
               
        }
  render(){

      return(
        <div>
		<div className="edit">
      
				<form >
					<h2>RESET Password</h2>
          
					
					
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
                      
			
					<input type="submit" value="Update" onClick={this.handleUpdate}/>
          <p><a href ="/login">Login here</a></p>
                    
				</form>
			</div>
      </div>
      
      );
    }
}
export default ResetPassword;