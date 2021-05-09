import React from "react";
import { Col, Row } from "react-bootstrap";
import Nav from "./Nav.js"
import emailjs from 'emailjs-com'
import "./Buyer.css"
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

import { init } from 'emailjs-com';

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

class Buyer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      s: [],
      b: [],
      d: [],
      filter: "",
      data: [],
      st: 'buy',
      takenAt: '',
      disabled1: true,
      disabled2: false,
      disabled3: false,
      sortBy: {
        'price': 'asc',
        'rating': 'asc'
      }
    }

    this.handleSort1 = this.handleSort1.bind(this);
    this.handleSort2 = this.handleSort2.bind(this);
    this.handleSort3 = this.handleSort3.bind(this);

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
    this.state.takenAt = yyyy + '-' + mm + '-' + dd;
  }

  handleSort1(event, colId) {
    const sortOrder = this.state.sortBy[colId] == 'asc' ? 'desc' : 'asc';
    const sortedData = this.state.s.sort(this.compare(colId, sortOrder));
    console.log('sortedData >>', sortedData);
    if (colId == 'price') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'price': sortOrder }, 's': sortedData });
    }
  }

  handleSort2(event, colId) {
    const sortOrder = this.state.sortBy[colId] == 'asc' ? 'desc' : 'asc';
    const sortedData = this.state.b.sort(this.compare(colId, sortOrder));
    console.log('sortedData >>', sortedData);
    if (colId == 'price') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'price': sortOrder }, 'b': sortedData });
    }
  }

  handleSort3(event, colId) {
    const sortOrder = this.state.sortBy[colId] == 'asc' ? 'desc' : 'asc';
    const sortedData = this.state.d.sort(this.compare(colId, sortOrder));
    console.log('sortedData >>', sortedData);
    if (colId == 'price') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'price': sortOrder }, 'd': sortedData });
    }
  }

  compare(key, sortOrder) {
    return ((a, b) => {
      if (sortOrder == 'asc') {
        if (a[key] < b[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
      } else if (sortOrder == 'desc') {
        if (a[key] < b[key]) {
          return 1;
        }
        if (a[key] > b[key]) {
          return -1;
        }
      }
      return 0;
    })
  }

  handleBuy(customer, id) {

    var s = this.state.s;
    var body = {
      customer: customer,
      id: id,
      takenAt: this.state.takenAt
    }
    const url = 'http://localhost:9000/buy'
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

          const templateId = 'template_Ne4ypnOa';
          this.sendFeedback(templateId, { message_html: "Thank you for purchasing!!", from_name: "JustNotBooks", email: sessionStorage.getItem("uemail") })
          var note = "Thank you for purchasing!!"
          sessionStorage.setItem("notification", note)
          swal({
            title: "Thanks!", text: "Thank you for purchasing!", icon:
              "success"
          }).then(function () {
            window.location.reload();
          }
          );
          // window.location.reload(false)

        }
      })

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

  handleBorrow(customer, id, fromDate) {

    if (this.state.takenAt < fromDate) {
      //alert("Cannot Borrow as it is unavailable for now!!");
      swal("Error", "Cannot Borrow as it is unavailable for now!!", "error")
    }
    else {

      var s = this.state.s;
      var body = {
        customer: customer,
        id: id,
        takenAt: this.state.takenAt
      }
      const url = 'http://localhost:9000/borrow'
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
                message: "Thanks for Borrowing!! Return on time is appreciated..",
                email: sessionStorage.getItem("uemail"),
              });


            //this.sendFeedback(templateId, { message_html: "Thanks for Borrowing!! Return on time is appreciated..", from_name: "JustNotBooks", email: sessionStorage.getItem("uemail") })
            //alert("Thanks for Borrowing!! Return on time is appreciated..")
            //  swal("Thanks!","Thanks for Borrowing!! Return on time is appreciated..","success")
            // this.props.history.push("./seller");
            swal({
              title: "Thanks!", text: "Thanks for Borrowing!! Return on time is appreciated..", icon:
                "success"
            }).then(function () {
              window.location.reload();
            }
            );

          }
        })
    }



  }

  renderResultRows() {

    let s = this.state.s
    let n

    return s.map((item, id) => {
      //console.log(i,typeof(i))
      let img = "/pictures/" + item.image
      return (
        <tr id={id} class="tr">

          <td >{item.itemName}</td>
          <td><img src={img} width="200px" height="200px" /></td>
          <td >{item.price}</td>
          <td >{item.description}</td>
          <td >{item.owner}</td>
          <td>{item.category}</td>
          <td >{item.address}</td>
          <td >{item.status}</td>
          <td>{item.rating}</td>
          <td><button onClick={event => window.location.href = './Review'} > Reviews</button></td>
          <td><button onClick={() => this.handleBuy(sessionStorage.getItem("name"), item.id)} > Buy </button></td>
        </tr>
      );
    });


  }
  BuyTable() {

    return (
      <div class="admin">
        <Nav />

        <Row>
          <Col lg='4'>
            <button className="btnstyle" onClick={() => { this.setState({ st: "buy", disabled1: true, disabled2: false, disabled3: false }) }} style={{ "color": this.state.disabled1 ? "white" : "black", backgroundColor: this.state.disabled1 ? "orangered" : "darkorange" }}> <b>Buy</b> </button>
          </Col>
          <Col lg='4'>
            <button className="btnstyle" onClick={() => { this.setState({ st: "borrow", disabled1: false, disabled2: true, disabled3: false }) }} style={{ "color": this.state.disabled2 ? "white" : "black", backgroundColor: this.state.disabled2 ? "orangered" : "darkorange" }}> <b>Borrow</b> </button>
          </Col>
          <Col lg='4'>
            <button className="btnstyle" onClick={() => { this.setState({ st: "donate", disabled1: false, disabled2: false, disabled3: true }) }} style={{ "color": this.state.disabled3 ? "white" : "black", backgroundColor: this.state.disabled3 ? "orangered" : "darkorange" }}><b>Donation</b> </button>
          </Col>
        </Row><br></br>

        <div className='Table'>
          <table id="product" class="w3-table-all">
            <th>Name</th>
            <th>Image</th>
            <th>Price
            <span className="sortIcon" onClick={(e) => this.handleSort1(e, 'price')}>
                {this.state.sortBy['price'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
              </span>
            </th>
            <th>Description</th>
            <th>Owner</th>
            <th>Category</th>
            <th>Address</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Reviews</th>
            <tbody> {this.renderResultRows()} </tbody>
          </table>
        </div>
      </div>

    );


  }
  BorrowTable() {

    return (
      <div class="admin">
        <Nav />

        <Row>
          <Col lg='4'>
            <button className="btnstyle" onClick={() => { this.setState({ st: "buy", disabled1: true, disabled2: false, disabled3: false }) }} style={{ "color": this.state.disabled1 ? "white" : "black", backgroundColor: this.state.disabled1 ? "orangered" : "darkorange" }}> <b>Buy</b> </button>
          </Col>
          <Col lg='4'>
            <button className="btnstyle" onClick={() => { this.setState({ st: "borrow", disabled1: false, disabled2: true, disabled3: false }) }} style={{ "color": this.state.disabled2 ? "white" : "black", backgroundColor: this.state.disabled2 ? "orangered" : "darkorange" }}> <b>Borrow</b> </button>
          </Col>
          <Col lg='4'>
            <button className="btnstyle" onClick={() => { this.setState({ st: "donate", disabled1: false, disabled2: false, disabled3: true }) }} style={{ "color": this.state.disabled3 ? "white" : "black", backgroundColor: this.state.disabled3 ? "orangered" : "darkorange" }}><b>Donation</b> </button>
          </Col>
        </Row><br></br>


        <div className='Table'>
          <table id="product" class="w3-table-all">
            <th>Name</th>
            <th>Image</th>
            <th>Price
            <span className="sortIcon" onClick={(e) => this.handleSort2(e, 'price')}>
                {this.state.sortBy['price'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
              </span>
            </th>
            <th>Description</th>
            <th>Owner</th>
            <th>From</th>
            <th>To</th>
            <th>Category</th>
            <th>Address</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Reviews</th>
            <tbody> {this.renderResultBorrow()} </tbody>
          </table>

        </div>
      </div>

    );


  }
  renderResultBorrow() {

    let b = this.state.b
    let n

    return b.map((item, id) => {
      //console.log(i,typeof(i))
      let img = "/pictures/" + item.image
      return (
        <tr id={id} class="tr">

          <td >{item.itemName}</td>
          <td><img src={img} width="200px" height="200px" /></td>
          <td >{item.price}</td>
          <td >{item.description}</td>
          <td >{item.owner}</td>
          <td >{item.fromDate}</td>
          <td >{item.toDate}</td>
          <td>{item.category}</td>
          <td >{item.address}</td>
          <td >{item.status}</td>
          <td>{item.rating}</td>
          <td><button onClick={event => window.location.href = './Review'} > Reviews</button></td>
          <td><button onClick={() => this.handleBorrow(sessionStorage.getItem("name"), item.id, item.fromDate)} > Borrow </button></td>
        </tr>
      );
    });


  }

  DonateTable() {

    return (
      <div class="admin">
        <Nav />


        <Row>
          <Col lg='4'>
            <button className="btnstyle" onClick={() => { this.setState({ st: "buy", disabled1: true, disabled2: false, disabled3: false }) }} style={{ "color": this.state.disabled1 ? "white" : "black", backgroundColor: this.state.disabled1 ? "orangered" : "darkorange" }}> <b>Buy</b> </button>
          </Col>
          <Col lg='4'>
            <button className="btnstyle" onClick={() => { this.setState({ st: "borrow", disabled1: false, disabled2: true, disabled3: false }) }} style={{ "color": this.state.disabled2 ? "white" : "black", backgroundColor: this.state.disabled2 ? "orangered" : "darkorange" }}> <b>Borrow</b> </button>
          </Col>
          <Col lg='4'>
            <button className="btnstyle" onClick={() => { this.setState({ st: "donate", disabled1: false, disabled2: false, disabled3: true }) }} style={{ "color": this.state.disabled3 ? "white" : "black", backgroundColor: this.state.disabled3 ? "orangered" : "darkorange" }}><b>Donation</b> </button>
          </Col>
        </Row><br></br>

        <div className='Table'>
          <table id="product" class="w3-table-all">
            <th>Name</th>
            <th>Image</th>
            <th>Price
            <span className="sortIcon" onClick={(e) => this.handleSort3(e, 'price')}>
                {this.state.sortBy['price'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
              </span>
            </th>
            <th>Description</th>
            <th>Owner</th>
            <th>Category</th>
            <th>Address</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Reviews</th>
            <tbody> {this.renderResultDonate()} </tbody>
          </table>

        </div>
      </div>

    );


  }
  renderResultDonate() {

    let d = this.state.d
    let n

    return d.map((item, id) => {
      //console.log(i,typeof(i))
      let img = "/pictures/" + item.image
      return (
        <tr id={id} class="tr">

          <td >{item.itemName}</td>
          <td><img src={img} width="200px" height="200px" /></td>
          <td >{item.price}</td>
          <td >{item.description}</td>
          <td >{item.owner}</td>
          <td>{item.category}</td>
          <td >{item.address}</td>
          <td >{item.status}</td>
          <td>{item.rating}</td>
          <td><button onClick={event => window.location.href = './Review'} > Reviews</button></td>
          <td><button onClick={() => this.handleBuy(sessionStorage.getItem("name"), item.id)} > Take </button></td>
        </tr>
      );
    });


  }

  buy() {
    const url = "http://localhost:9000/itemsbuy";

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
        //console.log(this.state.s) 
      })




  }
  borrow() {
    const url = "http://localhost:9000/itemsborrow";

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
        this.setState({ b: res })
        //console.log(this.state.s) 
      })




  }
  donate() {
    const url = "http://localhost:9000/itemsdonate";

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
        this.setState({ d: res })
        //console.log(this.state.s) 
      })




  }
  componentDidMount() {
    this.buy()
    this.borrow()
    this.donate()
  }
  handleChange = event => {
    this.setState({ filter: event.target.value });
  };


  render() {


    if (this.state.st == "donate") {
      return this.DonateTable();
    }
    else if (this.state.st == "borrow") {
      return this.BorrowTable();
    }
    else {
      return this.BuyTable();
    }

  }
}

export default Buyer