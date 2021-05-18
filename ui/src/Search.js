import React, { Component } from "react";
import Nav from "./Nav.js"
import "./Buyer.css"
import "./Seller.css"
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'

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

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      s: [],
      takenAt: '',
      sortBy: {
        'price': 'asc',
        'fromDate': 'asc',
        'toDate': 'asc',
        'rating': 'asc'
      }
    }
    this.state.takenAt = Date();
    this.handleSort = this.handleSort.bind(this);
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
          //alert("Thank you for Purchasing!!")
          swal({
            title: "Thanks!", text: "Thank you for purchasing!", icon:
              "success"
          }).then(function () {
            window.location.reload();
          }
          );
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
      swal("Error", "Cannot Borrow as it is unavailable for now!!", "error");
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
            const templateId = 'template_Ne4ypnOa';
            this.sendFeedback(templateId, { message_html: "Thanks for Borrowing!! Return on time is appreciated..", from_name: "JustNotBooks", email: sessionStorage.getItem("uemail") })
            //alert("Thanks for Borrowing!! Return on time is appreciated..")
            // swal("Thanks!!","Thanks for Borrowing!! Return on time is appreciated..","success");
            // window.location.reload(false)
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

  handleSort(event, colId) {
    const sortOrder = this.state.sortBy[colId] == 'asc' ? 'desc' : 'asc';
    const sortedData = this.state.s.sort(this.compare(colId, sortOrder));
    //console.log('sortedData >>', sortedData);
    if (colId == 'price') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'price': sortOrder }, 's': sortedData });
    }
    if (colId == 'fromDate') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'fromDate': sortOrder }, 's': sortedData });
    }
    if (colId == 'toDate') {
      this.setState({ 'sortBy': { ...this.state.sortBy, 'toDate': sortOrder }, 's': sortedData });
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

    return s.map((item, id) => {
      //console.log(i,typeof(i))
      let img = "/pictures/" + item.image
      if (item.category == "buy") {
        return (
          <tr id={id} class="tr">

            <td >{item.itemName}</td>
            <td><img src={img} width="200px" height="200px" /></td>
            <td >{item.price}</td>
            <td >{item.description}</td>
            <td >{item.owner}</td>
            <td>{item.fromDate}</td>
            <td>{item.toDate}</td>
            <td>{item.category}</td>
            <td >{item.address}</td>
            <td >{item.status}</td>
            <td><button onClick={() => this.handleBuy(sessionStorage.getItem("name"), item.id)} > Buy </button></td>
          </tr>
        );
      }
      else if (item.category == "borrow") {
        return (
          <tr id={id} class="tr">

            <td >{item.itemName}</td>
            <td><img src={img} width="200px" height="200px" /></td>
            <td >{item.price}</td>
            <td >{item.description}</td>
            <td >{item.owner}</td>
            <td>{item.fromDate}</td>
            <td>{item.toDate}</td>
            <td>{item.category}</td>
            <td >{item.address}</td>
            <td >{item.status}</td>
            <td><button onClick={() => this.handleBorrow(sessionStorage.getItem("name"), item.id, item.fromDate)} > Borrow </button></td>
          </tr>
        );
      }
      else {
        return (
          <tr id={id} class="tr">

            <td >{item.itemName}</td>
            <td><img src={img} width="200px" height="200px" /></td>
            <td >{item.price}</td>
            <td >{item.description}</td>
            <td >{item.owner}</td>
            <td>{item.fromDate}</td>
            <td>{item.toDate}</td>
            <td>{item.category}</td>
            <td >{item.address}</td>
            <td >{item.status}</td>
            <td><button onClick={() => this.handleBuy(sessionStorage.getItem("name"), item.id)} > Take </button></td>
          </tr>
        );
      }

    });


  }


  items() {
    const url = "http://localhost:9000/search";

    var body = {
      search: sessionStorage.getItem("search"),
      owner: sessionStorage.getItem("name")
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
  }

  render() {


    return (
      <div>

        <div class="admin">
          <Nav />

          <h1>Items Related to Search</h1>



          <div className='Table'>
            <table id="product" class="w3-table-all">
              <th>Name</th>
              <th>Image</th>
              <th>Price
              <span className="sortIcon" onClick={(e) => this.handleSort(e, 'price')}>
                  {this.state.sortBy['price'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
                </span>
              </th>
              <th>Description</th>
              <th>Owner</th>
              <th>From
                <span className="sortIcon" onClick={(e) => this.handleSort(e, 'fromDate')}>
                  {this.state.sortBy['fromDate'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
                </span>
              </th>
              <th>To
                <span className="sortIcon" onClick={(e) => this.handleSort(e, 'toDate')}>
                  {this.state.sortBy['toDate'] == 'asc' ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />}
                </span>
              </th>
              <th>Category</th>
              <th>Address</th>
              <th>Status</th>
              <tbody> {this.renderResultRows()} </tbody>
            </table>

          </div>

        </div>
      </div>
    )
  }
}

export default Search