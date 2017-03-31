<template>
  <div class="search-container">
    <i class="back" @click="backToIndex"></i>
    <input type="text" class="search-input" placeholder=" 62568用户正在搜索《金刚骷髅岛》" v-model="searchContext">
    <span class="search" @click="searchMovie">搜索</span>
  </div>
</template>

<script>
  export default {
    name: 'searchBar1',
    computed: {
      searchContext: {
        get () {
          return this.$store.state.searchContext
        },
        set (value) {
          this.$store.commit('UPDATE_MESSAGE', value)
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      searchMovie: function () {
        if (this.$store.state.searchContext !== '') {
          this.$store.dispatch('search')
          this.$router.push('search')
          window['_hmt'].push(['_trackEvent', 'search', '搜索', this.$store.state.searchContext])
        }
      },
      backToIndex: function () {
        this.$router.push('/zapya/room/main')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-container{
    width: 100%;
    text-align: center;
    line-height: .65rem;
    font-size: 0;
    /*padding-bottom: .4rem;*/
    height: 1.6rem;
  }
  .search-input{
    display: inline-block;
    box-sizing: border-box;
    height: .55rem;
    width: 70%;
    margin: 0 auto;
    background-color: #160b5b;
    border: 2px solid #bbbac1;
    border-radius: .1rem;
    color: #fff;
    font-size:16px;
    padding-left: .3rem;
    margin-left: .25rem;
    padding-bottom: .05rem;
  }
  .search-input::placeholder{
    color: #bbbac1;
    font-size: 12px;
    margin-bottom: -.1rem;
  }
  .search{
    display: inline-block;
    font-size: 18px;
    color: gray;
    margin-left: .15rem;
    vertical-align: sub;
  }
  .back{
    display: inline-block;
    width: .37rem;
    height: .34rem;
    background: url("../../assets/imgs/fanhui.png") no-repeat;
    background-size: 100% 100%;
    margin: .8rem 0;
    vertical-align: middle;
  }
  input:focus {
    outline: none;
  }
</style>
