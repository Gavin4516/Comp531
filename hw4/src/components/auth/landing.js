import React from 'react'

import Register from './registor'
import Login from './login'
import Message from '../message'


//The landing page JSX

const Landing = () => (
	<div>
		<div className="jumbotron text-center">
			<h1>Welcome to RiceBook Page</h1>
		</div>
		<div className="container">
			<Message/>
			<div>
				<Login/>
				<Register/>
			</div>
		</div>
	</div>
)

export default Landing