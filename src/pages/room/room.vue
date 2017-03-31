<template>
  <div class="room">
    <div class="tv">
      <div class="poster" @click="playIt" v-show="paused"></div>
      <video :src="roomMovie" id="movieItem" @click="playIt" v-on:ended="end" v-show="!paused"></video>
    </div>
    <div class="number">当前已有{{peopleNum-1}}/1位好友进入房间</div>
    <div class="btns">
      <div class="repick" @click="repick"></div>
      <div class="invite" @click="inviteShow"></div>
      <div class="fresh" @click="fresh"></div>
    </div>
    <div class="bigMask" v-show="invite || install ||invitePeople" @click="hideIt">
      <div class="inviteNotice" v-show="invite">
        <div class="invitePic"></div>
        <p class="inviteText inviteText1">小片还想独占？</p>
        <p class="inviteText">邀请一位好友与你嗨皮吧！</p>
      </div>
      <div class="inviteNotice" v-show="invitePeople">
        <div class="invitePic"></div>
        <p class="inviteText inviteText1">房已开好</p>
        <p class="inviteText">快去邀请好友吧！</p>
      </div>
      <div class="installNotice" v-show="install">
        <p class="inviteText installText">小片不过瘾？更多戳下面</p>
        <div class="installPic"></div>
        <div class="installBtn" v-on:click.stop.prevent="installZapya">安装快牙</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'room',
    mounted () {
//        this.$store.roomNum = this.$router.history.current.query.num
//        this.$store.chooseUid = this.$router.history.current.query.uid
//        this.$store.choosePath = this.$router.history.current.query.path
      this.$store.commit('GET_REDIRECT_QUERY', {
        chooseUid: this.$router.history.current.query.uid,
        choosePath: this.$router.history.current.query.path
      })
      this.fresh()
      if ((this.getCookie('cPath') !== this.$store.state.choosePath) && (this.getCookie('cUid') !== this.$store.state.chooseUid) && (this.getCookie('cRoom') !== this.$store.state.roomNum)) {
        this.addPeopleNum()
        this.$router.push('/zapya/room/main')
      }
      this.$store.dispatch('getUserToken')
      this.$store.dispatch('getRoomMovie')
    },
    computed: mapState({
      peopleNum: state => state.peopleNum,
      roomMovie: state => state.roomMovie
    }),
    data () {
      return {
        paused: true,
        invite: false,
        install: false,
        invitePeople: false,
        movieUrl: ''
      }
    },
    methods: {
      playIt: function () {
        let videoItem = document.getElementById('movieItem')
        if (this.peopleNum >= 2) {
          window['_hmt'].push(['_trackEvent', '视频播放', 'play', this.$router.history.current.query.uid, this.$router.history.current.query.path])
          if (videoItem.paused) {
            this.paused = false
            videoItem.play()
          } else {
            this.paused = true
            videoItem.pause()
          }
          videoItem.addEventListener('timeupdate', this.limitMovie)
        } else {
          this.invitePeople = true
        }
      },
      end: function () {
        let videoItem = document.getElementById('movieItem')
        videoItem.style.display = 'none'
        videoItem.removeEventListener('timeupdate', this.limitMovie)
        this.install = true
      },
      repick: function () {
        window['_hmt'].push(['_trackEvent', 'click', '重新选片'])
        this.deleteCookie('cUid')
        this.deleteCookie('cPath')
        this.deleteCookie('cRoom')
        this.$store.commit('OPEN_DOOR', {showRoomCard2: false})
        this.$router.push('/zapya/room/main')
      },
      inviteShow: function () {
        window['_hmt'].push(['_trackEvent', 'click', '邀请好友'])
        this.invite = true
      },
      installZapya: function () {
        let url = ''
        const ua = window.navigator.userAgent.toLowerCase()
        const isWx = ua.match(/MicroMessenger/i) == 'micromessenger'
        const isQq = ua.match(/QQ/i) == 'qq'
        if (window.navigator.userAgent.match(/Android (\d+\.\d+)/)) {
          if (isWx || isQq) {
            url = 'http://app.qq.com/#id=detail&appid=100798372'
          } else {
            url = 'http://downloadz.dewmobile.net/Official/Kuaiya484_165c04.apk'
          }
        } else {
          url = 'https://itunes.apple.com/cn/app/kuai-yazapya/id576309271?mt=8'
        }
        window.location.href = url
      },
      fresh: function () {
        window['_hmt'].push(['_trackEvent', 'click', '刷新人数'])
        let reg = /\/([0-9]{1,20})\//g
        let roomUrl = this.$router.currentRoute.fullPath
        let roomNum = reg.exec(roomUrl)[1]
        this.$store.commit('GET_ROOM', {roomNum: roomNum})
        this.$store.dispatch('getPeopleNum')
      },
      hideIt: function () {
        let hide = this.invite || this.install || this.invitePeople
        if (hide) {
          this.invite = false
          this.install = false
          this.invitePeople = false
        }
      },
      getCookie: function (name) {
        let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        let arr = document.cookie.match(reg)
        if (arr) {
          return unescape(arr[2])
        } else {
          return null
        }
      },
      setCookie: function (name, value) {
        let Days = 30
        let exp = new Date()
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
      },
      deleteCookie: function (name) {
        let exp = new Date()
        exp.setTime(exp.getTime() - 1)
        let cval = this.getCookie(name)
        if (cval !== null) {
          document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
        }
      },
      addPeopleNum: function () {
        this.$store.dispatch('addPeopleNum')
      },
      limitMovie: function () {
        let videoItem = document.getElementById('movieItem')
        let vCurrentTime = videoItem.currentTime
        if (vCurrentTime > 300) {
          this.install = true
          videoItem.style.display = 'none'
          videoItem.removeEventListener('timeupdate', this.limitMovie)
        }
      }
    }
  }

