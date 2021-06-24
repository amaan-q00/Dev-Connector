import React, {
  useEffect,
  Fragment
} from 'react'
import {
  getProfiles
} from '../../actions/profile'
import {Spinner} from '../layout/Spinner'
import {
  connect
} from 'react-redux'
import ProfileItem from './ProfileItem'

const Profiles = ({
  getProfiles, profile
})=> {
  useEffect(()=> {
    getProfiles()
  }, [getProfiles])
  return (
    (profile.loading) ? <Spinner /> :
    <Fragment>
  <h1 className="large text-primary">Developers</h1>
  <p className="lead">
    <i className="fab fa-connectdevelop"></i>
    Browse and connect with Developers
    </p>
  <div className="profiles">
  
   {profile.profiles.length > 0 ? (
        profile.profiles.map(eachprofile=>
        
       (<ProfileItem key={eachprofile._id} profile={eachprofile} />)
          
        )
      ): <h4>No Profiles Found...</h4>}
    </div>
 </Fragment>
  )

}
const mapStatetoProps = state => ({
  profile: state.profile
})
export default connect(mapStatetoProps, {
  getProfiles
})(Profiles)