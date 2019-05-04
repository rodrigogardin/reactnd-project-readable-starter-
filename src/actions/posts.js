import { getServerPosts,
         getServerPostsByCategory,
         addServerPost,
         getServerPost,
         editServerPost,
         deleteServerPost,
         voteServerPost,
         getServerCategories,
         getServerComments,
        addServerComment,
        getServerComment,
        editServerComment,
        deleteServerComment,
        voteServerComment,

 } from '../api'

import * as ACTIONS from './types'



export const getCategoriesFromServer = () => dispatch => (
  getServerCategories().then(categories => dispatch(getCategories(categories))
 )
)

function getCategories (categories) {
 return {
   type: ACTIONS.GET_CATEGORIES, 
   categories
 }
}


export const getPostsFromServer = () => dispatch => (
   getServerPosts().then(posts => dispatch(getPosts(posts))
  )
)

function getPosts (posts) {
  return {
  	type: ACTIONS.GET_POSTS, 
  	posts
  }
}

export const getPostsByCategoryFromServer = (category) => dispatch => (
   getServerPostsByCategory(category).then(posts => dispatch(getPostsByCategory(category,posts))
  )
)

function getPostsByCategory (category,posts) {
  return {
  	type: ACTIONS.GET_POSTS_BY_CATEGORY,
  	category, 
  	posts
  }
}

export function sortPosts (sortBy,sortOrder) {
  return {type: ACTIONS.SORT_POSTS, sortBy, sortOrder}
}


export const getPostFromServer = (postId) => dispatch => (
   getServerPost(postId).then(post => dispatch(getPost(post))
  )
)


function getPost (post) {
  return {type: ACTIONS.GET_POST, post}
}

export const addPostOnServer = (post) => dispatch => (
   addServerPost(post).then(post => dispatch(addPost(post))
  )
)

function addPost (post) {
  return {type: ACTIONS.ADD_POST, post}
}

export const editPostOnServer = (postId,post) => dispatch => (
   editServerPost(postId,post).then(post => dispatch(editPost(post))
  )
)

function editPost (post) {
  return {type: ACTIONS.EDIT_POST, post}
}

export const deletePostOnServer = (postId) => dispatch => (
   deleteServerPost(postId).then(post => dispatch(deletePost(post))
  )
)

function deletePost (post) {
  return {type: ACTIONS.DELETE_POST, post}
}

export const votePostOnServer = (postId,option) => dispatch => (
   voteServerPost(postId,option).then(post => dispatch(votePost(post))
  )
)

function votePost (post) {
  return {type: ACTIONS.VOTE_POST, post}
}


export const getCommentsFromServer = (postId) => dispatch => (
  getServerComments(postId).then(comments => dispatch(getComments(postId,comments))
)
)

function getComments (postId,comments) {
  return {
  type: ACTIONS.GET_COMMENTS,
  postId, 
  comments
  }
}

export const getCommentFromServer = (commentId) => dispatch => (
  getServerComment(commentId).then(comment => dispatch(getComment(comment))
)
)


function getComment (comment) {
  return {type: ACTIONS.GET_COMMENT, comment}
}

export const addCommentOnServer = (comment) => dispatch => (

  addServerComment(comment).then(comment => dispatch(addComment(comment))
)
)

function addComment (comment) {

  return {type: ACTIONS.ADD_COMMENT, comment}
}

export const editCommentOnServer = (commentId,comment) => dispatch => (
  editServerComment(commentId,comment).then(comment => dispatch(editComment(comment))
)
)

function editComment (comment) {
  return {type: ACTIONS.EDIT_COMMENT, comment}
}

export const deleteCommentOnServer = (commentId) => dispatch => (
  deleteServerComment(commentId).then(comment => dispatch(deleteComment(comment))
)
)

function deleteComment (comment) {
  return {type: ACTIONS.DELETE_COMMENT, comment}
}

export const voteCommentOnServer = (commentId,option) => dispatch => (
  voteServerComment(commentId,option).then(comment => dispatch(voteComment(comment))
)
)

function voteComment (comment) {
  return {type: ACTIONS.VOTE_COMMENT, comment}
}




//////////////
