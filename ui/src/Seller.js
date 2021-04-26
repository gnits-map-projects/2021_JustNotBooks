import React, { Component } from "react";
import Nav from "./Nav.js"
import "./Buyer.css"
import "./Seller.css"

import swal from 'sweetalert'
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';

init("user_eQuTDdOKVg6qHspQzBx7u");


const admin = {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
}

const table = {
    top:'20%',
    left:'40%'
}

class Seller extends Component {

    constructor(props) {
        super(props);
         this.state={
           s:[],
           t:[],
           filter: "",
           returnedAt:'',
           customerNote:'',
           ownerNote:''
           }
        var today;
        today=new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        this.state.returnedAt = yyyy+'-'+mm+'-'+dd;
    }

       handleDelete(owner,id){

        var s=this.state.s;
        var body = {
          owner:owner,
          id:id,
      }
        const url = 'http://localhost:9000/delete'
          let headers = new Headers();

          headers.append('Content-Type', 'application/json');
          headers.append('Accept', 'application/json');

          headers.append('Access-Control-Allow-origin', url);
          headers.append('Access-Control-Allow-Credentials', 'true');

          headers.append('GET','POST');

          fetch(url,{
              headers: headers,
              method: 'POST',
              body:JSON.stringify(body)
          })
          .then(response => {
            if(response.ok){
              swal({title: "Good job", text: "Item deleted successfully!", icon:
                  "success"}).then(function(){
                    window.location.reload();
                    }
                  );
            }
          })


      }

