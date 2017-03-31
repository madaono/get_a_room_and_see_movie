<template>
  <div class="itemBody clearfix" @click="pushChooseInfo(item.uid, item.p)">
    <div class="left">
      <img :src="item.tu" alt="" class="searchImg">
      <div class="info">
        <img :src="this.avatarUrl" alt="" class="avatar">
        <span class="text">{{nick}}</span>
      </div>
    </div>
    <div class="right">
      <div class="movieTitle">{{item.n}}</div>
      <div class="fileSize">{{item.desc}}</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'searchMovieItem1',
    computed: {
    },
    props: ['item'],
    created: function () {
      this.getAvatar(this.item.uid)
    },
    data () {
      return {
        avatarUrl: '',
        nick: ''
      }
    },
    methods: {
      getAvatar: function (uid) {
        const thisUid = uid
        axios.get('http://210.73.213.236:9392/proxy/jsonGET?url=http%3a%2f%2fapi.dewmobile.net%2fv3%2fusers%2fprofiles%3fuid%3d' + encodeURI(thisUid) + '&ut=' + this.$store.state.ut)
          .then(res => {
            this.avatarUrl = res.data[thisUid].avurl
            this.nick = res.data[thisUid].nick
          })
      },
      pushChooseInfo: function (id, path) {
        this.$store.commit('PUSH_MOVIE_UID', {chooseUid: id})
        this.$store.commit('PUSH_MOVIE_PATH', {choosePath: path})
        this.$store.commit('SHOW_ROOM_CARD1', {showRoomCard1: true})
        window['_hmt'].push(['_trackEvent', 'searchResult', '结果点击', this.$store.state.choosePath, this.$store.state.chooseUid])
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .itemBody{
    padding: .4rem .1rem .5rem .1rem;
    background-color: #16055d;
    border-bottom: 1px dashed #3a3264;
  }
  .info{
    height: .6rem;
    line-height: .4rem;
    overflow: hidden;
    margin-top: -.15rem;
  }
  .left{
    display: inline-block;
    height: 2rem;
    margin-left: .2rem;
    width: 38%;
    float: left;
  }
  .avatar{
    height: .45rem;
    width: .45rem;
    margin: .075rem 0;
    border-radius: .45rem;
    vertical-align: middle;
  }
  .text{
    font-size: .24rem;
    color: #fff;
    margin: .3rem 0;
    vertical-align: middle;
  }
  .searchImg{
    width: 2.6rem;
  }
  .right{
    box-sizing: border-box;
    float: left;
    display: inline-block;
    width: 53%;
    margin-left: .3rem;
  }
  .movieTitle{
    font-size: .28rem;
    color: #ff0;
    text-overflow:ellipsis;
    /*white-space: nowrap;*/
    ext-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .fileSize{
    font-size: .24rem;
    color: #cdcdcf;
    margin-top: .5rem;
  }
  .itemBody:last-child{
    padding-bottom: 1.5rem;
  }
</style>
