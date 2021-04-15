import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";

// const HeaderComponent = lazy(() => import("./header"));
// const FooterComponent = lazy(() => import("./footer"));

import HeaderComponent from "./header";
import FooterComponent from "./footer";
const { Content } = Layout;

const LayoutComponent = ({ children }) => (
  <>
    <HeaderComponent />
    <Content>{children}</Content>
    <FooterComponent />
  </>
);

export default LayoutComponent;
