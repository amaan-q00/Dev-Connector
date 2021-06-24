import React from 'react'
import {
  connect
} from 'react-redux'
import Moment from 'react-moment'
import {
  deleteEducation
} from '../../actions/profile'
const Education = ({
  education, deleteEducation
})=> {
  const educations = education.map(edu=>(
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment>{" - "} {edu.to === null ? ('Now'): (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)}
      </td>
      <td>
      <button onClick={()=>deleteEducation(edu._id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ))
  return(
    <>
    <h1 className="my-2">Education Credentials</h1>
    <table className="table">
      <thead>
      <tr>
        <th>School</th>
         <th className="hide-sm">Degree</th>
         <th className="hide-sm">Years</th>
         <th />
      </tr>
    </thead>
    <tbody>
    {educations}
    </tbody>
    </table> < />
  )
}
export default connect(null, {
  deleteEducation
})(Education)