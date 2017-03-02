import React from 'react'

import { connect } from 'react-redux'
import { registorAction } from './authActions'

//The register form JSX


const Register = ({dispatch}) => {
	let accountName, displayName, email, dateOfBirth, zipcode, password, confirmPassword;

	return(
	<div>
		<div className = "text-center">
			<h2>Register</h2>
		</div>
		<form onSubmit= {(e) => {
			e.preventDefault();
			dispatch(registorAction());
		}}>
		<div className="form-group row">
			<label className="col-xs-3 col-form-label">Account name</label>
			<div className="col-xs-5">
				<input className="form-control" type="text" name="account name" ref={(node) => { accountName = node }} required/>
			</div>
		</div>
		<div className="form-group row">
			<label className="col-xs-3 col-form-label">Display name (optional)</label>
			<div className="col-xs-5">
				<input className="form-control" type="text" name="display name" ref={(node) => { displayName = node }}/>
			</div>
		</div>
		<div className="form-group row">
			<label className="col-xs-3 col-form-label">Email address</label>
			<div className="col-xs-5">
				<input className="form-control" type="email" placeholder="eg. guest@xx.xx" name="email address" ref={(node) => { email = node }} required/>
			</div>
		</div>
		<div className="form-group row">
			<label className="col-xs-3 col-form-label">Date of birth</label>
			<div className="col-xs-5">
				<input className="form-control" type="date" name="date of birth" placeholder="yyyy-mm-dd" pattern="^\d{4}-\d{1,2}-\d{1,2}$" ref={(node) => { dateOfBirth = node }} required/>
			</div>
		</div>
		<div className="form-group row">
			<label className="col-xs-3 col-form-label">Zipcode</label>
			<div className="col-xs-5">
				<input className="form-control" type="text" name="zipcode" placeholder="eg. 77005" pattern="^\d{5}(?:[-\s]\d{4})?$" ref={(node) => { zipcode = node }}required/>
			</div>
		</div>
		<div className="form-group row">
			<label className="col-xs-3 col-form-label">Password</label>
			<div className="col-xs-5">
				<input className="form-control" type="password" name="password" placeholder="Password" id="regPass" ref={(node) => { password = node }} required/>
			</div>
		</div>
			<div className="form-group row">
			<label className="col-xs-3 col-form-label">Password confirmation</label>
			<div className="col-xs-5">
				<input className="form-control" type="password" name="password confirmation" placeholder="Confirm Password" id="regPassCon" ref={(node) => { confirmPassword = node }} required/>
			</div>
		</div>
		<input type="hidden" name="timestamp" id="timestamp"/>
		<div className = "col-xs-8 col-md-offset-4">
			<input type="submit" className="btn btn-primary" value="Submit"/>
			
			<input type="button" className="btn btn-primary" value="Clear" onClick={()=>{
				accountName.value=''
				displayName.value=''
				email.value=''
				dateOfBirth.value=''
				zipcode=''
				password.value=''
				confirmPassword=''
			}}/>
		</div>
		</form>
		</div>
		)}

	export default connect()(Register)