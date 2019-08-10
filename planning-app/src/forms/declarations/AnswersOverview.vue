<template>
  <div>
    <h1 class="govuk-heading-xl">Check your answers before sending the application</h1>

    <h2 class="govuk-heading-l">Personal details</h2>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Applicant name
        </dt>
        <dd class="govuk-summary-list__value">
          {{this.application.data.applicant.full_name}}
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> applicant name</span>
          </a>
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Agent name
        </dt>
        <dd class="govuk-summary-list__value">
          {{this.application.data.agent.full_name}}
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> name of agent</span>
          </a>
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Contact information
        </dt>
        <dd class="govuk-summary-list__value">
          <p>{{this.application.data.agent.address_line_1}} </p>
          <p>{{this.application.data.agent.address_line_2}}</p>
          <p>{{this.application.data.agent.town_city}}</p>
          <p>{{this.application.data.agent.postcode}}</p>
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> contact information</span>
          </a>
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Contact details
        </dt>
        <dd class="govuk-summary-list__value">
          <p class="govuk-body">{{this.application.data.agent.phone}}</p>
          <p class="govuk-body">{{this.application.data.agent.email}}</p>
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> contact details</span>
          </a>
        </dd>
      </div>
    </dl>

    <h2 class="govuk-heading-l">Application details</h2>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Address
        </dt>
        <dd class="govuk-summary-list__value">
          <p>{{this.application.data.site_address.address_line_1}} </p>
          <p>{{this.application.data.site_address.address_line_2}}</p>
          <p>{{this.application.data.site_address.town_city}}</p>
          <p>{{this.application.data.site_address.postcode}}</p>
        </dd>

        <dd class="govuk-summary-list__actions">
          
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Description
        </dt>
        <dd class="govuk-summary-list__value">
          descroption of works
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> works</span>
          </a>
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Have the works already started?
        </dt>
        <dd class="govuk-summary-list__value">
          <p v-if="this.application.data.works_started">Yes</p>
          <p v-if="!this.application.data.works_started">No</p>
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> works started information</span>
          </a>
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Floor area added (GIA)
        </dt>
        <dd class="govuk-summary-list__value">
          <p class="govuk-body">{{this.application.data.proposal_extension.additional_floor_area}} {{this.application.data.proposal_extension.additional_floor_area_units.name}}</p>
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> floor area added</span>
          </a>
        </dd>
      </div>
    </dl>

    <h2 class="govuk-heading-l">Surroundings</h2>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Trees inside the boundary
        </dt>
        <dd class="govuk-summary-list__value">
          <p v-if="this.application.data.proposal_extension.trees.inside_boundry">Yes</p>
          <p v-if="!this.application.data.proposal_extension.trees.inside_boundry">No</p>
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> trees inside boundary</span>
          </a>
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Trees outside the boundary
        </dt>
        <dd class="govuk-summary-list__value">
          <p v-if="this.application.data.proposal_extension.trees.outside_boundry">Yes</p>
          <p v-if="!this.application.data.proposal_extension.trees.outside_boundry">No</p>
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> trees outside boundary</span>
          </a>
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Trees pruned or removed
        </dt>
        <dd class="govuk-summary-list__value">
          <p v-if="this.application.data.proposal_extension.trees.removed_or_pruned">Yes</p>
          <p v-if="!this.application.data.proposal_extension.trees.removed_or_pruned">No</p>
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> trees pruned or removed</span>
          </a>
        </dd>
      </div>
    </dl>

    <h2 class="govuk-heading-l">Materials</h2>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Walls cladding
        </dt>
        <dd class="govuk-summary-list__value">
          undefined
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> walls cladding materials</span>
          </a>
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Roof covering
        </dt>
        <dd class="govuk-summary-list__value">
          undefined
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> roof covering materials</span>
          </a>
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Windows
        </dt>
        <dd class="govuk-summary-list__value">
          undefined
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> windows materials</span>
          </a>
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Doors
        </dt>
        <dd class="govuk-summary-list__value">
          undefined
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> change doors materials</span>
          </a>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Other materials
        </dt>
        <dd class="govuk-summary-list__value">
          {{this.application.data.proposal_extension.materials.other}}
        </dd>
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> other materials</span>
          </a>
        </dd>
      </div>
    </dl>

    <h2 class="govuk-heading-l">Support documentation</h2>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          file.pdf
        </dt>
   
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> applicant name</span>
          </a>
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
         file.pdf
        </dt>
     
        <dd class="govuk-summary-list__actions">
          <a class="govuk-link" href="#">
            Change<span class="govuk-visually-hidden"> name of agent</span>
          </a>
        </dd>
      </div>
    </dl>

    <h2 class="govuk-heading-l">Declaration of interest</h2>

<dl class="govuk-summary-list">
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Doors
      </dt>
      <dd class="govuk-summary-list__value">
        name here
      </dd>
      <dd class="govuk-summary-list__actions">
        <a class="govuk-link" href="#">
          Change<span class="govuk-visually-hidden"> name of agent</span>
        </a>
      </dd>
    </div>
    </dl>

    <h2 class="govuk-heading-l">Ownerships Certificates and Agricultural Land Declaration</h2>
<dl class="govuk-summary-list">
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Doors
      </dt>
      <dd class="govuk-summary-list__value">
        name here
      </dd>
      <dd class="govuk-summary-list__actions">
        <a class="govuk-link" href="#">
          Change<span class="govuk-visually-hidden"> name of agent</span>
        </a>
      </dd>
    </div>
    </dl>

    <h3 class="govuk-heading-m">Now submit your application</h3>

    <p>By submitting this application you are confirming that, to the best of your knowledge, the details you are providing are correct.</p>

    <v-cta name="Confirm" :onClick="navigate"></v-cta>

  </div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';


  export default {
    name: 'AnswersOverview',
    mixins: [ getRouteAppId ],
    components: {
      vCta
    },
    methods: {
      navigate() {  
        router.push({ name: 'Payment' });
      }
    },
    computed: {
      application () {
        let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );

        console.log('------the application-------', this.$store.state.state.applications[index]);
        return this.$store.state.state.applications[index];
      }
    }
  }
</script>
