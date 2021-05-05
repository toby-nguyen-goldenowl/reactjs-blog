import React from "react";
import { useSelector } from "react-redux";
import { Layout, Menu, Input, Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./style.css";
const { Header } = Layout;

const HeaderComponent = () => {
  const userId = useSelector((state) => state.user.userId);
  return (
    <>
      <Header>
        <Menu
          className=".ant-layout-header"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
        >
          <Menu.Item key="icon">
            <Link to="/">
              <HomeOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item key="search">
            <Input placeholder="Search" />
          </Menu.Item>
          {userId ? (
            <>
              <Menu.Item key="logout" className="right">
                <Link to="/logout">
                  <Button>Log Out</Button>
                </Link>
              </Menu.Item>
              <Menu.Item key="createblog" className="right">
                <Link to="/createblog">
                  <Button>Create Blog</Button>
                </Link>
              </Menu.Item>
              <Menu.Item key="myblogs" className="right">
                <Link to="/my-blog">
                  <Button>My Blog</Button>
                </Link>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="logup" className="right">
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </Menu.Item>
              <Menu.Item key="login" className="right">
                <Link to="/login">
                  <Button>Log In</Button>
                </Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>
    </>
  );
};

export default HeaderComponent;