    renderResultRows(){

        let s=this.state.s
        let n
        sessionStorage.setItem("price",this.state.s.price);
        sessionStorage.setItem("address",this.state.s.address);
        sessionStorage.setItem("description",this.state.s.description);
        sessionStorage.setItem("category",this.state.s.category);
        sessionStorage.setItem("id",this.state.s.id);

        return s.map((item,id) => {
           //console.log(i,typeof(i))
           if(item.customer==null){
             let img="/pictures/"+item.image
            return (

                <tr id={id} class="tr">

                    <td >{item.itemName}</td>
                    <td><img src={img} width="200px" height="200px" /></td>
                    <td >{item.price}</td>
                    <td >{item.description}</td>
                    <td>{item.fromDate}</td>
                    <td>{item.toDate}</td>
                    <td >{item.customer}</td>
                    <td>{item.category}</td>
                    <td >{item.address}</td>
                    <td >{item.status}</td>
                    <td><button onClick={() => this.handleDelete(sessionStorage.getItem("name"),item.id)} > Delete </button></td>
                    <td><button onClick={() => window.location.href="./editItem/"+parseInt(item.id)} > Edit </button></td>
                     </tr>
            );

            }
            else{
              let img="/pictures/"+item.image
              return (
                <tr id={id} class="tr">

                    <td >{item.itemName}</td>
                    <td><img src={img} width="200px" height="200px" /></td>
                    <td >{item.price}</td>
                    <td >{item.description}</td>
                    <td>{item.fromDate}</td>
                    <td>{item.toDate}</td>
                    <td >{item.customer}</td>
                    <td>{item.category}</td>
                    <td >{item.address}</td>
                    <td >{item.status}</td>
                    <td></td><td></td>
                     </tr>
            );
            }
        });

    }
    sendFeedback (templateId, variables) {
      window.emailjs.send(
        'gmail', templateId,
        variables
        ).then(res => {
          console.log('Email successfully sent!')
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
      }
    handleReturn(customer,owner,id,toDate)
    {
      if(this.state.returnedAt>toDate)
      {
        //var pay=parseInt(this.state.returnedAt)-parseInt(toDate);
        var date1 = new Date(this.state.returnedAt);
        var date2 = new Date(toDate);

// To calculate the time difference of two dates
        var Difference_In_Time = date1.getTime() - date2.getTime();

// To calculate the no. of days between two dates
        var pay = Difference_In_Time / (1000 * 3600 * 24);
        var body=
        {
          customerNote:"You are charged with penalty of Rs."+pay*10+" because of late return",
          ownerNote:"Please confirm Payment",
          owner:owner,
          customer:customer
        }

        const url = 'http://localhost:9000/notification'
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-origin', url);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET','POST');

        fetch(url,{
            headers: headers,
            method: 'POST',
            body:JSON.stringify(body)
        })
        .then(response => {
          if(response.ok){
            emailjs.send("service_vclyh4x","template_9ghmwb3",
          {
           your_name: sessionStorage.getItem("name"),
           from_name: "JustNotBooks",
           message: "You are charged with penalty because of late return, Please check your account for more information",
           email:sessionStorage.getItem("uemail"),
           });
            const templateId = 'template_Ne4ypnOa';
            var msg="You are charged with penalty because of late return, Please check your account for more information";
            this.sendFeedback(templateId, {message_html: msg, from_name: "JustNotBooks", email: sessionStorage.getItem("uemail")})
            //alert("Notified  Successfully!!")

            //window.location.reload(false)
          }
        })
        {
          var s=this.state.s;
        var body = {
          customer:customer,
          id:id,
          returnedAt:this.state.returnedAt,
          }
        const url = 'http://localhost:9000/itemReturn'
          let headers = new Headers();

          headers.append('Content-Type', 'application/json');
          headers.append('Accept', 'application/json');

          headers.append('Access-Control-Allow-origin', url);
          headers.append('Access-Control-Allow-Credentials', 'true');

          headers.append('GET','POST');

          fetch(url,{
              headers: headers,
              method: 'POST',
              body:JSON.stringify(body)
          })
          .then(response => {
            if(response.ok){
              emailjs.send("service_vclyh4x","template_9ghmwb3",
          {
           your_name: sessionStorage.getItem("name"),
           from_name: "JustNotBooks",
           message: "Thanks for Returning",
           email:sessionStorage.getItem("uemail"),
           });
              const templateId = 'template_Ne4ypnOa';
              //this.sendFeedback(templateId, {message_html: "Thanks for Returning", from_name: "JustNotBooks", email: sessionStorage.getItem("uemail")})
              //alert("Item returned Successfully!!")
              // swal("Good job!","Item returned successfully!","success");
              // window.location.reload(false)
              swal({title: "Good job", text: "Item returned successfully!", icon:
                  "success"}).then(function(){
                    window.location.reload();
                    }
                  );
            }
          })

        }
        }
        else{
          var s=this.state.s;
          var body = {
            customer:customer,
            id:id,
            returnedAt:this.state.returnedAt,
            }
          const url = 'http://localhost:9000/itemReturn'
            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');

            headers.append('Access-Control-Allow-origin', url);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET','POST');

            fetch(url,{
                headers: headers,
                method: 'POST',
                body:JSON.stringify(body)
            })
            .then(response => {
              if(response.ok){
                const templateId = 'template_Ne4ypnOa';
                this.sendFeedback(templateId, {message_html: "Thanks for Returning", from_name: "JustNotBooks", email: sessionStorage.getItem("uemail")})
                //alert("Item returned Successfully!!")
                // swal("Good job!","Item returned successfully!","success");
                // //swal({title:"Good job!",text:"Item returned successfully!",type:"success",timer:5000});
                // window.location.reload(false)
                swal({title: "Good job", text: "Item returned successfully!", icon:
                  "success"}).then(function(){
                    window.location.reload();
                    }
                  );
              }
            })

        }

    }
    renderResultTaken(){

      let t=this.state.t
      let n

      return t.map((item,id) => {
         //console.log(i,typeof(i))
         let img="/pictures/"+item.image
         if(item.category=="borrow")
         {
          return (
            <tr id={id} class="tr">
                <td >{item.itemName}</td>
                <td><img src={img} width="200px" height="200px" /></td>
                <td >{item.price}</td>
                <td >{item.description}</td>
                <td>{item.fromDate}</td>
                <td>{item.toDate}</td>
                <td >{item.owner}</td>
                <td>{item.category}</td>
                <td >{item.address}</td>
                <td >{item.status}</td>
                <td><button onClick={event =>  window.location.href='./Feedback'} > Feedback</button></td>
                <td><button onClick={() => this.handleReturn(sessionStorage.getItem("name"),item.owner,item.id,item.toDate)} > Return </button></td><td></td>
                 </tr>
          );
         }

          else
          {
            return (
              <tr id={id} class="tr">

                  <td >{item.itemName}</td>
                  <td><img src={img} width="200px" height="200px" /></td>
                  <td >{item.price}</td>
                  <td >{item.description}</td>
                  <td>{item.fromDate}</td>
                  <td>{item.toDate}</td>
                  <td >{item.owner}</td>
                  <td>{item.category}</td>
                  <td >{item.address}</td>
                  <td >{item.status}</td><td></td><td></td>

                   </tr>
          );
          }
      });


  }
  taken(){
    const url = "http://localhost:9000/itemtaken";

    var body = {
      customer:sessionStorage.getItem("name"),
  }
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');

    headers.append('Access-Control-Allow-origin',url);
    headers.append('Access-Control-Allow-Credentials','true');

    headers.append('POST','GET');

     fetch(url,{
        headers:headers,
        method: 'POST',
        body:JSON.stringify(body)
        })
        .then(response=>{
            return response.json()
        }).then(res=>{this.setState({t:res})
        //console.log(this.state.t)
    })



}

    items(){
      const url = "http://localhost:9000/itemupload";

      var body = {
        owner:sessionStorage.getItem("name"),
      }
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      headers.append('Accept','application/json');

      headers.append('Access-Control-Allow-origin',url);
      headers.append('Access-Control-Allow-Credentials','true');

      headers.append('POST','GET');

       fetch(url,{
          headers:headers,
          method: 'POST',
          body:JSON.stringify(body)
          })
          .then(response=>{
              return response.json()
          }).then(res=>{this.setState({s:res})

      })


    }
        componentDidMount(){
          this.items()
          this.taken()
        }

        render() {


            return (
              <div>

              <div class="admin">
                <Nav/>

            <h1><b>Items Uploaded</b></h1>
            <div className="uploadTable">

                   <div>
                    <table id="product" class="w3-table-all">
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Customer</th>
                        <th>Category</th>
                        <th>Address</th>
                        <th>Status</th>
                     <tbody> {this.renderResultRows()} </tbody>
                    </table>
                    </div>
                </div>
                <br></br>
                <br></br>
                <h1><b>Items Taken</b></h1>
                  <div className="uploadTable">

                    <table id="product" class="w3-table-all">
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Owner</th>
                        <th>Category</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Feedback</th>
                     <tbody> {this.renderResultTaken()} </tbody>
                    </table>
                    </div>

                </div>
                </div>
            )
        }
}

export default Seller;