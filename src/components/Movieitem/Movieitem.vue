<template>
  <div class="MCContainer" @click="toDaily(item.d)">
    <img :src="item.b" class="MCPic">
    <h3 class="MCTitle">《{{item.n}}》</h3>
    <p class="MCDes"> 第{{item.d}}期快牙专题</p>
  </div>
</template>

<script>
  export default {
    name: 'movieItem',
    data () {
      return {
      }
    },
    props: ['item'],
    methods: {
      toDaily: function (date) {
        window['_hmt'].push(['_trackEvent', 'click', '日报'])
        this.$store.commit('REDIRECT_DAILY_REPORT', {date: date})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .MCContainer{
    width: 100%;
    margin: 0 auto .4rem auto;
    padding-bottom: .2rem;
    border-bottom: 1px dashed #393074;
  }
  .MCPic{
    width: 100%;
  }
  .MCTitle{
    font-size: .28rem;
    color: #fff100;
    text-align: left;
    padding-bottom: .05rem;
  }
  .MCDes{
    font-size: .22rem;
    color: #d6d6d6;
    text-align: left;
  }
</style>
