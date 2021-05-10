/* eslint-disable jsx-a11y/label-has-for */
import React, { useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { handleCreatePost } from "../../store/reducers/blogReducer";

const CreateBlog = () => {
  // create refs
  const authorRef = React.createRef();
  const titleRef = React.createRef();
  const contentRef = React.createRef();
  const tagsRef = React.createRef();

  const userId = useSelector((state) => state.user.userId);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const NotifiSuccess = () => (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Blog</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>You successfully post Blog </p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            setSuccess(false);
          }}
        >
          <Link to="/home" className="text-white">
            Home
          </Link>
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );

  const createPost = async (e) => {
    e.preventDefault();
    const tags = tagsRef.current.value.split(",");
    const blogId = new Date().valueOf();
    try {
      await dispatch(
        handleCreatePost({
          blogId,
          userId,
          author: authorRef.current.value,
          tags,
          title: titleRef.current.value,
          body: contentRef.current.value,
          datetime: blogId,
        })
      );
      setSuccess(true);
    } catch (error) {
      alert(error.message);
      setSuccess(false);
    }
  };
  if (success) return <NotifiSuccess />;
  return (
    <form onSubmit={createPost} className="createblog">
      <legend className="text-center">Create New Post</legend>
      <div className="mainCreate">
        <div className="form-group">
          <label htmlFor="title" className="labelContent">
            Title for the Post:
          </label>
          <div className="ip-form-control">
            <input
              id="title"
              type="text"
              ref={titleRef}
              className="form-control"
              placeholder="Title.."
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="tags" className="labelContent">
            Tags:
          </label>
          <div className="ip-form-control">
            <input
              id="tags"
              type="text"
              ref={tagsRef}
              className="form-control"
              placeholder="tags.."
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="author" className="labelContent">
            Author:
          </label>
          <div className="ip-form-control">
            <input
              id="author"
              type="text"
              ref={authorRef}
              className="form-control"
              placeholder="Tag your name.."
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="content" className="labelContent">
            Content:
          </label>
          <div className="ip-form-control">
            <textarea
              id="content"
              className="form-control"
              rows="7"
              cols="25"
              ref={contentRef}
              placeholder="Here write your content.."
            />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default CreateBlog;
