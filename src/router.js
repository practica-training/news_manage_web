import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from "./views/Index";

Vue.use(Router);

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children:[
        {
          path:"",
          name:"home",
          component:() => import('./views/Home')
        },
        {
          path: 'list',
          name: 'list',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/List')
        },
        {
          path: 'else',
          name: 'elselist',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/ElseList')
        },
        {
          path: 'article',
          name: 'article',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/Article')
        },
        {
          path: 'search',
          name: 'Search',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/Search')
        },
        {
          path: 'teacher',
          name: 'Teacher',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/TeacherPlus')
        },
        {
          path: 'teacherPlus',
          name: 'TeacherPlus',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/TeacherPlus')
        },
        {
          path: 'comment',
          name: '进行评价的组件',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './components/NewsComment')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login')
    },
    {//上面的都不匹配，则跳转到404
      path: '*',
      name: 'notFound',
      component: () => import(/* webpackChunkName: "about" */ './views/NotFound.vue')
    }
  ]
})
