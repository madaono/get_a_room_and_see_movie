const GET_SHARE_MOVIE = 'GET_SHARE_MOVIE'
const GET_MOVIE_ITEM = 'GET_MOVIE_ITEM'
const SEARCH_MOVIE = 'SEARCH_MOVIE'
const GET_USER_TOKEN = 'GET_USER_TOKEN'
const GET_USER_ID = 'GET_USER_ID'
const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
const SHOW_ROOM_CARD1 = 'SHOW_ROOM_CARD1'
const GET_ROOM = 'GET_ROOM'
const OPEN_DOOR = 'OPEN_DOOR'
const PUSH_MOVIE_UID = 'PUSH_MOVIE_UID'
const PUSH_MOVIE_PATH = 'PUSH_MOVIE_PATH'
const REDIRECT_ROOM = 'REDIRECT_ROOM'
const REFRESH_PEOPLE = 'REFRESH_PEOPLE'
const REDIRECT_DAILY_REPORT = 'REDIRECT_DAILY_REPORT'
const HAS_RESULT = 'HAS_RESULT'
const GET_ROOM_MOVIE = 'GET_ROOM_MOVIE'
const GET_REDIRECT_QUERY = 'GET_REDIRECT_QUERY'
const GET_HOT_WORD = 'GET_HOT_WORD'

export default {
  [GET_USER_ID] (state, payload) {
    state.uid = payload.uid
  },
  [GET_SHARE_MOVIE] (state, payload) {
    state.movieShare = payload.res
  },
  [GET_USER_TOKEN] (state, payload) {
    state.ut = payload.ut
  },
  [UPDATE_MESSAGE] (state, message) {
    state.searchContext = message
  },
  [GET_MOVIE_ITEM] (state, payload) {
    state.movieItem = payload.res.data.data
  },
  [SEARCH_MOVIE] (state, payload) {
    state.searchResult = payload.res
  },
  [SHOW_ROOM_CARD1] (state, payload) {
    state.showRoomCard1 = payload.showRoomCard1
  },
  [OPEN_DOOR] (state, payload) {
    state.showRoomCard2 = payload.showRoomCard2
  },
  [PUSH_MOVIE_UID] (state, payload) {
    state.chooseUid = payload.chooseUid
  },
  [PUSH_MOVIE_PATH] (state, payload) {
    state.choosePath = payload.choosePath
  },
  [REDIRECT_ROOM] (state, payload) {
    state.redirectUrl = payload.redirectUrl
  },
  [REFRESH_PEOPLE] (state, payload) {
    state.peopleNum = payload.peopleNum.data
  },
  [REDIRECT_DAILY_REPORT] (state, payload) {
    window.location.href = 'http://s1.kuaiyanana.net/share' + Math.floor(Math.random()*50 + 5) + '/daily/report.html?day=' + payload.date
  },
  [HAS_RESULT] (state, payload) {
    state.hasResult = payload.hasResult
  },
  [GET_ROOM_MOVIE] (state, payload) {
    state.roomMovie = payload.roomMovie.data.u
  },
  [GET_REDIRECT_QUERY] (state, payload) {
    state.chooseUid = payload.chooseUid
    state.choosePath = payload.choosePath
  },
  [GET_ROOM] (state, payload) {
    state.roomNum = payload.roomNum
  },
  [GET_HOT_WORD] (state, payload) {
    state.hotWord = payload.hotWord
  }
}
