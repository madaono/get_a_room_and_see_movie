import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
  searchContext: '',
  searchResult: '',
  movieShare: [],
  movieItem: [],
  uid: '',
  ut: '',
  daRenId: [
    {'6589019': '沫晓夕带你看电影'},
    {'14744578': '我爱日韩风'},
    {'22009392': '东瀛之美 日韩剧风'},
    {'22036705': '诛仙看新剧'},
    {'14744247': '电影收发室'},
    {'14744659': '网剧大神'},
    {'5678': '我爱港剧TVB'},
    {'22006379': '美剧大爆炸'},
    {'14744592': '刘叔爱美剧'},
    {'26284747': '喜剧逗你乐'}
  ],
  showRoomCard1: false,
  showRoomCard2: false,
  chooseUid: '',
  choosePath: '',
  redirectUrl: '',
  peopleNum: 1,
  roomNum: '',
  hasResult: false,
  roomMovie: '',
  hotWord: '金刚狼'
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
