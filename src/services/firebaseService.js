import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "../config/firebase";

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

export const readDataFromFireBase = () => {
  const dataBlogs = firebase.database().ref("blogs");
  const result = dataBlogs.once("value").then((snapshot) => snapshot.val());
  return result;
};

export const handleComment = (data, comments, id) => {
  const dataBlog = firebase.database().ref(`blogs/${id}`);
  dataBlog.set({
    ...data[id],
    comments,
  });
};

export const createPost = ({
  blogId,
  userId,
  author,
  tags,
  title,
  body,
  datetime,
}) => {
  const dataUser = firebase.database().ref(`blogs/${blogId}`);
  const data = dataUser.set({
    userId,
    author,
    tags,
    title,
    body,
    datetime,
  });
  return data;
};

export const logIn = async (email, password) => {
  const result = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  return result;
};

export const logOut = async () => {
  await firebase.auth().signOut();
};

export const handleSignUp = async (email, password) => {
  const result = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((value) => {
      const dataUser = firebase.database().ref(`users/${value.user.uid}`);
      dataUser.set({
        email,
      });
      return true;
      // window.location = "/signup/success-signin";
    })
    .catch(() => false);
  return result;
};
