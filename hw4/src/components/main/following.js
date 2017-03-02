import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { addFollowers, getFollowers, removeFollower} from './followingActions'

//React component for follower side bar
// const times = "w";
// const Follower = ({name, avatar, headline}) => {
// 	return (
// 	<div className="row text-center">
// 		<br/>
// 		<img src = {avatar} style = {{width:"100px", height:"100px"}}/>
// 		<br/>
// 		<p>{name}</p>
// 		<p>{headline}</p>
// 		<button type="button" className="btn btn-danger">Unfollow</button>
// 	</div>
// )
// }


const Following = ({dispatch, followers}) =>  {
		console.log("xxxxxxxxxx")
		let name;
		let newFollower;
		let list = Object.keys(followers).map((username, index) => {
		return (
			<div className="panel panel-default" key={username}>
				<div className="panel-body">
					<img src={followers[username].avatar}/>
					<p>{username}</p>
					<p>{followers[username].headline}</p>
					<button type="button" className="btn btn-danger" onClick={() => {
						(dispatch(removeFollower(username)))}}>Unfollow</button>
				</div>
			</div>
		)
	}) 
	// 	return(
	// 	<div className="well">
		
	// 		{Object.keys(followers).map(
	// 			(username) => followers[username]).map((follower)=> 
	// 			<Follower key = {follower.name} name = {follower.name} avatar = {follower.avatar} headline = {follower.headline}/>)}
			
	// 		<p>{times}</p>
	// 		<div className="form-group row">
	// 			<br/>
	// 			<input className="form-control" type="text" placeholder="Friend" id="follower_name"/>
	// 			<br/>
	// 			<button className="btn btn-primary" onClick = {() => {dispatch(addFollowers())}}>Add Friend</button>
	// 			<br/>
	// 		</div>
	// 	</div>
	// )
	return (
		<div className="panel panel-default text-center">
			{ list }
			<div className="panel">
				<form className="form-inline">
					<div className="form-group">
						<label htmlFor="mystatusInput" className="sr-only">New User</label>
						<input type="text" className="form-control" placeholder="Follower Name" ref={(node) => {
							newFollower = node
						}}/>
						<button type="button" className="btn btn-primary" onClick={() => {
							dispatch(addFollowers(newFollower.value))
							newFollower.value = ''
						}}>Follow A Friend</button>
					</div>
				</form>
			</div>
		</div>
	)
}


Following.PropTypes = {
	followers: PropTypes.object.isRequired,
}

export default connect((state)=>{
	return {
		followers: state.followers
	}
}
)(Following)
