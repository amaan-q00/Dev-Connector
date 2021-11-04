import React,{Fragment,useEffect} from 'react'
import {
  connect
} from 'react-redux'
import {
  getPost
} from '../../actions/post'
import {Link} from 'react-router-dom'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import{ Spinner } from '../layout/Spinner'

const Post=({post:{post,loading},getPost,match})=>{
  useEffect(()=>{
    getPost(match.params.id)
  }, [getPost,match.params.id])
  return loading || post === null ? <Spinner /> :
  <Fragment>
  <Link to="/posts" className="btn">
  Back to Posts
  </Link>
  <PostItem post={post} showActions={false}/>
   <CommentForm postId={post._id} />
    <div className="comments">
    {
    post.comments.slice(0).reverse().map(comment =>
    <CommentItem key={comment._id} comment={comment} postId={post._id} />
    )
    }
    </div>
  </Fragment>
    
}


const mapStatetoProps = (state) =>({
  post: state.post
})
export default connect(mapStatetoProps, {
  getPost}
  )(Post)