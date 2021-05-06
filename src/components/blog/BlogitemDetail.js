/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useEffect, useState } from "react";

// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./style.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { handleSubmitComment } from "../../store/actions/index";
import { fetchBlogData } from "../../store/reducers/blogReducer";

import Tags from "./Tags";
import { handleDateTime } from "../common/handleFunction/handleDate";
import Loading from "../../views/common/Loading";

const BlogItemDetail = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const data = useSelector((state) => state.blog.data, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) {
      dispatch(fetchBlogData()).then(() => setLoading(false));
    }
  }, [id]);

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
    const comments = data[id].comments ? data[id].comments : {};
    const copycomments = { ...comments };
    const idComment = new Date().valueOf();
    copycomments[idComment] = textComment;
    handleSubmitComment(data, copycomments, id);
    dispatch(fetchBlogData());
    setText("");
    return null;
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                <h1> {data && data[id] && data[id].title}</h1>
                <div className="title-tag-item">
                  {data &&
                    data[id] &&
                    data[id].tags.map((value, index) => {
                      const hashtagValue = `#${value}`;
                      return (
                        <Tags
                          key={index}
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
                      <span>
                        {data && data[id] && data[id].author} &nbsp; &nbsp;
                      </span>
                    </span>
                  </a>
                  <span>
                    {data && data[id] && handleDateTime(data[id].datetime)}{" "}
                    &nbsp; &nbsp;
                  </span>
                </div>
              </div>
              <div className="layout-content">
                <div className="title-item">
                  {data && data[id] && data[id].body}
                </div>
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
                      {data &&
                        data[id] &&
                        data[id].comments &&
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
      )}
    </>
  );
};

export default BlogItemDetail;
