import React, { Component} from "react";
import { Redirect,useHistory } from "react-router-dom";
import  "./profile.css"
import Nav from "./Nav.js"

class Profile extends Component {
    constructor(props) {
      super(props);

      
      this.state={
      
        phoneNumber:'',
        name : '',
        email: ' ',
        address: ' ',
        pswd:' ',
  
      }

      this.handleNameChange=this.handleNameChange.bind(this)
      this.handleEmailChange=this.handleEmailChange.bind(this)
      this.handlePhoneChange=this.handlePhoneChange.bind(this)
      this.handleAddressChange=this.handleAddressChange.bind(this)
      this.handleUpload=this.handleUpload.bind(this);
      this.handleEdit=this.handleEdit.bind(this);
      this.handleEditPassword=this.handleEditPassword.bind(this);
    
      //eid=this.props.match.params.id;
      //console.log(eid);
       
    
    }
    

    componentDidMount(){
      const url = "http://localhost:9000/details";
      
          let headers = new Headers();
      
            headers.append('Content-Type','application/json');
            headers.append('Accept','application/json');
      
            headers.append('Access-Control-Allow-origin',url);
            headers.append('Access-Control-Allow-Credentials','true');
    
            headers.append('POST','GET');
            var body={
                name:sessionStorage.getItem("name")
            };
            console.log(body)

           var s = fetch(url, {
              headers:headers,
              method: 'POST',
              body: JSON.stringify(body)
            }).then(response => 
              response.json().then(data => ({
                  data1: (data)
              })
          ).then(res => {
            this.setState({
               email:res.data1.email,
               phoneNumber:res.data1.phoneNumber,
               address:res.data1.address,
               pswd:res.data1.pswd
              });
              sessionStorage.setItem("uname",this.state.name);
              sessionStorage.setItem("uemail",this.state.email);
              sessionStorage.setItem("udrss",this.state.address);
              sessionStorage.setItem("upswd",this.state.pswd);
              sessionStorage.setItem("uphone",this.state.phoneNumber);
              
                      
        })); 
       
       
    }
    
      handleNameChange=event=>{
        this.setState({
          name : event.target.value
        });
      }
    
      handleEmailChange=event=>{
        this.setState({
          email: event.target.value
        });
      }
    
      handlePhoneChange=event=>{
        this.setState({
          phoneNumber: event.target.value
        });
      }
     handleAddressChange=event=>{
            this.setState({
              address : event.target.value
            });
          }
    handleUpload=event=>{
        //event.preventDefault();
        //alert("Clicked")
        this.props.history.push("/upload");
      
    }
    handleEdit=event=>{
      this.props.history.push("/edit");
  }

  handleEditPassword(){
    this.props.history.push("/editPswd");
  }
    render() {
      
      return (
       
        <div> <Nav/>
      <div className="profilemain">
      
        <h1><div align ="center"> My Profile</div></h1>
        
				<form onSubmit={this.displayLogin}>
                  
                    <div class="row">
                        <div class="collabel">
                              <h4>Name:{sessionStorage.getItem("name")}</h4>
                        </div>
                        </div>
                      <div class="row">
                        <div class="collabel">
                            <h4>Email:{sessionStorage.getItem("uemail")}</h4>
                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="collabel">
                          <h4>Phone Number:{sessionStorage.getItem("uphone")}</h4>
                        </div>
                      </div>
                      <div class="row">
                                              <div class="collabel">
                                                    <h4>Address:{sessionStorage.getItem("udrss")}</h4>
                                              </div>
                                              </div>
                </form>


        
        <input type="submit" value="Edit Details" onClick={this.handleEdit}></input>
        <input type="submit" value="Reset Password" onClick={this.handleEditPassword}></input>
        <input type="submit" value="Upload" onClick={this.handleUpload}></input>
      </div>
      </div>);
  }
}
  // ReactDOM.render(
  //   <Contact />,
  //   mountNode
  // );
  export default Profile;
  