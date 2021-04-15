import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import * as env from "../../constant-env/index";
const Home = (props) => {
  const url = `${env.URL_PUBLIC}/img/imgblog1.png`;
  return (
    <>
      <div className="page-content-inner">
        <div className="sidebar-wrapper-left">left</div>
        <main className="main">
          <div className="itemContent">
            <div className="imgContent">
              <Link to="/">
                <img
                  // eslint-disable-next-line max-len
                  src={url}
                  alt=""
                  height="273px"
                  width="651px"
                />
              </Link>
            </div>
            <div className="content">
              <div className="author">Stokry</div>
              <div className="content-text">
                Hyperparameter Tuning: Understanding Grid Search☘
              </div>
            </div>
          </div>
        </main>
        <div className="sidebar-wrapper-right">right</div>
      </div>
      {props.children}
    </>
  );
};
export default Home;
