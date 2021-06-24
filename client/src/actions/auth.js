import axios from 'axios'
import {
  setAlert
} from './alert'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types'

import setAuthToken from '../utils/setAuthToken'



export const loadUser = ()=>async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    let res = await axios.get('/api/auth')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: AUTH_FAILED,

    })
  }
}
export const register = ({
  name, email, password
})=> async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({
    name, email, password
  })
  try {
    let res = await axios.post('/api/users', body, config)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    dispatch (loadUser())
    dispatch(setAlert('User Registered Successfully', 'success'))
  } catch (e) {
    const errors = e.response.data.errors
    if (errors) {
      errors.forEach(error=>dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

//login
export const login = (
  email, password
)=> async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({
    email, password
  })
  try {
    let res = await axios.post('/api/auth/login', body, config)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (e) {
    const errors = e.response.data.errors
    if (errors) {
      errors.forEach(error=>dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

//logout
export const logOut = ()=> dispatch=> {
  dispatch({
    type: CLEAR_PROFILE
  })
  dispatch({
    type: LOGOUT
  })
}