<template>
  <div class="body">
    <div class="header" v-if="hasResult">
    <searchBar1></searchBar1>
    </div>
    <div class="header" v-if="!hasResult">
      <searchBar1></searchBar1>
      <p class="search-text">抱歉没有找到“{{$store.state.searchContext}}”的相关视频</p>
      <p class="search-text text2">此料过于稀缺，请在“快牙”找牛人分享</p>
      <div class="installBtn" @click="installZapya">安装快牙</div>
      <p class="search-tips">可能你会喜欢</p>
    </div>
    <searchMovieItem
      v-if="hasResult"
      v-for="item in searchResult"
      v-bind:item="item"
      :key="item.size"
    ></searchMovieItem>
    <searchMovieItem1
      v-if="!hasResult"
      v-for="item in searchResult"
      v-bind:item="item"
      :key="item.size"
    ></searchMovieItem1>
    <closedDoor v-if="showRoomCard1"></closedDoor>
    <openedDoor v-if="showRoomCard2"></openedDoor>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import searchBar1 from '../../components/Searchbar/Searchbar1.vue'
  import searchMovieItem from '../../components/searchMovieItem/SearchMovieItem.vue'
  import searchMovieItem1 from '../../components/searchMovieItem/SearchMovieItem1.vue'
  import closedDoor from '../../components/Closeddoor/Closeddoor.vue'
  import openedDoor from '../../components/Openeddoor/Openeddoor.vue'

  export default {
    name: 'search',
    components: {
      searchBar1,
      searchMovieItem,
      closedDoor,
      openedDoor,
      searchMovieItem1
    },
    created () {
      this.$store.dispatch('getUserToken')
    },
    data () {
    },
    computed: mapState({
      searchResult: state => state.searchResult,
      showRoomCard1: state => state.showRoomCard1,
      showRoomCard2: state => state.showRoomCard2,
      hasResult: state => state.hasResult
    }),
    methods: {
      installZapya: function () {
        let url = ''
        const ua = navigator.userAgent.toLowerCase()
        const isWx = ua.match(/MicroMessenger/i) === 'micromessenger'
        const isQq = ua.match(/QQ/i) === 'qq'
        if (navigator.userAgent.match(/Android (\d+\.\d+)/)) {
          if (isWx || isQq) {
            url = 'http://app.qq.com/#id=detail&appid=100798372'
          } else {
            url = 'http://downloadz.dewmobile.net/Official/Kuaiya484_165c04.apk'
          }
        } else {
          if (isWx) {
            url = 'http://app.qq.com/#id=detail&appid=100798372'
          } else {
            url = 'https://itunes.apple.com/cn/app/kuai-yazapya/id576309271?mt=8'
          }
        }
        window.location.href = url
      }
    }
  }

</script>

<style scoped>
  .header{
    background-color: #2706a6;
    padding-top: .4rem;
  }
  .body{
    background-color: #16055d;
    height: 12.8rem;
  }
  .backIcon{
    display: inline-block;
    width: .37rem;
    height: .34rem;
    background: url("../../assets/imgs/fanhui.png") no-repeat;
    background-size: 100% 100%;
  }
  .search-text{
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
  .text2{
    font-size: 14px;
    color: gray;
  }
  .installBtn{
    width: 2.79rem;
    height: .8rem;
    background: url("../../assets/imgs/anzhuang.png") no-repeat;
    background-size: 100% 100%;
    font-size: .36rem;
    color: white;
    text-align: center;
    line-height: .75rem;
    margin: 0 auto;
    font-weight: bold;
    margin-top: .4rem;
    margin-bottom: .3rem;
  }
  .search-tips{
    font-size: 15px;
    color: gray;
    margin-left: .15rem;
    padding-bottom: .15rem;
  }
</style>
