import React from "react";
// import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "../../configdb/firebaseConfig";
import { Link } from "react-router-dom";
import "./style.css";

const Blogitem = (props) => (
  <main className="main">
    <div className="itemContent">
      <div className="imgContent">
        <Link to="/">
          <img
            // eslint-disable-next-line max-len
            src={props.url}
            alt=""
            height="273px"
            width="651px"
          />
        </Link>
      </div>
      <div className="content">
        <div className="author">{props.blogItem.author}</div>
        <div className="title">{props.blogItem.title}</div>
        <div className="content-text">{props.blogItem.body}</div>
      </div>
    </div>
  </main>
);

export default Blogitem;
