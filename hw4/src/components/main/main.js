import React from 'react'
import {connect} from 'react-redux'

import Nav from './nav'
import Headline from './headline'
import Following from './following'
import ArticleView from '../article/articleView'


//The main page JSX

const Main = () => {
	return (
	<div>
		<Nav/>
		<div className="container">
			<div className="col-md-3 text-center">
				<Headline/>
				<Following/>
			</div>
			<div className="col-md-8 col-md-offset-1">
				<div className="row">
					<ArticleView/>
				</div>
			</div>
		</div>
	</div>
)
}

export default connect()(Main)