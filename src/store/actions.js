import * as types from './mutation-types'

export default {
  
    /**
     * 更新全局状态
     * @param  status  boolean  [状态]  
     * @return commit
     */
    updateAllLoad({commit}, status){
        commit(types.UPDATE_ALL_LOAD, status)
    },







  savePlan({ commit }, plan ) {
    commit(types.SAVE_PLAN , plan )
  },
  addTotalTime({ commit }, time ) {
    commit(types.ADD_TOTAL_TIME , time )
  },
  delTime({ commit } , time ) {
    commit(types.DEC_TOTAL_TIME , time)
  },
  removeList( { commit } , plan ) {
    commit(types.DELETE_PLAN , plan)
  },
  signIn( { commit }, user) {
    commit(types.USER_SIGNIN, user)
  },
  signOut( { commit }, user) {
    commit(types.USER_SIGNOUT, user)
  }
}