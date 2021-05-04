import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
const { Footer } = Layout;

const FooterComponent = () => (
  <div className="footer">
    <Footer className="content-footer" style={{ textAlign: "center" }}>
      DEV Community – A constructive and inclusive social network for software
      developers. With you every step of your journey. Built on Forem — the open
      source software that powers DEV and other inclusive communities. Made with
      love and Ruby on Rails. DEV Community © 2016 - 2021.
    </Footer>
  </div>
);

export default FooterComponent;
