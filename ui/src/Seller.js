import React, { Component } from "react";
import Nav from "./Nav.js"
import "./Buyer.css"
import "./Seller.css"

import swal from 'sweetalert'
import emailjs from 'emailjs-com'
import { init } from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
init("user_eQuTDdOKVg6qHspQzBx7u");

const admin = {
  width: '100%',
  height: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
}

const table = {
  top: '20%',
  left: '40%'
}

class Seller extends Component {

  constructor(props) {
    super(props);
    this.state = {
      s: [],
      t: [],
      filter: "",
      returnedAt: '',
      customerNote: '',
      ownerNote: '',
      sortBy: {
        'price': 'asc',
        'rate2': 'asc',
        'rate1': 'asc',
        'fromDate': 'asc',
        'toDate': 'asc',
      }
    }
    this.handleSort1 = this.handleSort1.bind(this);
    this.handleSort2 = this.handleSort2.bind(this);
    this.handlefeedback = this.handlefeedback.bind(this);
    var today;
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    this.state.returnedAt = yyyy + '-' + mm + '-' + dd;
  }

  confirmDialog(owner, id) {
    if (window.confirm('Are you sure to delete the product?')) {
      this.handleDelete(owner, id)
      console.log('Deleting product.');
    } else {
      // Do nothing!
      console.log('Not deleting the product');
    }

  }
  handlefeedback(itemName) {
    //window.location.href = './Feedback'
    sessionStorage.setItem("feedbackname", itemName);
    window.location.href = './Feedback'

  }

  handleDelete(owner, id) {

    var s = this.state.s;
    var body = {
      owner: owner,
      id: id,
    }
    const url = 'http://localhost:9000/delete'
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-origin', url);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST');

