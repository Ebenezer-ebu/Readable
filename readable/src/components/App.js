import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import { handleInitialData } from "../actions/shared";
import Categories from "./Categories";
import DetailPage from "./DetailPage";
import CreatePost from "./CreatePost";
import PageNotFound from "./NotFound";

const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Categories} />
          <Route path="/create_post" component={CreatePost} />
          <Route path="/:category/:post_id" component={DetailPage} />
          <Route path="/:category" component={Categories} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
