import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from './types'
import {
  setAlert
} from './alert'
import axios from 'axios'
export const getCurrentProfile = ()=> async dispatch=> {
  try {
    const res = await axios.get('/api/profile/me')
    dispatch ({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText, status: e.response.status
      }
    })
  }
}


//get All profiles
export const getProfiles = ()=> async dispatch=> {
   dispatch({
    type: CLEAR_PROFILE
  })
  try {
    const res = await axios.get('/api/profile')
    dispatch ({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText, status: e.response.status
      }
    })
  }
}

//get profile by id
export const getProfileById = (userId)=> async dispatch=> {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`)
    dispatch ({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText, status: e.response.status
      }
    })
  }
}

////get github repos
export const getRepos = (username)=> async dispatch=> {
  try {
    const res = await axios.get(`/api/profile/github/${username}`)
    dispatch ({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText, status: e.response.status
      }
    })
  }
}

//create and update profile
export const createProfile = (formData, history, edit = false)=>async dispatch => {
  try {
const config = { headers: { 'Content-Type': `multipart/form-data`} }
    const res = await axios.post('/api/profile', formData,config)
    dispatch ({
      type: GET_PROFILE,
      payload: res.data
    })
    dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created', 'success'))

    history.push('/dashboard')


  } catch (e) {
    const errors = e.response.data.errors
    if (errors) {
      errors.forEach(error=>dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText, status: e.response.status
      }
    })
  }
}
//add experience
export const addExperience = (formData, history)=>async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put('/api/profile/experience', formData, config)
    dispatch ({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Experience Added', 'success'))

    history.push('/dashboard')


  } catch (e) {
    const errors = e.response.data.errors
    if (errors) {
      errors.forEach(error=>dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText, status: e.response.status
      }
    })
  }
}

//add education
export const addEducation = (formData, history)=>async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put('/api/profile/education', formData, config)
    dispatch ({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Education Added', 'success'))

    history.push('/dashboard')


  } catch (e) {
    const errors = e.response.data.errors
    if (errors) {
      errors.forEach(error=>dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText, status: e.response.status
      }
    })
  }
}

//delete Experience

export const deleteExperience = (id)=>async dispatch=> {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`)
    dispatch ({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Experience Removed', 'success'))
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText, status: e.response.status
      }
    })
  }
}

//delete Education

export const deleteEducation = (id)=>async dispatch=> {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)
    dispatch ({
      type: UPDATE_PROFILE,
      payload: res.data
    })
    dispatch(setAlert('Education Removed', 'success'))
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText, status: e.response.status
      }
    })
  }
}

//delete account and profile

export const deleteAccount = ()=>async dispatch=> {
  if (window.confirm("ARE YOU SURE TO DELETE?")) {
    try {
      await axios.delete(`/api/profile`)
      dispatch ({
        type: CLEAR_PROFILE
      })
      dispatch ({
        type: ACCOUNT_DELETED
      })
      dispatch(setAlert('Account has been Deleted'))
    } catch (e) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: e.response.statusText, status: e.response.status
        }
      })
    }
  }
}