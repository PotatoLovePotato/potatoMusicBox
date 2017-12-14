import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '../components/Home'
import Content from '../components/Home/Content'
import Contlist from '../components/Home/Contlist'
import Player from '../components/Player'

export default new Router({
    routes: [
        {
            path:'/',
            component: Home,
            redirect: '/content',
            children:[
                {
                    path: 'content',
                    name: 'content',
                    component: Content
                },
                {
                    path: 'contlist',
                    name: 'contlist',
                    component: Contlist
                }
            ]
        },
        {
            path: '/player',
            name: 'player',
            component: Player
        },
        {
            path:'*',
            redirect: '/'
        }
    ]
})
