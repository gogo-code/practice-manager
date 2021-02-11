import React, { Component } from "react";
import { Layout } from "antd";
import LeftNav from "./components/leftNav";
import RightHeader from "./components/rightHeader";
import './index.less'

const { Content, Footer } = Layout;

export default class Layouts extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className="pane">
        {/*左边*/}
        <LeftNav  collapsed={this.state.collapsed}/>
        {/*右边*/}
        <Layout>
          <RightHeader toggle={this.toggle} collapsed={this.state.collapsed}/>
          <Content className="content">主面板</Content>
        </Layout>
      </Layout>
    );
  }
}
