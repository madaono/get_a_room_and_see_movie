import axios from 'axios'
import Zapya from '../assets/js/zapya-methods.js'

export default {
  getUserId ({commit}, uid = '267433') {
    if (typeof window['_myJSface'] !== 'undefined' && window['_myJSface'] !== null) {
      let trueUID = Zapya.getUserId()
      commit('GET_USER_ID', {uid: trueUID})
    }
    commit('GET_USER_ID', {uid})
  },
  getUserToken ({commit}, ut = '1a59ce08bb410d575e94e25cc7f98a97') {
    if (typeof window['_myJSface'] !== 'undefined' && window['_myJSface'] !== null) {
      let trueUt = Zapya.getToken()
      commit('GET_USER_TOKEN', {ut: trueUt})
    }
    commit('GET_USER_TOKEN', {ut})
  },
  getShareMovie ({commit, state}, res) {
    let reqNum = 0
    axios.get('http://210.73.213.236:9392/zapya/room/recommends?uid=6589019,14744578,22009392,22036705,14744247,14744659,5678,22006379,14744592,26284747')
      .then((res) => {
        //add key uid to response
        let movieArr = []
        res.data.map((val) => {
          val.files[0].id=val._id
          val.files[1].id=val._id
          movieArr = movieArr.concat(val.files)
        })
        // console.log('movieArr', movieArr)
        commit('GET_SHARE_MOVIE', {res: movieArr})
      })
      .catch((err) => {
        reqNum++
        if (reqNum < 3) {
          axios.get('http://210.73.213.236:9392/zapya/room/recommends?uid=6589019,14744578,22009392,22036705,14744247,14744659,5678,22006379,14744592,26284747')
            .then((res) => {
              //add key uid to response
              let movieArr = []
              res.data.map((val) => {
                val.files[0].id=val._id
                val.files[1].id=val._id
                movieArr = movieArr.concat(val.files)
              })
              // console.log('movieArr', movieArr)
              commit('GET_SHARE_MOVIE', {res: movieArr})
            })
        } else {
          alert('服务器出小差，请稍候再来')
        }
      })
  },
  getMovieItem ({commit, state}, res) {
    let reqNum = 0
    axios.get('http://210.73.213.236:9392/proxy/jsonGET?url=http%3a%2f%2fapi.dewmobile.net%2fv3%2fcenter%2fdaily%2fs&ut=' + state.ut)
      .then((res) => {
        //add key uid to response
        commit('GET_MOVIE_ITEM', {res: res})
      })
      .catch((err) => {
        reqNum++
        if (reqNum < 3) {
          axios.get('http://210.73.213.236:9392/proxy/jsonGET?url=http%3a%2f%2fapi.dewmobile.net%2fv3%2fcenter%2fdaily%2fs&ut=' + state.ut)
            .then((res) => {
              //add key uid to response
              commit('GET_MOVIE_ITEM', {res: res})
            })
        } else {
          alert('服务器出小差，请稍候再来')
        }
      })
  },
  search ({commit, state}, res) {
      axios.get('http://210.73.213.236:9392/proxy/jsonGET?url=http%3a%2f%2fapi.dewmobile.net%2fes%2fshockings%3fname%3d' + encodeURI(state.searchContext) + '%26cat%3d3&ut=' + state.ut)
        .then((res) => {
          //add key uid to response
          if (res.data.total !== 0) {
            let resData = res.data.shockings.filter((val) => {
              return val.type !== 3
            })
            commit('SEARCH_MOVIE', {res: resData})
            commit('HAS_RESULT', {hasResult: true})
          } else {
            axios.get('http://210.73.213.236:9392/proxy/jsonGET?url=http%3a%2f%2fapi.dewmobile.net%2fes%2favatar%2fhot%3fcat%3d3&ut=' + state.ut)
              .then((res) => {
                commit('SEARCH_MOVIE', {res: res.data.data})
              })
            commit('HAS_RESULT', {hasResult: false})
          }
        })
        .catch((err) => {
          alert('sorry,please refresh this website')
        })
  },
  redirectToRoom ({commit, state}, res) {
    window.location.href = '/zapya/room/redirect?uid=' + state.chooseUid + '&path=' + state.choosePath
    // axios.get('/zapya/room/redirect?uid=' + state.chooseUid + '&path=' + state.choosePath)
    //   .then((res) => {
    //     commit('REDIRECT_ROOM', {redirectUrl:res})
    //   })
  },
  getRoomMovie ({commit, state}, roomMovie) {
    let reReq = 0
    axios.get('http://210.73.213.236:9392/proxy/jsonGET?url=http%3a%2f%2fapi.dewmobile.net%2fv3%2fusers%2frecommend%2fdetail%3fuid%3d' + encodeURI(state.chooseUid) + '%26path%3d' + encodeURI(state.choosePath) + '&ut=' + state.ut)
      .then((res) => {
        commit('GET_ROOM_MOVIE', {roomMovie:res})
      })
      .catch((error) => {
        reReq++
        if (reReq < 3) {
          axios.get('http://210.73.213.236:9392/proxy/jsonGET?url=http%3a%2f%2fapi.dewmobile.net%2fv3%2fusers%2frecommend%2fdetail%3fuid%3d' + encodeURI(state.chooseUid) + '%26path%3d' + encodeURI(state.choosePath) + '&ut=' + state.ut)
            .then((res) => {
              commit('GET_ROOM_MOVIE', {roomMovie:res})
            })
        } else {
          alert(error)
        }
      })
  },
  getPeopleNum ({commit, state}, peopleNum) {
    axios.get('/zapya/room/seat/' + state.roomNum +'?uid=' + state.chooseUid + '&path=' + encodeURI(state.choosePath))
      .then((res) => {
        commit('REFRESH_PEOPLE', {peopleNum:res})
      })
  },
  addPeopleNum ({commit, state}, peopleNum) {
    axios.get('/zapya/room/add/' + state.roomNum +'?uid=' + state.chooseUid + '&path=' + encodeURI(state.choosePath))
      .then((res) => {
      })
  },
  getHotWord ({commit, state}, hot = '金刚狼') {
    axios.get('http://210.73.213.236:9392/proxy/jsonGET?url=http%3a%2f%2fapi.dewmobile.net%2fv4%2fuser%2fboot%3fhw%3d0' + '&ut=' + state.ut)
      .then((res) => {
        let hotWords = res.data.hw.data.t2
        let hotWords1 = hotWords.filter((val) => {
          return val.h == true
        })
        let hotWord = hotWords1[0].w
        commit('GET_HOT_WORD', {hotWord:hotWord})
      })
      .catch(() => {
        commit('GET_HOT_WORD', {hot})
      })
  }
}
