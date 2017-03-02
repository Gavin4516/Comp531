import { combineReducers } from 'redux'
import Action from './actions'

//Combine reducer of different sections of the page for redux

export function shared(state = {location:'', ERROR_MSG:'', SUCCESS_MSG:''},action){
    let cleanMsg = {ERROR_MSG:'', SUCCESS_MSG:''}
    switch(action.type){
        case Action.ERROR_MSG:
            return { ...state, ...cleanMsg, ERROR_MSG: action.ERROR_MSG}
        case Action.SUCCESS_MSG:
            return { ...state, ...cleanMsg, SUCCESS_MSG: action.SUCCESS_MSG}
        case Action.navToMain:
            return { ...state, ...cleanMsg, location: 'MAIN_PAGE'}
        case Action.navToProfile:
            return { ...state, ...cleanMsg, location: 'PROFILE_PAGE'}
        case Action.navToIndex:
            return { ...state, ...cleanMsg, location: ''}
        default:
            return {...state,...cleanMsg}
    }
}


export function profile(state = { username:'', headline:'', avatar:'', zipcode:'', email:'',dob:''}, action){
    switch(action.type){
        case Action.LOGOUT:
            return {...state, username:''}
        case Action.LOGIN:
            return {...state, username:action.username}
        case Action.UPDATE_PROFILE:
            if(action.avatar) {
                return {...state, avatar: action.avatar}
            }
            if(action.email) {
                return {...state, email: action.email}
            }
            if(action.zipcode){
                return {...state, zipcode: action.zipcode}
            }
            if(action.dob){
                return {...state, dob: action.dob}
            }
            if(action.headline){
                return {...state, headline: action.headline}
            }
            if (action.username){
                return {...state, username: action.username}
            }
        default:
            return state;
    }
}


export function followers(state = {}, action){
    switch(action.type){
        case Action.UPDATE_FOLLOWERS:
            let updatedState = Object.assign({}, state)
            if (!updatedState[action.username]) {
                updatedState[action.username] = {}
            }
            let userProfile = updatedState[action.username]
            Object.keys(action.item).forEach((key) => {
                userProfile[key] = action.item[key]
            })
            return updatedState
        case Action.REMOVE_FOLLOWERS:
            let deductedState = Object.assign({}, state)
            delete deductedState[action.username]
            return deductedState
        default:
            return state;
    }
}


export function articles(state = {articles:{},keyword:''}, action){
    switch(action.type){
        case Action.UPDATE_ARTICLES:
            return {...state, articles: action.articles}
        case Action.SEARCH_KEYWORD:
            return {...state, keyword: action.keyword}
        default:
            return state;
    }
}

const Reducer = combineReducers({
    articles, followers, profile, shared
})

export default Reducer