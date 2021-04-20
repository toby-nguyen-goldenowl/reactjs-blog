import React from "react";

const CreateBlog = (props) => {
  // create refs
  const authorRef = React.createRef();
  const titleRef = React.createRef();
  const contentRef = React.createRef();
  const categoryRef = React.createRef();

  const createPost = (e) => {
    e.preventDefault();

    const post = {
      author: authorRef.current.value,
      title: titleRef.current.value,
      body: contentRef.current.value,
      category: categoryRef.current.value,
    };

    props.createPost(post);
  };
  return (
    <form onSubmit={createPost} className="col-md-10">
      <legend className="text-center">Create New Post</legend>

      <div className="form-group">
        <label>
          Title for the Post:
          <input
            type="text"
            ref={titleRef}
            className="form-control"
            placeholder="Title.."
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Author:
          <input
            type="text"
            ref={authorRef}
            className="form-control"
            placeholder="Tag your name.."
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Content:
          <textarea
            className="form-control"
            rows="7"
            cols="25"
            ref={contentRef}
            placeholder="Here write your content.."
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Category
          <select ref={categoryRef} className="form-control">
            <option value="cars">Cars</option>
            <option value="nature">Nature</option>
            <option value="it">IT</option>
            <option value="books">Books</option>
            <option value="sport">Sport</option>
          </select>
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default CreateBlog;
