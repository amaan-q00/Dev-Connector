import React from 'react'
import Moment from 'react-moment'
const ProfileExperience=(
  {experience:{
    company, title, location, from,to,current, description
  }})=>{
  return (
    <>
    <h3 className="text-dark">{company}</h3>
   <p>
   <Moment format="DD/MM/YYYY">{from}</Moment> - {!to ? 'Now' : <Moment format="DD/MM/YYYY">{to}</Moment>}
   </p> 
   <p>
   <strong>Position: </strong>{title}
   </p>
     <p>
   <strong>Description: </strong>{description}
   </p>
    </>
    )
}
export default ProfileExperience