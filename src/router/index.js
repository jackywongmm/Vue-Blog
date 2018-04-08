import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'index'
    },
    {
      path:'/index',
      name:"index",
      component:()=>import('@/components/Fronted/index')
    },
    {
      path:'/contact',
      name:'contact',
      component:()=>import('@/components/Fronted/contactme')
    },
    {
      path:'/details/:id',
      name:'details',
      component:()=>import('@/components/Fronted/details')
    },
    {
      path:'/setting',
      name:'setting',
      redirect:'/setting/information',
      component:()=>import('@/components/Fronted/setting'),
      children:[
        {
          path:'information',
          name:'information',
          component:()=>import('@/components/Backend/information')
        },
        {
          path:'board',
          name:'board',
          component:()=>import('@/components/Backend/board')
        },
        {
          path:'message',
          name:'message',
          component:()=>import('@/components/Backend/message')
        },
        {
          path:'postlist',
          name:'postlist',
          component:()=>import('@/components/Backend/postlist')
        },
        {
          path:'type',
          name:'type',
          component:()=>import('@/components/Backend/type')
        },
        {
          path:'trash',
          name:'trash',
          component:()=>import('@/components/Backend/trash')
        },
        {
          path:'links',
          name:'links',
          component:()=>import('@/components/Backend/links')
        }
      ]
    }
  ]
})
