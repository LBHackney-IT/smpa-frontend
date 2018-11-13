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
import Applications from '../views/Applications.vue';
import WorkStart from '../forms/works/WorkStart.vue';
import MultipleOccupation from '../forms/works/MultipleOccupation.vue';
import Proposal from '../forms/works/Proposal.vue';
import AboutProposal from '../forms/works/AboutProposal.vue';
import AboutDevelopment from '../forms/development/AboutDevelopment.vue';
import Surroundings from '../forms/surroundings/Surroundings.vue';
import Trees from '../forms/surroundings/Trees.vue';
import Access from '../forms/surroundings/Access.vue';
import Parking from '../forms/surroundings/Parking.vue';

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
      path: '/applications',
      name: 'Applications',
      component: Applications,
      children: [
        { path: '', component: WorkStart },
        { path: 'work-start', component: WorkStart },
        { path: 'multiple-occupation', component: MultipleOccupation },
        { path: 'proposal', component: Proposal },
        { path: 'about-proposal', component: AboutProposal },
        { path: 'about-development', component: AboutDevelopment },
        { 
          path: 'surroundings', 
          component: Surroundings,
          children: [
            { path: '', component: Trees },
            { path: 'access', component: Access },
            { path: 'parking', component: Parking }
          ]
        }
      ]
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
