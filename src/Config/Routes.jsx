import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import MainLayout from "../Hoc/MainLayout";
import Login from "../Containers/Login";
import Dashboard from "../Containers/Dashboard";
import SnackBar from "../Components/SnackBar";
import Modal from "../Components/Modal";
import { setupInterceptors } from "../Actions/authActions";
import Products from "../Components/Products";
import Cart from "../Containers/Cart";
import MyShopping from "../Containers/MyShopping";

class Routes extends Component {
  componentWillMount() {
    this.props.setupInterceptors();
  }
  componentWillUpdate() {
    this.props.setupInterceptors();
  }
  render() {
    return (
      <Router history={this.props.history}>
        <MainLayout>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Dashboard>
            <Route
              path="/dashboard"
              exact={false}
              component={() => (
                  <MainLayout>
                    <Switch>
                      <Route
                        exact
                        path="/dashboard/products"
                        component={Products}
                      />
                      <Route
                        exact
                        path="/dashboard/cart"
                        component={Cart}
                      />
                       <Route
                        exact
                        path="/dashboard/my-shopping"
                        component={MyShopping}
                      />
                    </Switch>
                  </MainLayout>
                )
              }
            />
            </Dashboard>
          </Switch>
          <SnackBar />
          <Modal />
        </MainLayout>
      </Router>
    );
  }
}

const mD = {
  setupInterceptors
};

export default connect(
  null,
  mD
)(Routes);