</script>

<style scoped>
  .room{
    width: 100%;
    height: 12.8rem;
    background: url("../../assets/imgs/beijing.png") no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding-top: 1.53rem;
  }
  .tv{
    position: relative;
    width: 6.17rem;
    text-align: center;
    margin: 0 auto;
  }
  video{
    position: absolute;
    height: 3.6rem;
    width: 6.17rem;
    top:0;
    left: -.3%;
  }
  .poster{
    position: absolute;
    height: 3.58rem;
    width: 100%;
    background: url("../../assets/imgs/dianshi.png") no-repeat;
    background-size: 100% 100%;
    z-index: 9;
  }
  .number{
    font-size: 14px;
    color: #af771e;
    position: relative;
    top:50%;
    text-align: center;
  }
  .btns{
    width: 5.44rem;
    height: 3.4rem;
    position: relative;
    bottom: -6.9rem;
    left: 11%;
    box-sizing: border-box;
    overflow: hidden;
  }
  .invite{
    height: 100%;
    width: 33%;
    float: left;
    /*margin-bottom: 2rem;*/
    opacity: .2;
    position: relative;
    bottom: 0;
  }
  .repick{
    /*margin-top: 1rem;*/
    /*margin-bottom: 1rem;*/
    height: 100%;
    width: 33%;
    float: left;
    opacity: .2;
    position: relative;
    bottom: 0;
    margin-top: .8rem;
  }
  .fresh{
    /*margin-top: 1rem;*/
    /*margin-bottom: 1rem;*/
    height: 100%;
    width: 33%;
    float: left;
    opacity: .2;
    position: relative;
    bottom: 0;
    margin-top: .8rem;
  }
  .bigMask{
    position: fixed;
    width: 100%;
    height: 12.8rem;
    background-color: rgba(0,0,0,.8);
    top:0;
    z-index: 99999;
  }
  .invitePic{
    width: 1.06rem;
    height: 1.46rem;
    background: url("../../assets/imgs/fengxiang.png") no-repeat;
    background-size: 100% 100%;
    position: fixed;
    right: 10%;
    top: 5%;
  }
  .inviteText{
    width: 80%;
    color: yellow;
    font-size: .4rem;
    text-align: left;
    margin-left: 1.6rem;
    font-weight: bold;
  }
  .inviteText1{
    padding-top: 1.8rem;
  }
  .installPic{
    width: .99rem;
    height: 1.85rem;
    background: url('../../assets/imgs/shou.png') no-repeat;
    background-size: 100% 100%;
    margin: .8rem auto;
  }
  .installText{
    margin-top: 2.5rem;
  }
  .installBtn{
    width: 2.79rem;
    height: .8rem;
    background: url("../../assets/imgs/anzhuang.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    text-align: center;
    line-height: .75rem;
    font-size: .4rem;
    color: #fff100;
    font-weight: bold;
  }
</style>
