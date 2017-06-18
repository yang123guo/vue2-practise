import * as types from './mutation-types'

export default {

    [types.UPDATE_ALL_LOAD](state, status) {
        state.loadingShow = status;
    },






  [types.SAVE_PLAN]( state , plan ) {
    state.list.push(plan)
  },
  [types.ADD_TOTAL_TIME]( state , time ) {
    state.totalTime += time;
  },
  [types.DELETE_PLAN]( state , index ) {
    state.list.splice(index,1)
  },
  [types.DEC_TOTAL_TIME]( state , time ) {
    state.totalTime -= time;
  },
  [types.USER_SIGNIN]( state , user ) {
    sessionStorage.setItem('user', JSON.stringify(user))
    Object.assign(state.user, user)
  },
  [types.USER_SIGNOUT]( state , user) {
    return 
  }

};
