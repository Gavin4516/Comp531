import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Comment from './comment'

class Article extends Component{
	//<button type="button" className="btn btn-primary">Edit post</button>
	constructor(props){
		super(props);
		this.showComments = false;
	}

 	render(){
		return(
		<div className="col-sm-6 well">
			<div className="panel panel-default">
				<h3>{this.props.author} posted on {this.props.date}</h3> 
				{this.props.img===undefined || this.props.img===null? '': <img src={this.props.img} className="img-thumbnail img-responsive"/>}
				<p>{this.props.text}</p>
				<div className="text-center">
					<button type="button" className="btn btn-primary">Add a comment</button>
					<button type="button" className="btn btn-primary" onClick={
						()=>{this.showComments = !this.showComments; this.forceUpdate()}
					}>{!this.showComments?"Show commnets":"Hide comments"}</button>
				</div>
				{
					!this.showComments?'': this.props.comments.map((comment)=>
						<Comment key={comment.commentId} author={comment.author} date={comment.date} text={comment.text}/>
					)
				}
			</div>
		</div>)
	}
}


export default connect()(Article)
