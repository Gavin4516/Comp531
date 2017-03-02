import React from 'react'
import { connect } from 'react-redux'

import Action, {displayERROR_MSG} from '../../actions'

//Avatar JSX

const Avatar = ({avatar,dispatch}) => (
	<div className="row">
		<div className="col-md-2">Profile Image:</div>
		<div className="col-md-2">
			<label className="btn btn-default btn-file">Update Image
				<input type="file" style={{display: 'none'}} onChange={(e)=>{dispatch(displayERROR_MSG("Not functional now!"))}}/>
			</label>
		</div>
		<div className="col-md-2"><img src={avatar} style={{height:'100px'}}/></div>
	</div>
)

export default connect((state) => {
	return {avatar:state.profile.avatar}
})(Avatar)