    fetch(url, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          swal({
            title: "Good job", text: "Item deleted successfully!", icon:
              "success"
          }).then(function () {
            window.location.reload();
          }
          );
        }
      })


  }
  handleSort1(event, colId) {
    const sortOrder = this.state.sortBy[colId] == 'asc' ? 'desc' : 'asc';
    const sortedData = this.state.s.sort(this.compare(colId, sortOrder));
    console.log('sortedData >>', sortedData);
    if (colId == 'price') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'price': sortOrder }, 's': sortedData });
    }
    if (colId == 'rate1') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'rate1': sortOrder }, 's': sortedData });
    }
    if (colId == 'rate2') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'rate2': sortOrder }, 's': sortedData });
    }
    if (colId == 'fromDate') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'fromDate': sortOrder }, 's': sortedData });
    }
    if (colId == 'toDate') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'toDate': sortOrder }, 's': sortedData });
    }
  }

  handleSort2(event, colId) {
    const sortOrder = this.state.sortBy[colId] == 'asc' ? 'desc' : 'asc';
    const sortedData = this.state.t.sort(this.compare(colId, sortOrder));
    console.log('sortedData >>', sortedData);
    if (colId == 'price') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'price': sortOrder }, 't': sortedData });
    }
    if (colId == 'fromDate') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'fromDate': sortOrder }, 't': sortedData });
    }
    if (colId == 'toDate') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'toDate': sortOrder }, 't': sortedData });
    }
  }

  setNull(a, b, key) {
    a[key] = a[key] === null ? "" : a[key]
    b[key] = b[key] === null ? "" : b[key]
  }
  revertNull(a, b, key) {
    a[key] = a[key] === "" ? null : a[key]
    b[key] = b[key] === "" ? null : b[key]
  }

  compare(key, sortOrder) {
    return ((a, b) => {
      this.setNull(a, b, key);
      if (sortOrder == 'asc') {
        if (a[key] < b[key]) {
          this.revertNull(a, b, key);
          return -1;
        }
        if (a[key] > b[key]) {
          this.revertNull(a, b, key);
          return 1;
        }
      } else if (sortOrder == 'desc') {
        if (a[key] < b[key]) {
          this.revertNull(a, b, key);
          return 1;
        }
        if (a[key] > b[key]) {
          this.revertNull(a, b, key);
          return -1;
        }
      }
      return 0;
    })
  }
  renderResultRows() {

    let s = this.state.s
    let n
    sessionStorage.setItem("price", this.state.s.price);
    sessionStorage.setItem("address", this.state.s.address);
    sessionStorage.setItem("description", this.state.s.description);
    sessionStorage.setItem("category", this.state.s.category);
    sessionStorage.setItem("id", this.state.s.id);
    //sessionStorage.setItem("feedbackname",this.state.s.itemName);


    return s.map((item, id) => {
      //console.log(i,typeof(i))
      // sessionStorage.setItem("feedbackname", item.itemName);
      if (item.customer == null) {
        let img = "/pictures/" + item.image
        return (

          <tr id={id} class="tr">

            <td >{item.itemName}</td>
            <td><img class="image" src={img} /></td>
            <td >{item.price}</td>
            <td >{item.description}</td>
            <td>{item.fromDate}</td>
            <td>{item.toDate}</td>
            <td >{item.customer}</td>
            <td>{item.category}</td>
            <td >{item.address}</td>
            <td >{item.status}</td>
            <td>{item.rate2 === null ? "No rating available" : item.rate2}</td>
            <td>{item.rate1 === null ? "No rating available" : item.rate1}</td>
            <td>{item.review === null ? "No review available" : item.review}</td>
            <td><button onClick={() => this.confirmDialog(sessionStorage.getItem("name"), item.id)} > Delete </button></td>
            <td><button onClick={() => window.location.href = "./editItem/" + parseInt(item.id)} > Edit </button></td>
          </tr>
        );

      }
      else {
        let img = "/pictures/" + item.image
        return (
          <tr id={id} class="tr">

            <td >{item.itemName}</td>
            <td><img class="image" src={img} /></td>
            <td >{item.price}</td>
            <td >{item.description}</td>
            <td>{item.fromDate}</td>
            <td>{item.toDate}</td>
            <td >{item.customer}</td>
            <td>{item.category}</td>
            <td >{item.address}</td>
            <td >{item.status}</td>
            <td>{item.rate2 === null ? "No rating available" : item.rate2}</td>
            <td>{item.rate1 === null ? "No rating available" : item.rate1}</td>
            <td>{item.review === null ? "No review available" : item.review}</td>
            <td></td><td></td>
          </tr>
        );
      }
    });

  }
  sendFeedback(templateId, variables) {
    window.emailjs.send(
      'gmail', templateId,
      variables
    ).then(res => {
      console.log('Email successfully sent!')
    })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }
  handleReturn(customer, owner, id, toDate) {
    if (this.state.returnedAt > toDate) {
      //var pay=parseInt(this.state.returnedAt)-parseInt(toDate);
      var date1 = new Date(this.state.returnedAt);
      var date2 = new Date(toDate);

      // To calculate the time difference of two dates
      var Difference_In_Time = date1.getTime() - date2.getTime();

      // To calculate the no. of days between two dates
      var pay = Difference_In_Time / (1000 * 3600 * 24);
      var body =
      {
        customerNote: "You are charged with penalty of Rs." + pay * 10 + " because of late return",
        ownerNote: "Please confirm Payment",
        owner: owner,
        customer: customer
      }

      const url = 'http://localhost:9000/notification'
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      headers.append('Access-Control-Allow-origin', url);
      headers.append('Access-Control-Allow-Credentials', 'true');

      headers.append('GET', 'POST');

      fetch(url, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            emailjs.send("service_vclyh4x", "template_9ghmwb3",
              {
                your_name: sessionStorage.getItem("name"),
                from_name: "JustNotBooks",
                message: "You are charged with penalty because of late return, Please check your account for more information",
                email: sessionStorage.getItem("uemail"),
              });
            const templateId = 'template_Ne4ypnOa';
            var msg = "You are charged with penalty because of late return, Please check your account for more information";
            //this.sendFeedback(templateId, {message_html: msg, from_name: "JustNotBooks", email: sessionStorage.getItem("uemail")})
            //alert("Notified  Successfully!!")

            //window.location.reload(false)
          }
        })
      {
        var s = this.state.s;
        var body = {
          customer: customer,
          id: id,
          returnedAt: this.state.returnedAt,
        }
        const url = 'http://localhost:9000/itemReturn'
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-origin', url);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST');

        fetch(url, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify(body)
        })
          .then(response => {
            if (response.ok) {
              emailjs.send("service_vclyh4x", "template_9ghmwb3",
                {
                  your_name: sessionStorage.getItem("name"),
                  from_name: "JustNotBooks",
                  message: "Thanks for Returning",
                  email: sessionStorage.getItem("uemail"),
                });
              // const templateId = 'template_Ne4ypnOa';
              //this.sendFeedback(templateId, {message_html: "Thanks for Returning", from_name: "JustNotBooks", email: sessionStorage.getItem("uemail")})
              //alert("Item returned Successfully!!")
              // swal("Good job!","Item returned successfully!","success");
              // window.location.reload(false)
              swal({
                title: "Good job", text: "Item returned successfully!", icon:
                  "success"
              }).then(function () {
                window.location.reload();
              }
              );
            }
          })

      }
    }
    else {
      var s = this.state.s;
      var body = {
        customer: customer,
        id: id,
        returnedAt: this.state.returnedAt,
      }
      const url = 'http://localhost:9000/itemReturn'
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      headers.append('Access-Control-Allow-origin', url);
      headers.append('Access-Control-Allow-Credentials', 'true');

      headers.append('GET', 'POST');

      fetch(url, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            emailjs.send("service_vclyh4x", "template_9ghmwb3",
              {
                your_name: sessionStorage.getItem("name"),
                from_name: "JustNotBooks",
                message: "Thanks for Returning",
                email: sessionStorage.getItem("uemail"),
              });
            //const templateId = 'template_Ne4ypnOa';
            //this.sendFeedback(templateId, {message_html: "Thanks for Returning", from_name: "JustNotBooks", email: sessionStorage.getItem("uemail")})
            //alert("Item returned Successfully!!")
            // swal("Good job!","Item returned successfully!","success");
            // //swal({title:"Good job!",text:"Item returned successfully!",type:"success",timer:5000});
            // window.location.reload(false)
            swal({
              title: "Good job", text: "Item returned successfully!", icon:
                "success"
            }).then(function () {
              window.location.reload();
            }
            );
          }
        })

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      headers.append('Access-Control-Allow-origin', url);
      headers.append('Access-Control-Allow-Credentials', 'true');

      headers.append('GET', 'POST');

      fetch(url, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            const templateId = 'template_Ne4ypnOa';
            this.sendFeedback(templateId, { message_html: "Thanks for Returning", from_name: "JustNotBooks", email: sessionStorage.getItem("uemail") })
            swal({
              title: "Good job", text: "Item returned successfully!", icon:
                "success"
            }).then(function () {
              window.location.reload();
            }
            );
          }
        })

    }

  }
  renderResultTaken() {

    let t = this.state.t
    let n
    //sessionStorage.setItem("feedbackname", this.state.itemName);
    return t.map((item, id) => {
      console.log(id)
      let img = "/pictures/" + item.image
      //sessionStorage.setItem("feedbackname", item.itemName);
      if (item.category == "borrow") {
        return (
          <tr id={id} class="tr">
            <td >{item.itemName}</td>
            <td><img class="image" src={img} /></td>
            <td >{item.price}</td>
            <td >{item.description}</td>
            <td>{item.fromDate}</td>
            <td>{item.toDate}</td>
            <td >{item.owner}</td>
            <td>{item.category}</td>
            <td >{item.address}</td>
            <td >{item.status}</td>
            <td><button onClick={() => this.handlefeedback(item.itemName)} >Feedback</button></td>
            <td><button onClick={() => this.handleReturn(sessionStorage.getItem("name"), item.owner, item.id, item.toDate)} > Return </button></td><td></td>
          </tr>
        );
      }

      else {
        return (
          <tr id={id} class="tr">

            <td >{item.itemName}</td>
            <td><img class="image" src={img} /></td>
            <td >{item.price}</td>
            <td >{item.description}</td>
            <td>{item.fromDate}</td>
            <td>{item.toDate}</td>
            <td >{item.owner}</td>
            <td>{item.category}</td>
            <td >{item.address}</td>
            <td >{item.status}</td>
            <td><button onClick={() => this.handlefeedback(item.itemName)} > Feedback</button></td>
            {/*<td><button onClick={event => window.location.href = './Feedback'} > Feedback</button></td>*/}
            <td></td>

          </tr>


        );
      }
    });


  }
  taken() {
    const url = "http://localhost:9000/itemtaken";

    var body = {
      customer: sessionStorage.getItem("name"),
    }
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
        return response.json()
      }).then(res => {
        this.setState({ t: res })
        //console.log(this.state.t)
      })



  }

  items() {
    const url = "http://localhost:9000/itemupload";

    var body = {
      owner: sessionStorage.getItem("name"),
    }
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
        return response.json()
      }).then(res => {
        this.setState({ s: res })

      })


  }
  componentDidMount() {
    this.items()
    this.taken()
  }

  render() {


    return (
      <div>

        <div class="admin">
          <Nav />

          <h1><b>Items Uploaded</b></h1>
          <div className="uploadTable">

            <div>
              <table id="product" class="w3-table-all">
                <th>Name</th>
                <th>Image</th>
                <th>Price
                        <span className="sortIcon" onClick={(e) => this.handleSort1(e, 'price')}>
                    {this.state.sortBy['price'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
                  </span>
                </th>
                <th>Description</th>
                <th>From
            <span className="sortIcon" onClick={(e) => this.handleSort1(e, 'fromDate')}>
                    {this.state.sortBy['fromDate'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
                  </span>
                </th>
                <th>To
            <span className="sortIcon" onClick={(e) => this.handleSort1(e, 'toDate')}>
                    {this.state.sortBy['toDate'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
                  </span>
                </th>
                <th>Customer</th>
                <th>Category</th>
                <th>Address</th>
                <th>Status</th>
                <th>Your Rating
            <span className="sortIcon" onClick={(e) => this.handleSort1(e, 'rate2')}>
                    {this.state.sortBy['rate2'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
                  </span>
                </th>
                <th>Item Rating
            <span className="sortIcon" onClick={(e) => this.handleSort1(e, 'rate1')}>
                    {this.state.sortBy['rate1'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
                  </span>
                </th>
                <th>Item Review</th>
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
              <th>Price
                        <span className="sortIcon" onClick={(e) => this.handleSort2(e, 'price')}>
                  {this.state.sortBy['price'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
                </span>
              </th>
              <th>Description</th>
              <th>From
            <span className="sortIcon" onClick={(e) => this.handleSort2(e, 'fromDate')}>
                  {this.state.sortBy['fromDate'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
                </span>
              </th>
              <th>To
            <span className="sortIcon" onClick={(e) => this.handleSort2(e, 'toDate')}>
                  {this.state.sortBy['toDate'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
                </span>
              </th>
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