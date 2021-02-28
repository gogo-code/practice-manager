import React, { Component } from "react";
import { Switch, Redirect, Route, withRouter, Link } from "react-router-dom";
import { Button, Layout, Modal, Breadcrumb } from "antd";
import LeftNav from "./components/leftNav";
import RightHeader from "./components/rightHeader";
import PubSub from "pubsub-js";
import { getUser } from "@/api/userApi";
import "./index.less";

import NotFound from "./../notFound/not-found";
import Home from "./../home";
import PersonSetting from "./../personSetting";
import PracticeBase from "./../admin/practiceBase";
import UserSetting from "./../admin/userSetting";

// 引入路由动画组件
import { TransitionGroup, CSSTransition } from "react-transition-group";

// 引入是否登录的判断
import { isLogin } from "./../../api/userApi";

// 引入目录json文件
import menus from "./components/leftNav/menuConfig.json";

const { Content, Footer } = Layout;

export default class Layouts extends Component {
  state = {
    collapsed: false,
    menuList: menus,
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

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  /*创建面包屑涉及深度遍历(没时间写只是写了一层)*/
  _renderMenu = (menuList, path) => {
    let _path = path.split("/").splice(0, 2).join("/");
    let arr = [];
    let data = menuList.find((val) => val.key.indexOf(_path) !== -1);
    if (data) {
      arr.push(
        <Breadcrumb.Item key={data.key}>
          <Link to={data.key}>{data.title}</Link>
        </Breadcrumb.Item>
      );
      if (data.children) {
        let childData =
          data.children.find((val) => val.key.indexOf(path) !== -1) || {};
        arr.push(
          <Breadcrumb.Item key={data.key}>
            <Link to={childData.key}>{childData.title}</Link>
          </Breadcrumb.Item>
        );
      }
    } else {
      arr.push(<Breadcrumb.Item key="NotFound">找不到</Breadcrumb.Item>);
    }

    return arr;
  };

  render() {
    // 判断是否是登录的
    if (!isLogin()) {
      return <Redirect to={"/login"} />;
    }
    const { sxgl_role_id } = getUser();
    let path = this.props.location.pathname;
    let _menuList =
      this.state.menuList.find((val) => val.id == sxgl_role_id).data || [];
    return (
      <Layout className="pane">
        {/*左边*/}
        <LeftNav collapsed={this.state.collapsed} />
        {/*右边*/}
        <Layout>
          <RightHeader toggle={this.toggle} collapsed={this.state.collapsed} />
          <div
            style={{
              margin: "8px 16px 0 16px",
              display: "flex",
              fontSize: "14px",
            }}
          >
            您的位置&nbsp;:&nbsp;&nbsp;&nbsp;
            <Breadcrumb>{this._renderMenu(_menuList, path)}</Breadcrumb>
          </div>

          <Content className="content">
            {/* <TransitionGroup>
              <CSSTransition
                // 需要加一个key属性，让react认识每个组件，并进行正确的加载。
                // 这里我改了官方demo的代码， 原来是设置成location.key， 这样的话每次点击同一个路由链接的时候都会渲染。
                key={this.props.location.pathname}
                // classNames 就是设置给css动画的标示，记得'classNames'带's'的。
                classNames="slide"
                // 动画时间设置为800ms，和css中的需要一致。
                timeout={300}
              > */}
                <Switch>
                  <Redirect from={"/"} exact to={"/home"} />
                  <Route path={"/home"} component={Home} />
                  <Route path={"/practiceBase"} component={PracticeBase} />
                  <Route path={"/personSetting"} component={PersonSetting} />
                  <Route path={"/userSetting"} component={UserSetting} />
                  <Route component={NotFound} />
                </Switch>
              {/* </CSSTransition>
            </TransitionGroup> */}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
