import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Alert from '../layout/Alert'
import Dashboard from '../dashboard/Dashboard'
import NotFound from '../layout/NotFound'
import CreateProfile from '../profile/CreateProfile'
import EditProfile from '../profile/EditProfile'
import AddExperience from '../profile/AddExperience'
import AddEducation from '../profile/AddEducation'
import Profiles from '../profiles/Profiles'
import ProfileInfo from '../profileInfo/ProfileInfo'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import PrivateRoute from '../route/PrivateRoute'

const Routes=()=>{
  return (
          <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile/:id" component={ProfileInfo} />
        <Route exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path='/post/:id' component={Post} />
        <Route component={NotFound} />
       
      </Switch>
    </section>
    )
}



export default Routes