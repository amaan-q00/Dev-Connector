import React from 'react'
import {
  Redirect,
  Route
} from 'react-router-dom'
import {
  connect
} from 'react-redux'
const PrivateRoute = ({
  component: Component, auth, ...rest
})=><Route {...rest} render={props=> !auth.isAuthenticated && !auth.loading ? (<Redirect to="/login" />): (<Component {...props} />)} />
const mapStatetoProps = (state)=>({
  auth: state.auth
})
export default connect(mapStatetoProps)(PrivateRoute)