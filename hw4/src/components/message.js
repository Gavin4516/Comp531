import React, {PropTypes} from 'react'
import { connect } from 'react-redux'

import Action, {displayERROR_MSG, displaySUCCESS_MSG} from '../actions'


export const Message = ({ERROR_MSG, SUCCESS_MSG}) => (
	<div className="row text-center">
		{
			ERROR_MSG===''?'':
			<div className="row formRow alert alert-danger"> {ERROR_MSG} </div>
		}
		{SUCCESS_MSG===''?'':
			<div className="row formRow alert alert-success"> {SUCCESS_MSG} </div>
		}
	</div>
)

Message.PropTypes = {
	ERROR_MSG: PropTypes.string.isRequired,
	SUCCESS_MSG: PropTypes.string.isRequired
}

export default connect((state) => {
	return {
		ERROR_MSG: state.shared.ERROR_MSG,
		SUCCESS_MSG: state.shared.SUCCESS_MSG
	}
})(Message)