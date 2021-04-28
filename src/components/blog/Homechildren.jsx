import React from "react";
import { MDXProvider } from "@mdx-js/react";
const HomeChildrenComponent = ({ children }) => (
  <MDXProvider>{children}</MDXProvider>
);

export default HomeChildrenComponent;
