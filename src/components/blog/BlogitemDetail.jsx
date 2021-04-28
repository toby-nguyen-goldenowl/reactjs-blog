/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "../../configdb/firebaseConfig";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { readBlog } from "../../store/actions/index";
import Tags from "./Tags";
const BlogitemDetail = () => {
  const [text, setText] = useState("");
  const { id } = useParams();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let textComment = text;
    if (!textComment) {
      return null;
    }
    textComment = text.trim();
    if (!textComment) {
      return null;
    }

    const dataBlog = firebase.database().ref(`blogs/${id}`);

    const comments = data[id].comments ? data[id].comments : {};
    const copycomments = { ...comments };
    const idComment = new Date().valueOf();
    copycomments[idComment] = textComment;
    dataBlog.set({
      ...data[id],
      comments: { ...copycomments },
    });

    setText("");
    return null;
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="page-item-container">
      <div className="page-content-inner">
        <div className="sidebar-left">left</div>
        <div className="main-content">
          <div className="img-top-container">
            <img
              className="layout-content"
              src="https://res.cloudinary.com/practicaldev/image/fetch/s--VaavUAHC--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ak2fuy1fktt8wny594uw.jpeg"
              alt=""
            />
          </div>
          <div className="title-item">
            <h1> {data[id].title}</h1>
            <div className="title-tag-item">
              {data[id].tags.map((value) => {
                const hashtagValue = `#${value}`;
                return (
                  <Tags
                    key={uuid()}
                    hashtagValue={hashtagValue}
                    value={value}
                  />
                );
              })}
            </div>
            <div className="avatar-in-blogdetail">
              <a href="/">
                <span>
                  <img
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--h8DxsnjW--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/577896/343fde9f-609b-419b-95d1-07d16b320a37.png"
                    alt=""
                    className="avatarImg"
                  />
                  <span>{data[id].author} &nbsp; &nbsp;</span>
                </span>
              </a>
              <span>{data[id].datetime} &nbsp; &nbsp;</span>
            </div>
          </div>
          <div className="layout-content">
            <div className="title-item">{data[id].body}</div>
          </div>
        </div>
        <div className="sidebar-right">right</div>
        <div className="section-comment">
          <h1 className="header-comment">Comment</h1>
          <div className="container-comment">
            <div className="avatar-in-comment">
              <a href="/">
                <span>
                  <img
                    src="https://res.cloudinary.com/practicaldev/image/fetch/s--h8DxsnjW--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/577896/343fde9f-609b-419b-95d1-07d16b320a37.png"
                    alt=""
                    className="avatarImg"
                  />
                </span>
              </a>
            </div>
            <div className="container-form-comment">
              <form
                style={{
                  float: "left",
                }}
                onSubmit={handleSubmit}
              >
                <label>
                  <textarea
                    className="text-comment"
                    value={text}
                    onChange={handleChange}
                  />
                </label>
                <div className="ip-submit-comment">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                <div>
                  {data[id].comments &&
                    Object.values(data[id].comments).map((value) => (
                      <div key={uuid()}>{value}</div>
                    ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogitemDetail;
