import React from 'react'
import { connect } from 'react-redux'

import Main from './main/main'
import Landing from './auth/landing'
import Profile from './profile/profile'

//Single application page

const App = ({location}) => {
	let view;
	if (location === 'MAIN_PAGE') {
		return (
			<div>
				<Main/>
			</div>
		)
	} 
	else if (location === 'PROFILE_PAGE') {
		return (
			<div>
				<Profile/>
			</div>
		)
	} 
	else{
		return (
			<div>
				<Landing/>
			</div>
		)
	}
}

export default connect((state) => {
	return {location:state.shared.location}
})(App)
