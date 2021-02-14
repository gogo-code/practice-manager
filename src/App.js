import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";

const Login = lazy(() => import("./pages/login"));
const Layouts = lazy(() => import("./pages/layouts"));

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={"/login"} component={Login} />
            <Route path={"/admin"} component={Layouts} />
            <Route path={"/student"} component={Layouts} />
            <Route path={"/teacher"} component={Layouts} />
            <Route path={"/"} component={Layouts} />
          </Switch>
        </Suspense>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
