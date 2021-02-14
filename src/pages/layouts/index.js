import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { Layout, Modal } from "antd";
import LeftNav from "./components/leftNav";
import RightHeader from "./components/rightHeader";
import PubSub from "pubsub-js";
import "./index.less";

// 引入是否登录的判断
import {isLogin} from './../../api/userApi'

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

  componentDidMount() {
    // 去订阅token失效信息
    PubSub.subscribe("tokenOut", (msg, data) => {
      if (msg === "tokenOut") {
        Modal.warning({
          title: "登录信息已经失效",
          content: (
            <div>
              <p>请重新登录后再操作!</p>
            </div>
          ),
          onOk: () => {
            this.props.history.replace("/login");
          },
        });
      }
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe("tokenOut");
  }

  render() {
    // 判断是否是登录的
    if (!isLogin()) {
      return <Redirect to={"/login"} />;
    }
    return (
      <Layout className="pane">
        {/*左边*/}
        <LeftNav collapsed={this.state.collapsed} />
        {/*右边*/}
        <Layout>
          <RightHeader toggle={this.toggle} collapsed={this.state.collapsed} />
          <Content className="content">主面板</Content>
        </Layout>
      </Layout>
    );
  }
}
