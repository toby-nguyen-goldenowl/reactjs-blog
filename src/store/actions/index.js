// import { createAction } from "@reduxjs/toolkit";
import * as types from "../constants/actionTypes";
import * as services from "../../services/firebaseService";
// const authUser = createAction(types.AUTH_USERID);

export const authUser = (payload) => ({
  type: types.AUTH_USERID,
  payload,
});
// const authUser = (user) => ({
//   type: types.AUTH_USERID,
//   user,
// });

export const readBlog = (payload) => ({
  type: types.READ_DATA,
  payload,
});

export const handleSavedBlogItem = (blogItem, copySaved, id) => {
  services.handleSave(blogItem, copySaved, id);
};

export const handleLikeBlogItem = (blogItem, copyLikes, id) => {
  services.handleLike(blogItem, copyLikes, id);
};

export const handleSubmitComment = (blogItem, copyComments, id) => {
  services.handleComment(blogItem, copyComments, id);
};

export const readDataFromFireBase = () => services.readData();

export const handleCreatePost = (
  blogId,
  userId,
  author,
  tags,
  title,
  body,
  datetime
) => services.createPost(blogId, userId, author, tags, title, body, datetime);
