import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Action, {displayERROR_MSG} from '../../actions'
import Avatar from './avatar'
import { profileUpdateAction } from './profileUpdateAction'

//Profile form react component.

export const ProfileForm = ({dispatch, props}) => {
	// let name, email, zip, password, passwordConfirm;
	let updateFields = {};
    return (
        <form className="profileForm" onSubmit={(e) => {
            dispatch(profileUpdateAction(updateFields));
        }}>
        	<div className="form-group row">
				<div className="col-md-2">Display Name:</div>
				<div className="col-md-2"><input type="text" pattern="[A-Za-z][A-Za-z0-9]*" id="disName" ref={(node) => { updateFields.name = node }}/></div>
				<div className="col-md-2">{props.username}</div>
			</div>
			<div className="row form-group">
				<div className="col-md-2">Date of Birth:</div>
				<div className="col-md-2">{props.dob}</div>
				<div className="col-md-2">DOB cannot be updated</div>
			</div>
			<div className="row form-group">
				<div className="col-md-2">Email Address:</div>
				<div className="col-md-2"><input type="text" pattern="\S+@\S+\.\S+" id="emailAddress" ref={(node) => { updateFields.email = node }}/></div>
				<div className="col-md-2">{props.email}</div>
			</div>
			<div className="row form-group">
				<div className="col-md-2">Zipcode:</div>
				<div className="col-md-2"><input type="text" pattern="^\d{5}(?:[-\s]\d{4})?$" id="zipcode" ref={(node) => { updateFields.zip = node }}/></div>
				<div className="col-md-2">{props.zipcode}</div>
			</div>
			<div className="row form-group">
				<div className="col-md-2">Password:</div>
				<div className="col-md-2"><input type="password" id="pass" ref={(node) => { updateFields.password = node }}/></div>
				<div className="col-md-2"></div>
			</div>
			<div className="row form-group">
				<div className="col-md-2">Password Confirmation:</div>
				<div className="col-md-2"><input type="password" id="passCon" ref={(node) => { updateFields.passwordConfirm = node }}/></div>
				<div className="col-md-2"></div>
			</div>
			<Avatar/>
			<div className="row formRow col-md-offset-2">
				<input type="submit" className="btn btn-primary" value="Update"/>
			</div>
        </form>
    )
}


ProfileForm.PropTypes = {
	username:PropTypes.string.isRequired,
	avatar:PropTypes.string.isRequired,
	zipcode:PropTypes.number.isRequired,
	email:PropTypes.string.isRequired,
	dispatch:PropTypes.func.isRequired,
	dob:PropTypes.string.isRequired
}

export default connect((state) => {
	return {
		props : state.profile
	}
})(ProfileForm)

