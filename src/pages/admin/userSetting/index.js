import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import NotFound from "./../../notFound/not-found";
import Student from './pages/student'
import Teacher from './pages/teacher'


export default class index extends Component {
  render() {
    return (
      <Switch>
        <Route path={"/userSetting/student"} component={Student} />
        <Route path={"/userSetting/teacher"} component={Teacher} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}