import React from 'react'
import {connect} from 'react-redux'

import {postNewArticle} from './articleActions'

//New artcile section component

export const NewArticle = ({postNewArticle}) =>{

	return (
		<div className="row text-center">
			<textarea rows="5" cols="70" id="new-post-textarea"></textarea>
			<br/>
			<label className="btn btn-default btn-file">Upload Image<input type="file" style={{display: 'none'}}/></label>
			<button type="button" className="btn btn-danger">Cancel</button>
			<button type="button" className="btn btn-success" onClick= {()=>{postNewArticle()}}>Post</button>
		</div>
	)
}

export default connect(null, (dispatch) => ({
	postNewArticle: () => {dispatch(postNewArticle())}
}))(NewArticle)