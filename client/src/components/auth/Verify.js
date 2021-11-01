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
  verify
} from '../../actions/auth'
const Verify = (props)=> {
  const [formData,
    setformData] = useState({
      email: '', token: ''
    })
  const {
    email,
    token,
  } = formData
  const onChangeHandler = (e)=> {
    setformData({
      ...formData, [e.target.name]: e.target.value
    })
  }
  const submitHandler = async (e)=> {
    e.preventDefault()
    props.verify(email, token)
  }

  //redirect if login success
  if (props.isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  return(
    <>
    <h1 className="large text-primary">Verify</h1>

    <p className="lead">
      <i className="fas fa-user"></i> Verify Your Account
    </p>
    <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input type="email" value={email} onChange={onChangeHandler} placeholder="Email Address" name="email" />
    </div>
        <div className="form-group">
          <input
      type="text"
      value={token}
      onChange={onChangeHandler}
      placeholder="Token"
      name="token"
      />
    </div>
        <input type="submit" className="btn btn-primary" value="Verify" />
    </form>
    <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
    </p>
     <p className="my-1">
        Already verified? <Link to="/login">Log In</Link>
    </p>< />
  )
}
const mapStatetoProps = (state)=>({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStatetoProps, {
  verify, setAlert
})(Verify)