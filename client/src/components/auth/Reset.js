import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { reset } from "../../actions/auth";

const Reset = (props) => {
  const [formData, setformData] = useState({
    token: "",
    password: "",
  });
  const { password, token } = formData;
  const onChangeHandler = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    props.reset(token, password, props.history);
  };

  //redirect if login success
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <h1 className="large text-primary">Reset Password</h1>

      <p className="lead">
        <i className="fas fa-user"></i> Reset Password
      </p>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            value={token}
            onChange={onChangeHandler}
            placeholder="Token"
            name="token"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={onChangeHandler}
            placeholder="New Password"
            name="password"
            minLength="6"
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Reset Password"
        />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
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
  reset,
  setAlert,
})(Reset);
