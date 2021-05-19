import React from "react";
import Nav from "./Nav.js"
import "./Buyer.css"
import swal from "sweetalert";


class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            s: [],
            l: '',
            email: ''
        }
        //sessionStorage.setItem("notification",this.state.notification)
    }
    notifications() {
        const url = "http://localhost:9000/getNotifications";

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
                this.setState({ l: this.state.s.length })
                //this.state.l = this.state.s.length;
                sessionStorage.setItem("l", this.state.l)
                //console.log(this.state.l)

            })

    }
    handlePay(id) {
        var body = {
            customer: sessionStorage.getItem("name"),
            id: id,
        }
        const url = 'http://localhost:9000/pay'
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
        }).then(response =>
            response.json().then(data => ({
                data1: (data)
            })
            ).then(res => {
                this.setState({
                    email: res.data1.email,
                });
                const templateId = 'template_Ne4ypnOa';

                this.sendFeedback(templateId, { message_html: "Penalty paid by the customer please login to your account and confirm payment", from_name: "JustNotBooks", email: this.state.email })
                //alert("Penalty paid")
                //swal("Good Job!!","Penalty Paid!","success")
                swal({
                    title: "Good job", text: "Penalty Paid!", icon:
                        "success"
                }).then(function () {
                    window.location.reload();
                }
                );
                //window.location.reload(false)


            }));
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


    handleConfirm(id) {
        var body = {
            owner: sessionStorage.getItem("name"),
            id: id,
        }
        const url = 'http://localhost:9000/confirm'
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
        }).then(response =>
            response.json().then(data => ({
                data1: (data)
            })
            ).then(res => {
                this.setState({
                    email: res.data1.email,
                });
                const templateId = 'template_Ne4ypnOa';

                this.sendFeedback(templateId, { message_html: "Owner confirmed your payment, Penalty is successfully removed", from_name: "JustNotBooks", email: this.state.email })
                //alert("Penalty paid")
                //   swal("Good Job!","Penalty Successfully removed","success")
                //   window.location.reload(false)
                swal({
                    title: "Good job", text: "Penalty Successfully removed", icon:
                        "success"
                }).then(function () {
                    window.location.reload();
                }
                );


            }));

    }
    handleButton1(cs, id) {
        if (cs === "Processed") {
            return (
                <td><button onClick={() => this.handleConfirm(id)} > Payment Done </button></td>
            );
        }
        else {
            return (
                <td></td>
            );
        }
    }
    renderResultNotify() {

        let s = this.state.s


        return s.map((note, id) => {
            //console.log(i,typeof(i))
            if (note.owner === sessionStorage.getItem("name")) {
                return (

                    <tr id={id} class="tr">

                        <td >{note.ownerNote}</td>

                        <td >{note.customer}</td>

                        <td>{note.ownerStatus}</td>
                        <td>{note.customerStatus}</td>
                        <td>{this.handleButton1(note.customerStatus, note.id)}</td>

                    </tr>
                );
            }

            else {
                return (

                    <h5>No Penalties to be handled</h5>

                )
            }
        });

    }
    handleButton2(cs, id) {
        if (cs === "Not Processed") {
            return (
                <td><button onClick={() => this.handlePay(id)} > Pay </button></td>
            );
        }
        else {
            return (
                <td></td>
            );
        }

    }
    renderResultNotification() {

        let s = this.state.s


        return s.map((note, id) => {
            //console.log(i,typeof(i))
            if (note.customer === sessionStorage.getItem("name")) {
                return (
                    <tr id={id} class="tr">

                        <td >{note.customerNote}</td>

                        <td >{note.owner}</td>
                        <td>{note.customerStatus}</td>
                        <td>{note.ownerStatus}</td>
                        <td>{this.handleButton2(note.customerStatus, note.id)}</td><td></td>
                    </tr>
                );
            }
            else {
                return (
                    <h5>No Penalties</h5>
                )
            }



        });

    }

    componentDidMount() {
        this.notifications()
    }
    render() {
        return (
            <div>
                <Nav />
                <div>
                    <h1>Notifications</h1>
                    <div className="uploadTable">

                        <div>
                            <h1>Confirmation Notifications</h1>
                            <table id="product" class="w3-table-all">
                                <th>Notification</th>

                                <th>Customer</th>
                                <th>Your Status</th>
                                <th>Customer Status</th>
                                <tbody> {this.renderResultNotify()} </tbody>
                            </table>
                        </div>

                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="uploadTable">
                        <div>
                            <h1>Payment Notifications</h1>
                            <table id="product" class="w3-table-all">
                                <th>Notification</th>

                                <th>Owner</th>
                                <th>Your Status</th>
                                <th>Owner Status</th>

                                <tbody> {this.renderResultNotification()} </tbody>
                            </table>
                        </div>
                    </div>
                    <br></br>
                    <br></br>


                </div>

            </div>
        )
    }

}

export default Notification;