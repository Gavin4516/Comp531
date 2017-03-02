import Promise from 'bluebird'

import Action, {navToMain, navToIndex, displayERROR_MSG, resource} from '../../actions'
import { getProfile, getProfileHeadline} from '../profile/profileActions'
import { getFollowers } from '../main/followingActions'
import { getArticles } from '../article/articleActions'

export function initialStates(username){
	return (dispatch) => {
        dispatch(getFollowers())
        dispatch(getProfile())
        dispatch(getProfileHeadline(username))
        dispatch(getArticles())
        return Promise.all([]).then(()=>{
            dispatch(navToMain())
        })
	}
}

export function loginAction(username, password) {
    return (dispatch) => {
            if (username == '' || password == '') {
                dispatch(displayERROR_MSG(`Missing username or password`))
            } else {
                dispatch({type: Action.LOGIN, username: username})
                dispatch(initialStates(username))
            }
    }
}

export function registorAction(password, passwordConfirm){
    return (dispatch) =>{
        if (document.getElementById("regPass").value != document.getElementById("regPassCon").value){
            dispatch(displayERROR_MSG("Two passwords do not match!"))
        } else {
            dispatch(displayERROR_MSG("Register is not functional"))
        }
    }
}

export function clear() {
    document.getElementById("regAccount").value = ''
    document.getElementById("regName").value = ''
    document.getElementById("regEmail").value = ''
    document.getElementById("regDate").value = ''
    document.getElementById("regPass").value = ''
    document.getElementById("regZip").value = ''
    document.getElementById("regPassCon").value = ''
}
