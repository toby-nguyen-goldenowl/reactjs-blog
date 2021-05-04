/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import BlogList from "../../components/blog/Myblog";
const SceensMyBlog = (props) => (
  <>
    <div className="page-item-container">
      <div className="page-content-inner">
        <div className="sidebar-left">left</div>
        <div className="container-main-content">
          <div className="img-top-container">
            <BlogList />
          </div>
        </div>
        <div className="sidebar-right">right</div>
      </div>
    </div>
    {props.children}
  </>
);
export default SceensMyBlog;
