import Action, {resource} from '../../actions'
const initialStates = require('../../initialState')

//Operations to syn server and page for the profile data.

// function getProfileAvatars(){
// 	return (dispatch) => {
// 		return resource('GET','avatars')
// 		.then((response)=>{
// 			dispatch({type:Action.UPDATE_PROFILE, avatar: initialStates.avatars[0].avatar});
// 		})
// 	}
// }

function getProfileAvatars(){
	return (dispatch) => {
			dispatch({type:Action.UPDATE_PROFILE, avatar: initialStates.avatars[0].avatar});
	}
}

// function getProfileEmail(){
// 	return (dispatch) => {
// 		return resource('GET','email')
// 		.then((response)=>{
// 			dispatch({type:Action.UPDATE_PROFILE, email: initialStates.email});
// 		})
// 	}
// }

function getProfileEmail(){
	return (dispatch) => {
			dispatch({type:Action.UPDATE_PROFILE, email: initialStates.email});
	}
}

// function getProfileZipcode(){
// 	return (dispatch) => {
// 		return resource('GET','zipcode')
// 		.then((response)=>{
// 			dispatch({type:Action.UPDATE_PROFILE, zipcode: initialStates.zipcode});
// 		})
// 	}
// }
function getProfileZipcode(){
	return (dispatch) => {
			dispatch({type:Action.UPDATE_PROFILE, zipcode: initialStates.zipcode});
	}
}

// function getProfileDob(){
// 	return (dispatch) => {
// 		return resource('GET','dob')
// 		.then((response)=>{
// 			dispatch({type:Action.UPDATE_PROFILE, dob: new Date(initialStates.dob).toDateString()});
// 		})
// 	}
// }
function getProfileDob(){
	return (dispatch) => {
			dispatch({type:Action.UPDATE_PROFILE, dob: new Date(initialStates.dob).toDateString()});
	}
}

// export function getProfileHeadline(user){
// 	return (dispatch) => {
// 		resource('GET',`headlines/${user}`)
// 		.then((response)=>{
// 			dispatch({type:Action.UPDATE_PROFILE, headline: initialStates.headlines[0].headline});
// 		})
// 	}
// }
export function getProfileHeadline(user){
	return (dispatch) => {
			dispatch({type:Action.UPDATE_PROFILE, headline: initialStates.headlines[0].headline});
	}
}
// export function putProfileHeadline(value){
// 	return (dispatch) => {
// 		if(value) {
// 			resource('PUT','headline', {'headline':value})
// 			.then((response)=>{
// 				dispatch({type:Action.UPDATE_PROFILE, headline: response.headline});
// 			})
// 		}
// 	}
// }

export function putProfileHeadline(value){
	return (dispatch) => {
		if(value) {
			resource('PUT','headline', {'headline':value})
			.then((response)=>{
				dispatch({type:Action.UPDATE_PROFILE, headline: value});
			})
		}
	}
}

export function getProfile(){
	return (dispatch) => {
		return Promise.all([
			getProfileAvatars()(dispatch),
			getProfileEmail()(dispatch),
			getProfileZipcode()(dispatch),
			getProfileDob()(dispatch)
		])
	}
}