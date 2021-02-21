import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import logo from "./images/logo.png";
import sLogo from "./images/logo-s.png";
import { getUser } from "@/api/userApi";
import styles from "./index.module.less";

// 引入目录json文件
import menus from "./menuConfig";

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

class LeftNav extends React.Component {
  state = {
    menuList: menus,
  };

  /*创建左侧菜单*/
  _renderMenu = (menuList) => {
    return menuList.map((item) => {
      // 取出一级菜单
      if (!item.children) {
        return (
          <Item key={item.key}>
            <Link to={item.key}>
              {item.icon ? (
                <Icon
                  type={item.icon}
                  style={{ fontSize: this.props.collapsed ? "20px" : "14px" }}
                />
              ) : (
                ""
              )}
              <span>{item.title}</span>
            </Link>
          </Item>
        );
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                {item.icon ? (
                  <Icon
                    type={item.icon}
                    style={{ fontSize: this.props.collapsed ? "20px" : "14px" }}
                  />
                ) : (
                  ""
                )}
                <span>{item.title}</span>
              </span>
            }
          >
            {this._renderMenu(item.children)}
          </SubMenu>
        );
      }
    });
  };

  // 根据当前的菜单列表, 依据当前的路由路径, 获取应该被展开的菜单项
  _getOpenKeys = (menuList, path) => {
    
    for (let i = 0; i < menuList.length; i++) {
      // 1. 获取配置对象
      let item = menuList[i];
      // 2. 判断
      if (
        item.children &&
        item.children.find((c_item) => {
          return c_item.key === path;
        })
      ) {
        return item.key;
      }
    }
    return "";
  };

  render() {
    // 获取当前的路由
    let path = this.props.location.pathname;
    let pPath = path.substr(0, path.indexOf("/", 2))
      ? path.substr(0, path.indexOf("/", 2))
      : path;
   
    // console.log(path);
    const { sxgl_role_id } = getUser();
    let _menuList = this.state.menuList.find((val) => val.id == sxgl_role_id).data;
    let openKeys = this._getOpenKeys(_menuList, path);
    return (
      <Sider
        trigger={null}
        collapsible
        width={200}
        className={styles.leftNav}
        collapsed={this.props.collapsed}
      >
        <div className={styles.logo}>
          <img src={this.props.collapsed ? sLogo : logo} alt="" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          // style={{ height: "100%", borderRight: 0 }}
          defaultSelectedKeys={[path]}
          selectedKeys={[path, pPath]}
          defaultOpenKeys={[openKeys]}
        >
          {this._renderMenu(_menuList)}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(LeftNav);
