import React from "react";
import { Layout, Menu, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./style.css";
const { Header } = Layout;

const HeaderComponent = () => (
  <Header>
    <Menu
      className=".ant-layout-header"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
    >
      <Menu.Item key="search">
        <Input placeholder="Search" />
      </Menu.Item>
      <Menu.Item key="logup" className="right">
        <Link to="/logup">
          <Button>Log Up</Button>
        </Link>
      </Menu.Item>
      <Menu.Item key="login" className="right">
        <Link to="/login">
          <Button>Log In</Button>
        </Link>
      </Menu.Item>
    </Menu>
  </Header>
);
export default HeaderComponent;
