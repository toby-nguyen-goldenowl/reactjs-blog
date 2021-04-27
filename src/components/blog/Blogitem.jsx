/* eslint-disable max-len */
import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "../../configdb/firebaseConfig";
import { Link } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import Tags from "./Tags";

const Blogitem = (props) => {
  const currentUserId = useSelector((state) => state.user.userId);
  const handleSave = (blogItem) => {
    const dataBlogs = firebase.database().ref(`blogs/${props.id}`);
    const saved = blogItem.saved ? blogItem.saved : {};
    const copySaved = { ...saved };
    copySaved[currentUserId] = !copySaved[currentUserId];
    dataBlogs.set({
      ...blogItem,
      saved: copySaved,
    });
  };
  const handleLike = (blogItem) => {
    const dataBlogs = firebase.database().ref(`blogs/${props.id}`);
    const likes = blogItem.likes ? blogItem.likes : {};
    const copyLikes = { ...likes };
    copyLikes[currentUserId] = !copyLikes[currentUserId];
    // copyLikes.push(currentUserId);
    dataBlogs.set({
      ...blogItem,
      likes: copyLikes,
    });
  };
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
              {props.blogItem.datetime}
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
        {props.blogItem.tags.map((value) => {
          const hashtagValue = `#${value}`;
          return (
            <Tags key={uuid()} hashtagValue={hashtagValue} value={value} />
          );
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

export default Blogitem;
