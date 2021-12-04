import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { forgot } from "../../actions/auth";
const Forgot = (props) => {
  const [formData, setformData] = useState({
    email: "",
  });
  const { email } = formData;
  const onChangeHandler = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    props.forgot(email, props.history);
  };

  //redirect if login success
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <h1 className="large text-primary">Forgot Password</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Enter e-mail to recover your account
      </p>

      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={onChangeHandler}
            placeholder="Email Address"
            name="email"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Send Mail" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      <p className="my-1">
        Already registered? <Link to="/verify">Verify</Link>
      </p>
    </>
  );
};
const mapStatetoProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStatetoProps, {
  forgot,
  setAlert,
})(Forgot);
