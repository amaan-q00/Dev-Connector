import React,{Fragment,useEffect} from 'react'
import {
  connect
} from 'react-redux'
import {
  getPosts
} from '../../actions/post'
import PostItem from './PostItem'
import PostForm from './PostForm'
import{ Spinner } from '../layout/Spinner'

const Posts=({post:{posts,loading},getPosts})=>{
  useEffect(()=>{
    getPosts()
  },[getPosts])
  return (
    loading ? <Spinner /> :
    <Fragment>
    <h1 className="large text-primary">Posts</h1>
    <p className='lead'>
    <i className="fas fa-user"></i> Welcome to the community!
    </p>
   <PostForm />
    <div className="posts">
    {posts.map(post=>(
    <PostItem key={post._id} post={post} />
    ))}
    </div>
   
    </Fragment>
    )
}


const mapStatetoProps = (state) =>({
  post: state.post
})
export default connect(mapStatetoProps, {
  getPosts}
  )(Posts)