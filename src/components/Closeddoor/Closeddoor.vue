<template>
  <transition name="fade">
    <div class="door">
      <div class="roomCard" @click.once="openDoor"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'closedDoor',
    computed: {
    },
    data () {
      return {
      }
    },
    methods: {
      setCookie: function (name, value) {
        let Days = 30
        let exp = new Date()
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
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
      deleteCookie: function (name) {
        let exp = new Date()
        exp.setTime(exp.getTime() - 1)
        let cval = this.getCookie(name)
        if (cval !== null) {
          document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
        }
      },
      openDoor: function () {
        this.setCookie('cPath', this.$store.state.choosePath)
        this.setCookie('cUid', this.$store.state.chooseUid)
        this.setCookie('cRoom', roomID)
        this.$store.commit('OPEN_DOOR', {showRoomCard2: true})
        this.$store.commit('SHOW_ROOM_CARD1', {showRoomCard1: false})
        window['_hmt'].push(['_trackEvent', 'click', '进入房间'])
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .door{
    width: 100%;
    height: 12.8rem;
    position: fixed;
    top:0;
    background: url('../../assets/imgs/door.jpg') no-repeat;
    background-size: 100% 100%;
  }
  .roomCard{
    width: 2.9rem;
    height: 3.07rem;
    position: fixed;
    top:40%;
    left: 30%;
    background: url("../../assets/imgs/roomcard.png") no-repeat;
    background-size: 100% 100%;
    animation-name: movingCard;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  @keyframes movingCard
  {
    from {transform:translateX(10px);}
    to {transform:translateX(30px);}
  }
  .fade-enter-active{
    transition: opacity 1s
  }
  .fade-leave-active{
    transition: opacity 1s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
  .fade-leave-to{
    opacity: 0
  }
</style>
