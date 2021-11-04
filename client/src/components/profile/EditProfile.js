import React, {
  useState,
  Fragment,
  useEffect
} from 'react';
import {
  connect
} from 'react-redux'
import {Spinner} from '../layout/Spinner'
import {
  createProfile,
  getCurrentProfile
} from '../../actions/profile'
import {
  Link,
  withRouter
} from 'react-router-dom'
const EditProfile = ({
  profile: {
    profile, loading
  },
  createProfile, history,
  getCurrentProfile
})=> {
  const [cloading,setLoading]= useState(false)
  const [someData,
    setFormData] = useState({
      avatar: null,
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      youtube: ''
    })
  const {
    avatar,
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    instagram,
    linkedin,
    youtube
  } = someData
  const [displaySocial,
    setSocialDisplay] = useState(false)
  useEffect(()=> {
    getCurrentProfile();

    setFormData({
      company: loading || !profile.company ? '': profile.company,
      website: loading || !profile.website ? '': profile.website,
      location: loading || !profile.location ? '': profile.location,
      status: loading || !profile.status ? '': profile.status,
      skills: loading || !profile.skills ? '': profile.skills.join(','),
      bio: loading || !profile.bio ? '': profile.bio,
      githubusername: loading || !profile.githubusername ? '': profile.githubusername,
      youtube: loading || !profile.youtube ? '': profile.youtube,
      instagram: loading || !profile.instagram ? '': profile.instagram,
      linkedin: loading || !profile.linkedin ? '': profile.linkedin,
      facebook: loading || !profile.facebook ? '': profile.facebook,
      twitter: loading || !profile.twitter ? '': profile.twitter
    })
  }, [loading,getCurrentProfile])

  const changeHandler = (e)=> {
    setFormData({
      ...someData, [e.target.name]: e.target.value
    })
  }
  const avatarChange=(e)=>{
          setFormData({
           ...someData, avatar: e.target.files[0]
            
          })
  }
  const submitHandler = async (e)=> {
    e.preventDefault()
    setLoading(true)
   const formData = new FormData();
   formData.append('avatar',avatar)
   formData.append('company',company);
   formData.append('website', website);
   formData.append('location',location);
   formData.append('status',status);
   formData.append('skills', skills);
   formData.append('githubusername',githubusername);
   formData.append('bio',bio);
   formData.append('twitter',twitter);
   formData.append('facebook',facebook);
   formData.append('instagram',instagram);
   formData.append('linkedin',linkedin)
   formData.append('youtube',youtube)
  await createProfile(formData, history, true)
  setLoading(false)
  
    
  }
  return  (cloading ? <Spinner /> :
    <Fragment>

      <h1 className="large text-primary">

        Edit Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i>&nbsp;&nbsp;&nbsp;Let's get some information to make your
        profile stand out
    </p>
      <small>* = required field</small>
      <form className="form" id="form" onSubmit={submitHandler}>
            <div className="form-group">
          <input type="file" accept="image/*" name="avatar" onChange={avatarChange} />
          <small className="form-text"
          >Please upload a picture (2 MB or less)</small
        >
        </div>
        <div className="form-group">
          <select name="status" value={status} onChange={changeHandler}>
            <option value="">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
        >Give us an idea of where you are at in your career</small
        >
      </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={changeHandler} />
          <small className="form-text"
          >Could be your own company or one you work for</small
        >
      </div>
        <div className="form-group">
          <input type="url" placeholder="Website" name="website" value={website} onChange={changeHandler} />
          <small className="form-text"
          >Could be your own or a company website</small
        >
      </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={changeHandler} />
          <small className="form-text"
          >City & state suggested (eg. Boston, MA)</small
        >
      </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={changeHandler} />
          <small className="form-text"
          >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
        >
      </div>
        <div className="form-group">
          <input
        type="text"
        placeholder="Github Username"
        name="githubusername"
        value={githubusername} onChange={changeHandler} />
          <small className="form-text"
          >If you want your latest repos and a Github link, include your
            username</small
        >
      </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={changeHandler}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
      </div>

        <div className="my-2">
          <button onClick={()=> { setSocialDisplay(!displaySocial)}} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
      </div>
      {displaySocial && <Fragment>
             <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="url" placeholder="Twitter URL" name="twitter" value={twitter} onChange={changeHandler} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="url" placeholder="Facebook URL" name="facebook" value={facebook} onChange={changeHandler} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="url" placeholder="YouTube URL" name="youtube" value={youtube} onChange={changeHandler} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="url" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={changeHandler} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="url" placeholder="Instagram URL" name="instagram" value={instagram} onChange={changeHandler} />
        </div>
      </Fragment>}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
    </form>
    </Fragment>
  )
}
const mapStatetoProps = (state)=>({
  profile: state.profile
})
export default connect(mapStatetoProps, {
  createProfile, getCurrentProfile
})(withRouter(EditProfile))