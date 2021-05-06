/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import Tags from "./Tags";
import {
  handleSavedBlogItem,
  handleLikeBlogItem,
} from "../../store/actions/index";
import { readData, fetchBlogData } from "../../store/reducers/blogReducer";

import { handleDateTime } from "../common/handleFunction/handleDate";

const BlogItem = (props) => {
  const currentUserId = useSelector((state) => state.user.userId);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSave = useCallback(
    (blogItem) => {
      if (currentUserId) {
        const saved = blogItem.saved ? blogItem.saved : {};
        const copySaved = { ...saved };
        copySaved[currentUserId] = !copySaved[currentUserId];
        handleSavedBlogItem(blogItem, copySaved, props.id);
        fetchBlogData().then((result) => {
          dispatch(readData(result));
        });
      } else {
        history.push("/login");
      }
    },
    [props.blogItem]
  );
  const handleLike = useCallback(
    (blogItem) => {
      if (currentUserId) {
        const likes = blogItem.likes ? blogItem.likes : {};
        const copyLikes = { ...likes };
        copyLikes[currentUserId] = !copyLikes[currentUserId];
        handleLikeBlogItem(blogItem, copyLikes, props.id);
        fetchBlogData().then((result) => {
          dispatch(readData(result));
        });
      } else {
        history.push("/login");
      }
    },
    [props.blogItem]
  );

  // const handleComment = () => <Redirect to={() => `/blog/${props.id}`} />;
  return (
    <div className="main-content">
      <div className="headerItem">
        <div className="subHeaderItem">
          <div className="avatar">
            <a href="/">
              <img
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--h8DxsnjW--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/577896/343fde9f-609b-419b-95d1-07d16b320a37.png"
                alt=""
                className="avatarImg"
              />
            </a>
          </div>
          <div className="authorDatetime">
            <div className="author">
              <a href="/">{props.blogItem.author}</a>
            </div>
            <a href="/" className="datetime">
              {handleDateTime(props.blogItem.datetime)}
            </a>
          </div>
        </div>
      </div>
      <div className="title-item">
        <h2 className="title">
          <Link to={() => `/blog/${props.id}`} className="element-a-title">
            {props.blogItem.title}
          </Link>
        </h2>
        {props.blogItem.tags.map((value, index) => {
          const hashtagValue = `#${value}`;
          return <Tags key={index} hashtagValue={hashtagValue} value={value} />;
        })}
        <div className="bottom">
          <div className="details">
            {props.blogItem.likes && props.blogItem.likes[currentUserId] ? (
              <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => handleLike(props.blogItem)}
              >
                Liked
              </button>
            ) : (
              <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => handleLike(props.blogItem)}
              >
                Like
              </button>
            )}
            &nbsp; &nbsp;
            <button type="button">
              <Link style={{ color: "black" }} to={() => `/blog/${props.id}`}>
                Comments
              </Link>
            </button>
          </div>
          <div className="save">
            {props.blogItem.saved && props.blogItem.saved[currentUserId] ? (
              <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => handleSave(props.blogItem)}
              >
                Saved
              </button>
            ) : (
              <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => handleSave(props.blogItem)}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
