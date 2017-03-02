import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

// const local = false;
// export const url = local? 'http://localhost:2222' : 'https://webdev-dummy.herokuapp.com'
const Action = {
    LOGIN: 'log in',
    LOGOUT: 'log out',
    UPDATE_PROFILE: 'update the profile',
    UPDATE_FOLLOWERS: 'update followers status',
    REMOVE_FOLLOWERS: 'remove a follower',
    UPDATE_ARTICLES: 'update articles',
    ERROR_MSG:'an error message',
    SUCCESS_MSG: 'a success message',
    navToMain: 'navigate to the main page',
    navToIndex: 'navigate to the index page',
    navToProfile: 'navigate to the profile page',
    SEARCH_KEYWORD: 'search keyword'
}

export default Action

export function displayERROR_MSG(message){
    return {type: Action.ERROR_MSG, ERROR_MSG: message};
}

export function displaySUCCESS_MSG(message){
    return {type: Action.SUCCESS_MSG, SUCCESS_MSG: message};
}

export function navToMain(){
    return {type: Action.navToMain};
}

export function navToProfile(){
    return {type: Action.navToProfile};
}

export function navToIndex(){
    return {type: Action.navToIndex};
}

export function resource(method, endpoint, payload){
    return Promise.all([]);
}