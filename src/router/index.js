import Vue from 'vue'
import Router from 'vue-router'
// import index from '../pages/index/index.vue'
// import room from '../pages/room/room.vue'
// import search from '../pages/search/search.vue'
import App from '../App'

Vue.use(Router)

/*
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/room',
      name: 'room',
      component: room
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
*/

export default [{
  path: '/zapya/',
  component: App,
  children: [{
    path: 'room/main*',
    component: r => require.ensure([], () => r(require('../pages/index/index.vue')), 'index')
  }, {
    path: 'room/in*',
    component: r => require.ensure([], () => r(require('../pages/room/room.vue')), 'room')
  }, {
    path: 'room/search*',
    component: r => require.ensure([], () => r(require('../pages/search/search.vue')), 'search')
  }]
}]
