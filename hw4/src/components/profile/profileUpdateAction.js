import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Action, {displayERROR_MSG, displaySUCCESS_MSG} from '../../actions'

//Not functional yet
export function profileUpdateAction(props){
	return (dispatch, props) =>{
		if (document.getElementById("pass").value != document.getElementById("passCon").value){
			dispatch(displayERROR_MSG("Password does not match!"));
		} else {
			document.getElementById("pass").value = ''
			document.getElementById("passCon").value = ''
			if (props.username != ""){
				dispatch({type:Action.UPDATE_PROFILE, username: document.getElementById("disName").value});
				document.getElementById("disName").value = ''
			}
			if (props.email != "") {
				dispatch({type:Action.UPDATE_PROFILE, email: document.getElementById("emailAddress").value});
				document.getElementById("emailAddress").value = ''
			}
			if (props.zip != ""){
				dispatch({type:Action.UPDATE_PROFILE, zipcode: document.getElementById("zipcode").value});
				document.getElementById("zipcode").value = ''

			}
			dispatch(displaySUCCESS_MSG("All valid fields have been updated!"));
		}
		
	}
}

export default connect((state) => {
	return {
		username: state.profile.username,
		avatar: state.profile.avatar,
		zipcode: state.profile.zipcode,
		email: state.profile.email,
		dob: state.profile.dob
	}
})(profileUpdateAction)