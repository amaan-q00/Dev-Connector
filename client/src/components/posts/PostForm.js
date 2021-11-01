import React,{useState} from 'react'
import {Spinner} from '../layout/Spinner'
import {
  connect
} from 'react-redux'
import {
  addPost
} from '../../actions/post'

const PostForm=({addPost})=>{
  let [load,setLoad] = useState(false)
 const [formData,setFormData] = useState({
   image: null, text: ''
 })
 const changeHandler=(e)=>{
       setFormData({
      ...formData, [e.target.name]: e.target.value
    })
 }
 const imageChange=(e)=>{
          setFormData({
           ...formData, image: e.target.files[0]
          })
  }
 const submitHandler=async (e)=>{
   e.preventDefault()
   setLoad(true)
   const fd = new FormData();
   fd.append('image',formData.image)
   fd.append('text',formData.text);
   await addPost(fd)
   setFormData({image: null, text: ''})
   setLoad(false)
 }
  return (load ? <Spinner /> :
  <>
     <div className="post-form">

        <div className="bg-primary p">

          <h3>Say Something...</h3>
        </div>
        <form onSubmit={submitHandler} className="form my-1">
        <div className="form-group">
          <input type="file" accept="image/*" name="image" onChange={imageChange} />
          <small className="form-text"
          >Please upload a picture (2 MB or less)</small
        >
        </div>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            onChange={changeHandler}
            value={formData.text}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      </>
    )
}


export default connect(null, {
  addPost}
  )(PostForm)