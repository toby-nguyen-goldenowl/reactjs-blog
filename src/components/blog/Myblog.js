/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import Blogitem from "./Blogitem";
import * as env from "../../constant/index";
const MyBlog = () => {
  const data = useSelector((state) => state.blog.data);
  const userId = useSelector((state) => state.user.userId);
  const url = `${env.URL_PUBLIC}/img/imgblog1.png`;

  return (
    data &&
    Object.keys(data).map((key) => {
      const blogItem = data[key];
      if (blogItem) {
        if (blogItem.userId === userId)
          return (
            <Blogitem key={uuid()} url={url} blogItem={blogItem} id={key} />
          );
      }
      return null;
    })
  );
};
export default MyBlog;
