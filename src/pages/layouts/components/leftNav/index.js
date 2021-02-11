import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import logo from "./images/logo.png";
import sLogo from "./images/logo-s.png";

import styles from "./index.module.less";

// // 引入目录json文件
// import menus from './config/menuConfig'

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

class LeftNav extends React.Component {
  // state = {
  //   menuList: menus,
  // };

  // /*创建左侧菜单*/
  // _renderMenu = (menuList)=>{
  //     return menuList.map(item => {
  //         // 取出一级菜单
  //         if(!item.children){
  //             return (
  //                 <Item key={item._key}>
  //                     <Link to={item._key}>
  //                         <span className={item.icon} />
  //                         <span>{item.title}</span>
  //                     </Link>
  //                 </Item>
  //             )
  //         }else {
  //             return (
  //                 <SubMenu
  //                     key={item._key}
  //                     title={
  //                         <span>
  //                              <span className={item.icon} />
  //                               <span>{item.title}</span>
  //                         </span>
  //                     }
  //                 >
  //                     {this._renderMenu(item.children)}
  //                 </SubMenu>
  //             )
  //         }
  //     })
  // };

  render() {
    // 获取当前的路由
    let path = this.props.location.pathname;
    console.log(path);
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
        >
          {/* {this._renderMenu(this.state.menuList)} */}
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                {this.props.collapsed ? "" : "选项"}
              </span>
            }
          >
            <Item key="1">option1</Item>
            <Item key="2">option2</Item>
            <Item key="3">option3</Item>
            <Item key="4">option4</Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(LeftNav);
