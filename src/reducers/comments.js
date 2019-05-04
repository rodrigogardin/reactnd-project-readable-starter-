import * as ACTIONS from '../actions/types'

const comments = (state = [] , action) => {
  switch(action.type) {
    case ACTIONS.GET_COMMENTS:
     return action.comments
    default:
      return state
  }
}

export default comments