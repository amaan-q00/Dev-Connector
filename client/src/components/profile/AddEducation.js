import React, {
  Fragment,
  useState
} from 'react'
import {
  connect
} from 'react-redux'
import {
  Link,
  withRouter
} from 'react-router-dom'
import {
  addEducation
} from '../../actions/profile'
const AddEducation = ({
  addEducation, history
})=> {
  const [formData,
    setFormData] = useState({
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: ''
    })
  const [toDisabled,
    settoDisabled] = useState(false)
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData

  const changeHandler = (e)=> {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }
  const submitHandler = (e)=> {
    e.preventDefault()
    addEducation(formData, history)
  }
  return(
    <Fragment>
      <h1 className="large text-primary">

       Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any School or Degree/Institution that you have Attended.
    </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input type="text" placeholder="School" name="school" value={school} onChange={changeHandler} required />
      </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={changeHandler} required />
      </div>
        <div className="form-group">
          <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={changeHandler} />
      </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={changeHandler} />
      </div>
         <div className="form-group">
          <p>
          <input type="checkbox" name="current" value={current} onChange={()=> {
          setFormData({ ...formData, current: !current })
          settoDisabled(!toDisabled)
        }} />{" "} Current Education
        </p>
      </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={changeHandler} disabled={toDisabled ? 'disabled': ''} />
      </div>
        <div className="form-group">
          <textarea
          name="description"
          cols="30"
          rows="5"
          placeholder="Program Description"
          value={description} onChange={changeHandler}
          ></textarea>
      </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
    </form>
    </Fragment>
  )
}
export default connect(null, {
  addEducation
})(withRouter(AddEducation))