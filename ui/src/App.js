import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import Upload from './Upload'
import Edit from './Edit'
import Home from "./Home";
import Buyer from "./Buyer";
import Seller from "./Seller";
import Profile from "./Profile";
import Logout from "./logout"
import EditItem from "./EditItem"
import Search from "./Search";
import Notification from "./Notification"
import EditPswd from "./EditPswd"
import Survey from "./survey"
import Feedback from "./Feedback"
import Review from "./Review"
import ResetPassword from "./ResetPassword";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/buyer" component={Buyer} />
          <Route path="/seller" component={Seller} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/upload" component={Upload} />
          <Route path="/edit" component={Edit} />
          <Route path="/logout" component={Logout} />
          <Route path="/editItem/:id" component={EditItem} />
          <Route path="/search" component={Search} />
          <Route path="/Feedback" component={Feedback} />
          <Route path="/notification" component={Notification} />
          <Route path="/editPswd" component={EditPswd} />
          <Route path="/survey" component={Survey} />
          <Route path="/Review" component={Review} />
          <Route path="/ResetPassword" component={ResetPassword} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
