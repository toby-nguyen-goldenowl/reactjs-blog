/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from "react";
import "./style.css";
import { HomeOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as env from "../../constant/index";
import { readBlog, readDataFromFireBase } from "../../store/actions/index";
import Loading from "../common/Loading";

import Blogitem from "./Blogitem";
const Home = (props) => {
  const url = `${env.URL_PUBLIC}/img/imgblog1.png`;
  const data = useSelector((state) => state.blog.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readDataFromFireBase()
      .then((result) => {
        dispatch(readBlog(result));
      })
      .then(() => setLoading(false));
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
          {props.children}
        </div>
      )}
    </>
  );
};
export default Home;
