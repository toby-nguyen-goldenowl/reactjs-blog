/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo } from "react";
import "./style.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "../../configdb/firebaseConfig";
import { HomeOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
// import uuid from "react-uuid";
import uuid from "react-uuid";
import * as env from "../../constant/index";
import { readBlog } from "../../store/actions/index";
import Blogitem from "./Blogitem";
const Home = (props) => {
  const url = `${env.URL_PUBLIC}/img/imgblog1.png`;
  const data = useSelector((state) => state.blog.data);
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
          <div className="sidebar-left">
            <div>
              <a href="/">
                <HomeOutlined />
                &nbsp;
                <span style={{ color: "black" }}>Home</span>
              </a>
            </div>

            <div>
              <a href="/my-saved">
                <UnorderedListOutlined /> &nbsp;
                <span style={{ color: "black" }}>Saved</span>
              </a>
            </div>
          </div>
          <div className="container-main-content">
            <div className="border-content">
              {data &&
                Object.keys(data).map((key) => {
                  const blogItem = data[key];
                  if (blogItem) {
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
        {props.children}
      </div>
    </>
  );
};
export default Home;
