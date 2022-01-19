import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import { handleInitialData } from "../actions/shared";
import Categories from "./Categories";
import DetailPage from "./DetailPage";
import CreatePost from "./CreatePost";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import ApprovePasswordChange from "./ApprovePasswordChange";

const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Categories} />
          <Route path="/create_post" component={CreatePost} />
          <Route path="/signup_page" component={Signup} />
          <Route path="/login_page" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route
            path="/approve_password_change"
            component={ApprovePasswordChange}
          />
          <Route path="/passwordReset" component={ChangePassword} />
          <Route path="/:category/:post_id" component={DetailPage} />
          <Route path="/:category" component={Categories} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
