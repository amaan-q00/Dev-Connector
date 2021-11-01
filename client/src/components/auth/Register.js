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
  register
} from '../../actions/auth'

const Register = ({register,isAuthenticated,history,setAlert})=> {
  //console.log(props)
  const [formData,
    setformData] = useState({
      name: '', email: '', password: '', password2: ''
    })
  const {
    name,
    email,
    password,
    password2
  } = formData
  const onChangeHandler = (e)=> {
    setformData({
      ...formData, [e.target.name]: e.target.value
    })
  }
  const submitHandler = async (e)=> {
    e.preventDefault()
    if (password !== password2) {
      setAlert('Passwords not matched', 'danger')
    } else {
      register({
        name, email, password,history
      })
    }
  }
  //success redirect
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  return(
    <>
    <h1 className="large text-primary">Sign Up</h1>

    <p className="lead">
      <i className="fas fa-user"></i> Create Your Account
    </p>
    <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input type="text" value={name} onChange={onChangeHandler} placeholder="Name" name="name" />
    </div>
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

      />
    </div>
        <div className="form-group">
          <input
      type="password"
      value={password2}
      onChange={onChangeHandler}
      placeholder="Confirm Password"
      name="password2"

      />
    </div>
        <input type="submit" className="btn btn-primary" value="Register" />
    </form>
    <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
    </p> 
     <p className="my-1">
        Already registered? <Link to="/verify">Verify</Link>
    </p>
    < />
  )
}
const mapStatetoProps = (state)=>({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStatetoProps, {
  setAlert, register
})(Register)