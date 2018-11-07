import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Overview from '../views/Overview.vue';
import Start from '../views/Start.vue';
import WhatToDo from '../views/WhatToDo.vue'; 
import SiteSearch from '../views/SiteSearch.vue';
import SiteDetails from '../views/SiteDetails.vue';
import SignIn from '../views/SignIn.vue';
import Accounts from '../views/Accounts.vue';
import CreateAccount from '../views/CreateAccount.vue';

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Overview
    },
    {
      name: 'Start',
      path: '/start',
      component: Start
    },
    {
      name: 'WhatToDo',
      path: '/what-to-do',
      component: WhatToDo
    },
    {
      path: '/sites',
      redirect: { name: 'SiteSearch' },
    },
    {
      name: 'SiteSearch',
      path: '/sites/search',
      component: SiteSearch
    },
    {
      path: '/sites/:siteId',
      name: 'SiteDetails',
      component: SiteDetails
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts
    },
    {
      name: 'create',
      path: '/accounts/create',
      component: CreateAccount
    },
    {
      path: '*', 
      redirect: '/'
    }
  ]
})
