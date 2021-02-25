import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import NotFound from "./../../notFound/not-found";
import Job from './pages/job'
import Setting from './pages/setting'
import Tutor from './pages/tutor'

export default class index extends Component {
  render() {
    return (
      <Switch>
        <Route path={"/practiceBase/setting"} component={Setting} />
        <Route path={"/practiceBase/job"} component={Job} />
        <Route path={"/practiceBase/tutor"} component={Tutor} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
