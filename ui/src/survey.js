import React from 'react';
import ReactStars from "react-rating-stars-component";
import "./survey.css"
import swal from 'sweetalert'
class Survey extends React.Component {
  constructor() {
    super();
    this.state = {
      review: '',
      name: '',
      rate: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }
  handleChange(event) {
    this.setState({ review: event.target.value });
  }
  async handlelogOut(event) {
    swal("Logged out successfully!!", "", "success");
    this.props.history.push("/login");
    //window.location.href = "./login";
  }
  handleRatingChange(event) {
    console.log(event);
    //here set your state for rating
    this.setState({ rate: event });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    var body = {
      review: this.state.review,
      rate: this.state.rate,
      name: sessionStorage.getItem("name"),
    }
    console.log(body);
    if (this.state.textAreaValue == "") {
      alert('Please enter ')
    }
    else {
      const url = "http://localhost:9000/add";
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
            swal("Thanks for your time!", "", "success")
            this.props.history.push("/login");
          }
          else {
            swal("Error!", "Please try again", "error")
            this.props.history.push("/survey");
          }
        })
        .catch(() => console.log("can't access " + url + " response. "))
    }
  }
  render() {
    return (
      <div className="bg">
        <form onSubmit={this.displayLogin}>
          <h2>Rate your experience</h2>
          <ReactStars
            count={5}
            size={100}
            activeColor="#ffd700"
            name="rate"
            onChange={this.handleRatingChange}
            value={this.state.rate}
          />
          <h4>Any suggestions...</h4>
          <textarea
            name="review"
            value={this.state.textAreaValue}
            onChange={this.handleChange}
            rows={5}
            cols={50}
          />
          <br /><br />
          <button type="submit" style={{ "float": "left" }} onClick={this.handleSubmit}> Submit </button>
          <button style={{ "float": "right" }} onClick={() => { this.handlelogOut() }}>Logout </button>
        </form>
      </div>
    );
  }
}
export default Survey;