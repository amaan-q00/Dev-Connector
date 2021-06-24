import React,{useEffect} from 'react'
import {Spinner} from '../layout/Spinner'
import {connect} from 'react-redux'
import {getRepos} from '../../actions/profile'
const ProfileGithub=({username,getRepos,repos})=>{
  useEffect(()=>{
    getRepos(username)
  },[getRepos])
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
    {repos === null ? <Spinner /> : 
    repos.map(repo => (
    <div key={repo._id} className="repo bg-white p-1 my-1">
      <div>
      <h4>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
      </h4>
     
      <p>{repo.description}</p>
      </div>
      
       <div>
       <ul>
     <li key={1} className="badge badge-primary">Stars: {repo.stargazers_count}</li>
     <li key={2} className="badge badge-dark">Watchers: {repos.watchers_count}</li>
     <li key={3} className="badge badge-light">Forks: {repo.forks_count}</li>
      </ul>
      </div>
    </div>
    ))
    }
    </div>
    )
}
const mapStatetoProps=state=>({
  repos: state.profile.repos
})
export default connect(mapStatetoProps,{getRepos})(ProfileGithub)