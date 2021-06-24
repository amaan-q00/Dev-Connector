import React from 'react'
import {
  connect
} from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {
  removeComment
} from '../../actions/post'

const CommentItem=({
  removeComment,
  auth,
  postId,
  comment:{_id,text,name,avatar,user,date}
})=>{
  return (
     <div className="post bg-white p-1 my-1">

        <div>

          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {text}
          </p>
             <p class="post-date">

                Posted on <Moment format="DD/MM/YYYY">{date}</Moment>

            </p>
            {!auth.loading && user === auth.user._id && (
          <button className="btn btn-danger" onClick={e=>removeComment(postId,_id)} type='button'>
          <i className="fas fa-times"></i>
          </button>
            )}
        </div>
      </div>
    )
}


const mapStatetoProps = (state) =>({
  auth: state.auth
})
export default connect(mapStatetoProps, {removeComment}
  )(CommentItem)