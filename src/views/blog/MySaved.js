/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import "../../components/blog/style.css";
import { useSelector } from "react-redux";
import Blogitem from "../../components/blog/Blogitem";
import { URL_PUBLIC } from "../../constant";

const MyBlog = (props) => {
  const data = useSelector((state) => state.blog.data);
  const userId = useSelector((state) => state.user.userId);
  const url = `${URL_PUBLIC}/img/imgblog1.png`;

  return (
    <>
      <div className="page-item-container">
        <div className="page-content-inner">
          <div className="sidebar-left">left</div>
          <div className="container-main-content">
            <div className="img-top-container">
              {data &&
                Object.keys(data).map((key) => {
                  const blogItem = data[key];
                  if (blogItem && blogItem.saved) {
                    if (blogItem.saved[userId])
                      return (
                        <Blogitem
                          key={key}
                          url={url}
                          blogItem={blogItem}
                          id={key}
                        />
                      );
                  }
                  return null;
                })}
            </div>
          </div>
          <div className="sidebar-right">right</div>
        </div>
      </div>
      {props.children}
    </>
  );
};
export default MyBlog;
