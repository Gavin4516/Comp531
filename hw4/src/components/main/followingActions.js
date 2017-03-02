import Promise from 'bluebird'
import Action, {resource} from '../../actions'
const initialStates = require('../../initialState')
//Following operations

//let followers = initialStates.following.reduce((object, item)=>{object[item] = {name: item}; return object},{})
			
//const followersStr = initialStates.following.join(',')
export const addFollowers = (username) => {
	return (dispatch) => {
		dispatch({type:Action.UPDATE_FOLLOWERS, username, item:{
			username,
			avatar: 'https://randomuser.me/api/portraits/thumb/men/96.jpg',
			headline:'A new followed friend!'
		}})
	}
}

// export const getFollowers = (username) => {
// 	return (dispatch) => {
// 		resource('GET', `${username}/following`)
// 		.then((response) => {

// 			let followersList = initialStates.followers
// 			followersList.forEach((follower) => {
// 				dispatch({type:Action.UPDATE_FOLLOWERS, username: follower.username, item: follower})
// 			})
// 		})
// 	}
// }
export const getFollowers = (username) => {
	return (dispatch) => {
			let followers = initialStates.followers
			followers.forEach((follower) => {
				dispatch({type:Action.UPDATE_FOLLOWERS, username: follower.username, item: follower})
			})
	}
}

export const removeFollower = (username) => {
	return (dispatch) => {
		dispatch({type:Action.REMOVE_FOLLOWERS, username})
	}
}
// }