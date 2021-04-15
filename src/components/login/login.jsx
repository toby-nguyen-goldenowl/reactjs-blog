import React from "react";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import "./style.css";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "../../configdb/firebaseConfig";
import { connect } from "react-redux";
import { sha256 } from "js-sha256";
import authUser from "../../store/actions/index";

// import { connect } from "react-redux";

async function HandleFormLogin(values, authUserId) {
  const { email } = values;
  const password = sha256(values.password);
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      authUserId(result.user.uid);
    });
}

const LogIn = (props) => {
  const history = useHistory();
  const { authUserId } = props;
  return (
    <>
      <div>
        <h1>Sign In</h1>
        <Formik
          initialValues={{ email: "", password: "", isLoggedIn: false }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            values.isLoggedIn = true;
            HandleFormLogin(values, authUserId).then(() => history.push("/"));
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <div className="container">
              <form className="form-login" onSubmit={handleSubmit}>
                <div className=".form-content">
                  <label htmlFor="email">
                    Email:
                    <input
                      id="email"
                      className="ipemail"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </label>
                  {errors.email && touched.email && errors.email}
                  <label htmlFor="pwd">
                    Password:
                    <input
                      id="pwd"
                      className="ippassword"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </label>
                  {errors.password && touched.password && errors.password}
                  <button
                    className="btnSubmit"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  authUserId: authUser,
};

const mapStateToProps = (state) => ({
  userId: state.user.userId,
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
