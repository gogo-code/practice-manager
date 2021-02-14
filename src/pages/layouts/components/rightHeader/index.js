import React from "react";
import { withRouter } from "react-router-dom";
import { Layout, Icon, Avatar, Menu, Dropdown, message } from "antd";
import styles from "./index.module.less";
import img from "../leftNav/images/boy.png";
import { getUser } from "../../../../api/userApi";

import ajax from "./../../../../api/index";
import { checkLogOut, removeUser } from "./../../../../api/userApi";

const { Header } = Layout;

class RightHeader extends React.Component {
  toggle = () => {
    this.props.toggle();
  };
  onMenuClick = (event) => {
    const { key } = event;
    console.log(event);
    // if (key === 'logout') {
    //   const { dispatch } = this.props;

    //   if (dispatch) {
    //     dispatch({
    //       type: 'login/logout',
    //     });
    //   }

    //   return;
    // }
    if (key === "logout") {
      checkLogOut().then((result) => {
        if (result && result.status === 1) {
          // 清空本地缓存
          removeUser();
          message.success(result.msg);
        } else {
          // 清空本地缓存
          removeUser();
          message.error("服务器内部出现问题!");
        }
        // 切换到登录界面
        this.props.history.replace("/login");
      });
    }
  };

  render() {
    const { zgl_user_img, zgl_user_name } = getUser();
    const menuHeaderDropdown = (
      <Menu
        className={styles.menu}
        selectedKeys={[]}
        onClick={this.onMenuClick}
      >
        <Menu.Item key="center">
          <Icon type="user" />
          个人中心
        </Menu.Item>

        <Menu.Item key="settings">
          <Icon type="setting" />
          修改密码
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Header
        className={styles.header}
        style={{ padding: 0, height: 40, background: "#fff" }}
      >
        <Icon
          className={styles.trigger}
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.toggle}
        />

        <Dropdown overlay={menuHeaderDropdown}>
          <span className={styles.account}>
            <Avatar
              size="small"
              className={styles.avatar}
              src={zgl_user_img ? zgl_user_img : img}
              alt="avatar"
            />
            <span className={styles.name}>{zgl_user_name}</span>
          </span>
        </Dropdown>
      </Header>
    );
  }
}

export default withRouter(RightHeader);
