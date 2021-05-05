/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import "../../components/blog/style.css";
import { useSelector } from "react-redux";
import Blogitem from "../../components/blog/Blogitem";
import { URL_PUBLIC } from "../../configdb";

const MyBlog = () => {
  const data = useSelector((state) => state.blog.data);
  const userId = useSelector((state) => state.user.userId);
  const url = `${URL_PUBLIC}/img/imgblog1.png`;

  return (
    data &&
    Object.keys(data).map((key) => {
      const blogItem = data[key];
      if (blogItem) {
        if (blogItem.userId === userId)
          return <Blogitem key={key} url={url} blogItem={blogItem} id={key} />;
      }
      return null;
    })
  );
};
export default MyBlog;
