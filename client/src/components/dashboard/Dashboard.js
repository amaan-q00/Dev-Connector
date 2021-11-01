import React, {
  Fragment,
  useEffect
} from 'react'
import {
  Link
} from 'react-router-dom'
import {
  connect
} from 'react-redux'
import {
  getCurrentProfile,
  deleteAccount
} from '../../actions/profile'
import Experience from './Experience'
import Education from './Education'
import {Spinner} from '../layout/Spinner'
import DashboardActions from './Dashboard-Actions'

const Dashboard = ({
  deleteAccount,
  getCurrentProfile, auth: {
    user
  }, profile
})=> {
  useEffect(()=> {
    getCurrentProfile()
  }, [getCurrentProfile])

  return (profile.loading && profile.profile === null ? <Spinner />:
    <Fragment>
  <h1 className="large text-primary">Dashboard </h1>
  <p className="lead">
  <i className="fas fa-user"></i>{" "}Welcome {user && user.name}
    </p>
  {(profile.profile !== null) ? <Fragment>
  {(profile.profile.avatar) ? <img src={profile.profile.avatar} alt="" style={{width:"50%",height:"50%"}} className="m-2" /> : 
  <i className="fa fa-user fa-10x round-img m-2"  />
  }
  <DashboardActions />
  <Experience experience={profile.profile.experience} />
  <Education education={profile.profile.education} />
  <div className="my-2">
    <button className="btn btn-danger" onClick={()=>deleteAccount()}>
      <i className="fas fa-user-minus"></i>{" "}Delete My Account
    </button>
      </div>
  </Fragment>:
      <Fragment>
  <p>
You have not set up a profile, please add some information
      </p>
  <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
    </Fragment>}
  </Fragment>
  )

}

const mapStatetoProps = (state) =>({
  auth: state.auth,
  profile: state.profile
})
export default connect(mapStatetoProps, {
  getCurrentProfile, deleteAccount
})(Dashboard)