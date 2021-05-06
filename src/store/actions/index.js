// import { createAction } from "@reduxjs/toolkit";
// import { createAction } from "@reduxjs/toolkit";
// import * as types from "../../constant/actionTypes";
import * as services from "../../services/firebaseService";
// export const authUser = createAction(types.AUTH_USERID);
// export const readBlog = createAction(types.READ_DATA);

// export const authUser = (payload) => ({
//   type: types.AUTH_USERID,
//   payload,
// });
// const authUser = (user) => ({
//   type: types.AUTH_USERID,
//   user,
// });

// export const readBlog = (payload) => ({
//   type: types.READ_DATA,
//   payload,
// });

export const handleSavedBlogItem = (blogItem, copySaved, id) => {
  services.handleSave(blogItem, copySaved, id);
};

export const handleLikeBlogItem = (blogItem, copyLikes, id) => {
  services.handleLike(blogItem, copyLikes, id);
};

// export const handleSubmitComment = (blogItem, copyComments, id) => {
//   services.handleComment(blogItem, copyComments, id);
// };

// export const readDataFromFireBase = () => services.readData();

export const logIn = (email, password) => services.logIn(email, password);
export const logOut = () => services.logOut();

export const handleSignUp = (email, password) =>
  services.handleSignUp(email, password);
