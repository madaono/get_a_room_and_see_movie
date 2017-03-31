<template>
  <transition name="fade1">
    <div class="openedD"></div>
  </transition>
</template>

<script>
  export default {
    name: 'openedDoor',
    computed: {
    },
    mounted: function () {
      setTimeout(() => {
//        this.$router.push('/zapya/room/redirect?uid=' + this.$store.state.chooseUid + '&path=' + this.$store.state.choosePath)
//        this.$router.push('/room?uid=14744247&path=MD5:3280ec5f141d12317569bf586ff5ed9e&num=1000')
        this.$store.dispatch('redirectToRoom')
      }, 1500)
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .openedD{
    width: 100%;
    height: 12.8rem;
    position: fixed;
    top:0;
    background: url('../../assets/imgs/openeddoor.jpg') no-repeat;
    background-size: 100% 100%;
  }

  .fade1-enter-active, .fade1-leave-active {
    transition: opacity 1s
  }
  .fade1-enter, .fade1-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
