import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);
const state = {
    loadingShow: true,
    list: [],
    user : JSON.parse(sessionStorage.getItem('user')) || {},
    routeList : []
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})