<template>
  <div class="MSContainer"  @click="pushChooseInfo(item.id, item.path)">
    <img :src="item.thumbUrl" class="MSDPic">
    <h3 class="MSDTitle">{{item.fname}}</h3>
    <p class="MSDes"> 来自{{this.transName(item.id)}}的分享</p>
  </div>
</template>

<script>
  export default {
    name: 'movieShare',
    data () {
      return {
      }
    },
    props: ['item'],
    methods: {
      transName: function (item) {
        switch (item) {
          case "6589019":
            return '沫晓夕带你看电影'
            break;
          case "14744578":
            return '我爱日韩风'
            break;
          case "22009392":
            return '东瀛之美 日韩剧风'
            break;
          case "22036705":
            return '诛仙看新剧'
            break;
          case "14744247":
            return '电影收发室'
            break;
          case "14744659":
            return '网剧大神'
            break;
          case "5678":
            return '我爱港剧TVB'
            break;
          case "22006379":
            return '美剧大爆炸'
            break;
          case "14744592":
            return '刘叔爱美剧'
            break;
          case "26284747":
            return '喜剧逗你乐'
            break;
          default:
            return '沫晓夕带你看电影'
        }
      },
      pushChooseInfo: function (id, path) {
        this.$store.commit('PUSH_MOVIE_UID', {chooseUid: id})
        this.$store.commit('PUSH_MOVIE_PATH', {choosePath: path})
        this.$store.commit('SHOW_ROOM_CARD1', {showRoomCard1: true})
        window['_hmt'].push(['_trackEvent', 'click', '视频', this.item.id, this.item.path])
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .MSContainer{
    width: 46%;
    float: left;
    padding-bottom: .4rem;
    margin-left: .15rem;
  }
  .MSDPic{
    width: 100%;
    height: 2rem;
  }
  .MSDTitle{
    font-size: .28rem;
    color: #fff100;
    text-align: left;
    padding-bottom: .05rem;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
  .MSDes{
    font-size: .22rem;
    color: #d6d6d6;
    text-align: left;
    white-space:nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }

</style>
