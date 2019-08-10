<template>
  <div>
    <h1 class="govuk-heading-xl">
      Ownership Certificate Declaration
    </h1>

    <div class="govuk-inset-text">
      <p class="govuk-body" v-if="this.ownership_type === '784e54c7-d6da-4613-ac5a-046a27278f4b'">
        {{declarationATitle}}
      </p>
      <p class="govuk-body" v-if="this.ownership_type === '5b82763c-b4b1-44d5-b657-a12ed6e3e589'">
        {{declarationBTitle}}
      </p>
      <p class="govuk-body" v-if="this.ownership_type === 'b1a704bc-86c1-493a-b396-d406b7ca8438' || this.ownership_type === '4d618804-ccc3-478e-be36-4746000a67d8'">
        {{declarationCTitle}}
      </p>
    </div>

    <p>I declare / The applicant declares that:</p>

    <ul class="govuk-list govuk-list--bullet" v-if="this.ownership_type === '784e54c7-d6da-4613-ac5a-046a27278f4b'">
      <li v-for="(item, index) in this.declarationADescription" v-bind:key="index">{{item}}</li>
    </ul>
    
    <ul class="govuk-list govuk-list--bullet" v-if="this.ownership_type === '5b82763c-b4b1-44d5-b657-a12ed6e3e589'">
      <li v-for="(item, index) in this.declarationBDescription" v-bind:key="index">{{item}}</li>
    </ul>
    
    <ul class="govuk-list govuk-list--bullet" v-if="this.ownership_type === 'b1a704bc-86c1-493a-b396-d406b7ca8438' || this.ownership_type === '4d618804-ccc3-478e-be36-4746000a67d8'">
      <li v-for="(item, index) in this.declarationCDescription" v-bind:key="index">{{item}}</li>
    </ul>

    <v-cta name="Confirm" :onClick="navigate"></v-cta>
  </div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
  name: 'OwnershipCertificateDeclaration',
  mixins: [ getRouteAppId ],
	components: {
    vCta
  },
  data () {
    return {
      declarationATitle: 'Ownership Certificate and Agricultural Land Declaration A',
      declarationADescription: ['21 days before the date of this application, nobody except the applicant was the owner of any part of the land or building to which the application relates'],
      declarationBTitle: 'Ownership Certificate and Agricultural Land Declaration B',
      declarationBDescription: ['the applicant has given the notice to everyone else who, 21 days before the date of this application, was the owner and/or agricultural tenant of any part of the land or building to which this application relates'],
      declarationCTitle: 'Ownership Certificate and Agricultural Land Declaration C',
      declarationCDescription: ['that all reasonable steps have been taken to find out the names and addresses of the other owners and/or agricultural tenants of the land or building, or of a part of it', 'I have/the applicant has been unable to do given them notice'],
    }
  },
	methods: {
    navigate() {
      var payload = {};
      payload.id = this.applicationId;
      payload.data = {};
      payload.data.ownership_declaration = true;

      this.$store.dispatch('updateApplication', payload).then(() => {
        router.push({ name: 'FormOverview' });
      });
      
    }
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
      return this.$store.state.state.applications[index];
    },
    ownership_type () {
      return this.application.data.ownership_type_id;
    }
  }
}
</script>
