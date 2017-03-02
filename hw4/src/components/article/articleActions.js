import Action, {resource} from '../../actions'
const initialStates = require('../../initialState')
//Actions related articles


// export function getArticles() {


// export function getArticles() {
// 	return (dispatch, getState) => {
// 		return resource('GET', 'articles')
// 		.then((response)=>{
// 			const articles = initialStates.articles.reduce((object,item) => {
// 				object[item._id] = item;
// 				return object;
// 			},{})
// 			dispatch({type:Action.UPDATE_ARTICLES, articles});
// 		})
// 	}
// }

export function getArticles() {
	return (dispatch, getState) => {
			const articles = initialStates.articles.reduce((object,item) => {
				object[item._id] = item;
				return object;
			},{})
			dispatch({type:Action.UPDATE_ARTICLES, articles});
	}
}

export function postNewArticle(){
	return (dispatch, getState) => {
			const articles = getState().articles.articles
			var newArticle = {"_id":100,"text":"A new added article","date":new Date().toString(),"img":null,"comments":[],"author":"tester user"}
			articles[5] = newArticle
			dispatch({type:Action.UPDATE_ARTICLES, articles});
		
	}
}

export function searchKeyword(keyword){
	return {type:Action.SEARCH_KEYWORD, keyword};
}