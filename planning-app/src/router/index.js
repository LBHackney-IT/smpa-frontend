import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Overview from '../views/Overview.vue';
import Start from '../views/Start.vue';
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
import AboutDevelopment from '../forms/works/AboutDevelopment.vue';
import Surroundings from '../forms/surroundings/Surroundings.vue';
import Trees from '../forms/surroundings/Trees.vue';
import Access from '../forms/surroundings/Access.vue';
import Parking from '../forms/surroundings/Parking.vue';
import Materials from '../forms/materials/Materials.vue';
import WhatMaterials from '../forms/materials/WhatMaterials.vue';
import MaterialsStepOne from '../forms/materials/StepOne.vue';
import MaterialsStepTwo from '../forms/materials/StepTwo.vue';
import MaterialsStepThree from '../forms/materials/StepThree.vue';
import MaterialsStepFour from '../forms/materials/StepFour.vue';
import MaterialsStepFive from '../forms/materials/StepFive.vue';
import MaterialsConfirmation from '../forms/materials/Confirmation.vue';
import Documentation from '../forms/documentation/Documentation.vue';
import SupportingDocumentation from '../forms/documentation/SupportingDocumentation.vue';
import LocationPlan from '../forms/documentation/LocationPlan.vue';
import DesignAndAccessStatement from '../forms/documentation/DesignAndAccessStatement.vue';
import HeritageStatement from '../forms/documentation/HeritageStatement.vue';
import AdditionalPlans from '../forms/documentation/AdditionalPlans.vue';
import DocumentsReview from '../forms/documentation/DocumentsReview.vue';
import Contact from '../forms/contact/Contact.vue';
import ContactApplicant from '../forms/contact/ContactApplicant.vue';
import ContactAgent from '../forms/contact/ContactAgent.vue';
import Declarations from '../forms/declarations/Declarations.vue';
import Declaration from '../forms/declarations/Declaration.vue';
import DeclarationsAuthority from '../forms/declarations/DeclarationsAuthority.vue';
import DeclarationsOwnership from '../forms/declarations/DeclarationsOwnership.vue';
import Success from '../forms/declarations/Success.vue';

export default new Router({
  mode: 'history',
  base: '/',
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
      component: SiteDetails,
      props: true
    },
    {
      path: '/applications',
      component: Applications,
      children: [
        { path: '', name: 'Applications', component: WorkStart },
        { path: 'work-start', name: 'WorkStart', component: WorkStart },
        { path: 'multiple-occupation', name: 'MultipleOccupation', component: MultipleOccupation },
        { path: 'proposal', name: 'Proposal', component: Proposal },
        { path: 'about-proposal', name:'AboutProposal', component: AboutProposal },
        { path: 'about-development', name:'AboutDevelopment', component: AboutDevelopment },
        { 
          path: 'surroundings', 
          component: Surroundings,
          children: [
            { path: '', name: 'Surroundings', component: Trees },
            { path: 'trees', name: 'Trees', component: Trees },
            { path: 'access', name: 'Access', component: Access },
            { path: 'parking', name: 'Parking', component: Parking }
          ]
        },
        { 
          path: 'materials', 
          component: Materials,
          children: [
            { path: '', name: 'Materials', component: MaterialsStepOne },
            { path: 'steps', component: WhatMaterials },
            { path: 'steps/what-materials', name: 'WhatMaterials', component: WhatMaterials },
            { path: 'steps/1', name: 'MaterialsStep1', component: MaterialsStepOne },
            { path: 'steps/2', name: 'MaterialsStep2', component: MaterialsStepTwo },
            { path: 'steps/3', name: 'MaterialsStep3', component: MaterialsStepThree },
            { path: 'steps/4', name: 'MaterialsStep4', component: MaterialsStepFour },
            { path: 'steps/5', name: 'MaterialsStep5', component: MaterialsStepFive },
            { path: 'confirmation', name: 'MaterialsConfirmation', component: MaterialsConfirmation }
          ]
        },
        { 
          path: 'documentation', 
          component: Documentation,
          children: [
            { path: '', name: 'SupportingDocumentation', component: SupportingDocumentation },
            { path: 'location', name:'DocumentationLocation', component: LocationPlan },
            { path: 'design-access-statement', name: 'DocumentationDesignAccessStatement', component: DesignAndAccessStatement },
            { path: 'heritage-statement', name: 'DocumentationHeritageStatement', component: HeritageStatement },
            { path: 'additional-plans', name: 'DocumentationAdditionalPlans', component: AdditionalPlans },
            { path: 'docs-review', name: 'DocumentationDocsReview', component: DocumentsReview }
          ]
        },
        { 
          path: 'contact', 
          component: Contact,
          children: [
            { path: '', name: 'ApplicationContact', component: ContactAgent },
            { path: 'agent', name: 'ApplicationContactAgent', component: ContactAgent },
            { path: 'applicant', name:'ApplicationContactApplicant', component: ContactApplicant }
          ]
        },
        { 
          path: 'declarations', 
          component: Declarations,
          children: [
            { path: '', name: 'Declarations', component: DeclarationsAuthority },
            { path: 'authority', name:'DeclarationsAuthority', component: DeclarationsAuthority },
            { path: 'ownership', name:'DeclarationsOwnership', component: DeclarationsOwnership },
            { path: 'declaration', name:'DeclarationsOverview', component: Declaration },
            { path: 'success', name:'Success', component: Success },
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
