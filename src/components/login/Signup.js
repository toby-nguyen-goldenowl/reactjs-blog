import React, { useCallback } from "react";
import { Formik } from "formik";
import "./style.css";
import { sha256 } from "js-sha256";
import { useHistory } from "react-router-dom";
import { handleSignUp } from "../../services/firebaseService";

const LogUp = ({ children }) => {
  const history = useHistory();
  const handleFormSignup = useCallback(async (values) => {
    const { email } = values;
    const password = sha256(values.password);
    try {
      await handleSignUp(email, password);
      history.push("/home");
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return (
    <>
      <div>
        <h1>Log Up</h1>
        <Formik
          initialValues={{ email: "", password: "", cfpassword: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            } else if (values.password.length < 6) {
              errors.password = "Password should be at least 6 characters";
            } else if (
              values.cfpassword !== values.password &&
              values.password !== ""
            ) {
              errors.cfpassword = "Password not same. Please re-enter";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleFormSignup(values);
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
                  <label htmlFor="cfpwd">
                    Confirm Password:
                    <input
                      id="cfpwd"
                      className="ippassword"
                      type="password"
                      name="cfpassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cfpassword}
                    />
                  </label>
                  {errors.cfpassword && touched.cfpassword && errors.cfpassword}
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
      {children}
    </>
  );
};

export default LogUp;
