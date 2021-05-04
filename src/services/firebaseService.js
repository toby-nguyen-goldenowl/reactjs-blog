import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "../configdb/firebaseConfig";

export const handleSave = (blogItem, saved, id) => {
  const dataBlogs = firebase.database().ref(`blogs/${id}`);
  dataBlogs.set({
    ...blogItem,
    saved,
  });
};

export const handleLike = (blogItem, likes, id) => {
  const dataBlogs = firebase.database().ref(`blogs/${id}`);
  dataBlogs.set({
    ...blogItem,
    likes,
  });
};

export const readData = async () => {
  const dataBlogs = firebase.database().ref("blogs");
  const result = await dataBlogs
    .once("value")
    .then((snapshot) => snapshot.val());
  return result;
};

export const handleComment = (data, comments, id) => {
  const dataBlog = firebase.database().ref(`blogs/${id}`);
  dataBlog.set({
    ...data[id],
    comments,
  });
};

export const createPost = async (
  blogId,
  userId,
  author,
  tags,
  title,
  body,
  datetime
) => {
  const dataUser = firebase.database().ref(`blogs/${blogId}`);
  const data = await dataUser.set({
    userId,
    author,
    tags,
    title,
    body,
    datetime,
  });
  return data;
};
