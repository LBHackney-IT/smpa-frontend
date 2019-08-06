import Vue from 'vue';
import Router from 'vue-router';
import JwtService from '@/common/jwt.service';
import store from '@/store/index';

Vue.use(Router);


import PlanningApplicationSteps from '../views/PlanningApplicationSteps.vue';
import SiteSearch from '../views/SiteSearch.vue';
import SiteDetails from '../views/SiteDetails.vue';
import SignIn from '../views/SignIn.vue';
import SignOut from '../views/SignOut.vue';
import ResetPassword from '../views/ResetPassword.vue';
import AccountOverview from '../views/AccountOverview.vue';
import AccountActions from '../views/AccountActions.vue';
import Overview from '../views/Overview.vue';
import ApplicationOverview from '../views/ApplicationOverview.vue';
import CreateAccount from '../views/CreateAccount.vue';
import Applications from '../views/Applications.vue';
import UserApplications from '../views/UserApplications.vue';
import WorkStart from '../forms/works/WorkStart.vue';
import Proposal from '../forms/works/Proposal.vue';
import AboutProposal from '../forms/works/AboutProposal.vue';
import AboutDevelopment from '../forms/works/AboutDevelopment.vue';
import AboutChangesToOriginalHouse from '../forms/works/AboutChangesToOriginalHouse.vue';
import Surroundings from '../forms/surroundings/Surroundings.vue';
import Trees from '../forms/surroundings/Trees.vue';
import MoreAboutAccess from '../forms/surroundings/MoreAboutAccess.vue';
import Access from '../forms/surroundings/Access.vue';
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
import AboutApplicant from '../forms/contact/AboutApplicant.vue';
import Declarations from '../forms/declarations/Declarations.vue';
import DeclarationOfInterest from '../forms/declarations/DeclarationOfInterest.vue';
import DeclarationsOwnership from '../forms/declarations/DeclarationsOwnership.vue';
import OwnershipCertificateDeclaration from '../forms/declarations/OwnershipCertificateDeclaration.vue';
import AboutEquipment from '../forms/equipment/AboutEquipment.vue';
import AboutParking from '../forms/parking/About.vue';
import Parking from '../forms/parking/Parking.vue';
import CarParkingSpaces from '../forms/parking/CarParkingSpaces.vue';
import BikeParkingSpaces from '../forms/parking/BikeParkingSpaces.vue';
import EVChargingPoints from '../forms/parking/ElectricalVehicles.vue';
import Basement from '../forms/basement/Basement.vue';
import AboutBasement from '../forms/basement/AboutBasement.vue';
import WorksFloorArea from '../forms/works/WorksFloorArea.vue';
import WorksData from '../forms/works/WorksData.vue';
import WorksXLocation from '../forms/works/WorksXLocation.vue';
import Roofs from '../forms/roofs/Roofs.vue';
import AboutRoofs from '../forms/roofs/AboutRoofs.vue';
import GatesFencesWalls from '../forms/gates-fences-walls/AboutGatesFencesWalls.vue';
import FreeTextForm from '../forms/works/FreeTextForm.vue';
import DescriptionOfTheWorks from '../forms/works/DescriptionOfTheWorks.vue';
import Outbuilding from '../forms/works/Outbuilding.vue';
import Payment from '../forms/payment/Payment.vue';
import Eligibility from '../forms/payment/Eligibility.vue';
import Pay from '../forms/payment/Pay.vue';
import PaymentCheck from '../forms/payment/PaymentCheck.vue';
import PaymentSuccessful from '../forms/payment/PaymentSuccessful.vue';
import NotFound from '../views/404.vue';

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: PlanningApplicationSteps
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
      path: '/sites/:postcode',
      name: 'SiteDetails',
      component: SiteDetails,
      props: true
    },
    {
      path: '/applications',
      component: Applications,
      beforeEnter: (to, from, next) => {
        //if signed in
        if (!!JwtService.getToken()) {

          //check if there is an applicationId in the url
          if (to.params.applicationId) {
            //check if :applicationId belongs to account

            // //if we can get this application id with this token
            store.dispatch('getApplication', to.params.applicationId).then((response) => {
              // if no error
              next();
            });
          } else {
            next({
              path: '/account'
            });
          }
        } else {
          //if not signed in
          next({
            path: '/sign-in',
            query: { redirect: to.fullPath }
          })
        }  
      },
      children: [
        { 
          path: '', 
          name: 'Applications', 
          component: Overview
        }, //redirect to page that lists all applications associated with the signed in user
        { 
          path: ':applicationId', 
          name:'ApplicationOverview', 
          component: ApplicationOverview,
          children: [
            { 
              path: '', 
              name: 'ApplicationOverview', 
              component: Overview 
            },
            { 
              path: 'overview', 
              name:'Overview', 
              component: Overview 
            },
            { 
              path: 'work-start', 
              name: 'WorkStart', 
              component: WorkStart 
            },
            { 
              path: 'proposal', 
              name: 'Proposal', 
              component: Proposal 
            },
            { 
              path: 'about-proposal', 
              name:'AboutProposal', 
              component: AboutProposal 
            },
            { 
              path: 'about-changes-to-original-house', 
              name:'AboutChangesToOriginalHouse', 
              component: AboutChangesToOriginalHouse 
            },
            { 
              path: 'about-development', 
              name:'AboutDevelopment', 
              component: AboutDevelopment 
            },
            { 
              path: 'about-equipment', 
              name:'AboutEquipment', 
              component: AboutEquipment 
            },
            { 
              path: 'works-floor-area', 
              name:'WorksFloorArea', 
              component: WorksFloorArea 
            },
            { 
              path: 'works-data', 
              name:'WorksData', 
              component: WorksData 
            },
            { 
              path: 'works-x-location/:id', 
              name:'WorksXLocation', 
              component: WorksXLocation 
            },
            { 
              path: 'free-text-form', 
              name:'FreeTextForm', 
              component: FreeTextForm 
            },
            { 
              path: 'description-of-the-works', 
              name:'DescriptionOfTheWorks', 
              component: DescriptionOfTheWorks 
            },
            { 
              path: 'outbuilding', 
              name:'Outbuilding', 
              component: Outbuilding 
            },
            { 
              path: 'basement', 
              component: Basement,
              children: [
                { path: '', name: 'Basement', component: AboutBasement }
              ]
            },
            { 
              path: 'gates-fence-walls', 
              component: GatesFencesWalls,
              children: [
                { path: '', name: 'GatesFencesWalls', component: GatesFencesWalls }
              ]
            },
            { 
              path: 'roofs', 
              component: Roofs,
              children: [
                { path: '', name: 'Roofs', component: AboutRoofs }
              ]
            },
            { 
              path: 'surroundings', 
              component: Surroundings,
              children: [
                { path: '', name: 'Surroundings', component: Trees },
                { path: 'trees', name: 'Trees', component: Trees },
                { path: 'access', name: 'Access', component: Access },
                { path: 'more-about-access', name: 'MoreAboutAccess', component: MoreAboutAccess }
              ]
            },
            { 
              path: 'parking', 
              component: Parking,
              children: [
                { path: '', name: 'Parking', component: AboutParking },
                { path: 'cars', name: 'CarParkingSpaces', component: CarParkingSpaces },
                { path: 'bikes', name: 'BikeParkingSpaces', component: BikeParkingSpaces },
                { path: 'ev-charging-points', name: 'EVChargingPoints', component: EVChargingPoints }
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
                { path: 'applicant', name:'ApplicationContactApplicant', component: ContactApplicant },
                { path: 'about-applicant', name:'AboutApplicant', component: AboutApplicant }
              ]
            },
            { 
              path: 'declarations', 
              component: Declarations,
              children: [
                { path: '', name: 'Declarations', component: DeclarationOfInterest },
                { path: 'authority', name:'DeclarationOfInterest', component: DeclarationOfInterest },
                { path: 'ownership', name:'DeclarationsOwnership', component: DeclarationsOwnership },
                { path: 'certificate', name: 'OwnershipCertificateDeclaration', component: OwnershipCertificateDeclaration }
              ]
            },
            { 
              path: 'payment', 
              component: Payment,
              children: [
                { path: '', name: 'Payment', component: Eligibility },
                { path: 'eligibility', name:'Eligibility', component: Eligibility },
                { path: 'pay', name:'Pay', component: Pay },
                { path: 'check/:paymentId', name:'Check', component: PaymentCheck },
                { path: 'success', name:'PaymentSuccessful', component: PaymentSuccessful }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/sign-out',
      name: 'SignOut',
      component: SignOut
    },
    {
      path: '/account',
      name: 'AccountOverview',
      component: AccountOverview,
      children: [
        { 
          path: '', 
          name: 'AccountActions', 
          component: AccountActions 
        },
        { 
          path: 'applications', 
          name: 'UserApplications', 
          component: UserApplications 
        }
      ]
    },
    {
      name: 'create',
      path: '/create-account',
      component: CreateAccount
    },
    {
      path: '*', 
      component: NotFound
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
