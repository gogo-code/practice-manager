import React from "react";
import { withRouter } from "react-router-dom";
import { Layout, Icon, Avatar, Menu, Dropdown } from "antd";
import styles from "./index.module.less";

const { Header } = Layout;

class RightHeader extends React.Component {
  toggle = () => {
    this.props.toggle();
  };

  render() {
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
          个人设置
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item key="logout">
          <Icon type="logout" />
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
          <span className={`${styles.action} ${styles.account}`}>
            {/* <Avatar
              size="small"
              className={styles.avatar}
              src={}
              alt="avatar"
            /> */}
            <span className={styles.name}>{}</span>
          </span>
        </Dropdown>
      </Header>
    );
  }
}

export default withRouter(RightHeader);
