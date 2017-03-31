<template>
  <div class="container clearfix">
    <div class="header"></div>
    <searchBar></searchBar>
    <div class="hot">
      <span class="hot-title">&nbsp&nbsp;热播片单</span>
      <div class="shareMovieContainer">
        <movieShare
          v-for="item in movieShare"
          :key="item.u"
          v-bind:item="item"
        ></movieShare>
      </div>
    </div>
    <div class="hot">
      <span class="movie-title">&nbsp&nbsp;影视专题</span>
      <div class="shareMovieContainer">
        <movieItem
          v-for="item in movieItem"
          :key="item.fsize"
          v-bind:item="item"
        ></movieItem>
      </div>
    </div>
    <closedDoor v-if="showRoomCard1"></closedDoor>
    <openedDoor v-if="showRoomCard2"></openedDoor>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import movieItem from '../../components/Movieitem/Movieitem.vue'
  import movieShare from '../../components/Movieshare/Movieshare.vue'
  import searchBar from '../../components/Searchbar/Searchbar.vue'
  import closedDoor from '../../components/Closeddoor/Closeddoor.vue'
  import openedDoor from '../../components/Openeddoor/Openeddoor.vue'

  export default {
    name: 'item',
    components: {
      movieItem,
      movieShare,
      searchBar,
      closedDoor,
      openedDoor
    },
    created () {
      this.$store.dispatch('getUserToken')
      this.$store.dispatch('getUserId')
      this.$store.dispatch('getShareMovie')
      this.$store.dispatch('getMovieItem')
      this.$store.dispatch('getHotWord')
    },
    mounted () {
      if (this.getCookie('cPath') && this.getCookie('cUid')) {
        let path = this.getCookie('cPath')
        let uid = this.getCookie('cUid')
        this.$store.commit('GET_REDIRECT_QUERY', {
          chooseUid: uid,
          choosePath: path
        })
        this.$store.dispatch('redirectToRoom')
      } else {
        this.$router.push('/zapya/room/main')
      }
    },
    computed: mapState({
      uid: state => state.uid,
      ut: state => state.ut,
      movieShare: state => state.movieShare,
      movieItem: state => state.movieItem,
      searchContext: state => state.searchContext,
      showRoomCard1: state => state.showRoomCard1,
      showRoomCard2: state => state.showRoomCard2
    }),
    data () {
      return {
      }
    },
    methods: {
      getCookie: function () {
        let arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        if (arr === document.cookie.match(reg)) {
          return unescape(arr[2])
        } else {
          return null
        }
      }
    }
  }

</script>

<style scoped>
  .container{
    background-color: #160b5b;
    padding-bottom: 1rem;
  }
  .header{
    width: 100%;
    height: 5.45rem;
    background: url("../../assets/imgs/toubu.png") no-repeat;
    background-size: 100% 100%;
  }
  .hot{
    width: 93%;
    margin: 0 auto;
  }
  .hot-title{
    display: inline-block;
    color: #fff100;
    width: 80%;
    font-weight: bold;
    font-size: .4rem;
    line-height: .47rem;
    margin-bottom: .5rem;
  }
  .hot-title::before{
    display: inline-block;
    content: '';
    width: .52rem;
    height: .47rem;
    vertical-align: bottom;
    background: url("../../assets/imgs/rebo.png") no-repeat;
    background-size: 100% 100%;
  }
  .movie-title{
    display: inline-block;
    color: #fff100;
    width: 80%;
    font-weight: bold;
    font-size: .4rem;
    line-height: .47rem;
  }
  .movie-title::before{
    display: inline-block;
    content: '';
    width: .52rem;
    height: .47rem;
    vertical-align: bottom;
    background: url("../../assets/imgs/yingshi.png") no-repeat;
    background-size: 100% 100%;
  }
  .shareMovieContainer{
    text-align: center;
  }

</style>
