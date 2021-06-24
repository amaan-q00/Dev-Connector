import React, {
  useState
} from 'react'
import {
  Link,
  Redirect
} from 'react-router-dom'
import {
  connect
} from 'react-redux'
import {
  setAlert
} from '../../actions/alert'
import {
  login
} from '../../actions/auth'
const Login = (props)=> {
  const [formData,
    setformData] = useState({
      email: '', password: ''
    })
  const {
    email,
    password,
  } = formData
  const onChangeHandler = (e)=> {
    setformData({
      ...formData, [e.target.name]: e.target.value
    })
  }
  const submitHandler = async (e)=> {
    e.preventDefault()
    props.login(email, password)
  }

  //redirect if login success
  if (props.isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  return(
    <>
    <h1 className="large text-primary">Sign In</h1>

    <p className="lead">
      <i className="fas fa-user"></i> Log In to Your Account
    </p>
    <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input type="email" value={email} onChange={onChangeHandler} placeholder="Email Address" name="email" />
    </div>
        <div className="form-group">
          <input
      type="password"
      value={password}
      onChange={onChangeHandler}
      placeholder="Password"
      name="password"
      minLength="6"
      />
    </div>
        <input type="submit" className="btn btn-primary" value="Login" />
    </form>
    <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
    </p> < />
  )
}
const mapStatetoProps = (state)=>({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStatetoProps, {
  login, setAlert
})(Login)