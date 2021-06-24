import React,{useState} from 'react'
import {
  connect
} from 'react-redux'
import {
  addPost
} from '../../actions/post'

const PostForm=({addPost})=>{
 const [text,setText] = useState('')
 const changeHandler=(e)=>{
   setText(e.target.value)
 }
 const submitHandler=(e)=>{
   e.preventDefault()
   addPost({text})
   setText('')
 }
  return (
     <div className="post-form">

        <div className="bg-primary p">

          <h3>Say Something...</h3>
        </div>
        <form onSubmit={submitHandler} className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            onChange={changeHandler}
            value={text}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}


export default connect(null, {
  addPost}
  )(PostForm)