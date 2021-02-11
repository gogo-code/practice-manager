import React from "react";
import { withRouter } from "react-router-dom";
import { Layout, Icon } from "antd";
import "./index.less";

const { Header } = Layout;

class RightHeader extends React.Component {

  toggle = () => {
    this.props.toggle();
  };

  render() {
    return (
      <Header
        className="header"
        style={{ padding: 0, height: 40, background: "#fff" }}
      >
        <Icon
          className="trigger"
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.toggle}
        />
      </Header>
    );
  }
}

export default withRouter(RightHeader);
