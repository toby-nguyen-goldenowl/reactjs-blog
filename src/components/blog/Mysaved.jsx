/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo } from "react";
import "./style.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "../../configdb/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import Blogitem from "./Blogitem";
import { readBlog } from "../../store/actions/index";
import * as env from "../../constant/index";

const MyBlog = (props) => {
  const data = useSelector((state) => state.blog.data);
  const userId = useSelector((state) => state.user.userId);
  const url = `${env.URL_PUBLIC}/img/imgblog1.png`;

  const dispatch = useDispatch();
  const memoData = useMemo(
    () => ({
      data,
    }),
    []
  );

  useEffect(() => {
    const dataBlogs = firebase.database().ref("blogs");
    dataBlogs.on("value", (snapshot) => {
      const result = snapshot.val();
      dispatch(readBlog(result));
    });
  }, [memoData]);

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
                  if (blogItem) {
                    if (blogItem.saved && blogItem.saved[userId])
                      return (
                        <Blogitem
                          key={uuid()}
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
