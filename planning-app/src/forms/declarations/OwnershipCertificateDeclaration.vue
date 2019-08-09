<template>
  <div>
    <h1 class="govuk-heading-xl">
      Ownership Certificate Declaration
    </h1>

    <div class="govuk-inset-text">
      <p class="govuk-body" v-if="this.doesApplicantOwnTheLand === 'ownership-01'">
        {{declarationATitle}}
      </p>
      <p class="govuk-body" v-if="this.doesApplicantOwnTheLand === 'ownership-02'">
        {{declarationBTitle}}
      </p>
      <p class="govuk-body" v-if="this.doesApplicantOwnTheLand === 'ownership-03' || this.doesApplicantOwnTheLand === 'ownership-04'">
        {{declarationCTitle}}
      </p>
    </div>

    <p>I declare / The applicant declares that:</p>

    <ul class="govuk-list govuk-list--bullet" v-if="this.doesApplicantOwnTheLand === 'ownership-01'">
      <li v-for="(item, index) in this.declarationADescription" v-bind:key="index">{{item}}</li>
    </ul>
    
    <ul class="govuk-list govuk-list--bullet" v-if="this.doesApplicantOwnTheLand === 'ownership-02'">
      <li v-for="(item, index) in this.declarationBDescription" v-bind:key="index">{{item}}</li>
    </ul>
    
    <ul class="govuk-list govuk-list--bullet" v-if="this.doesApplicantOwnTheLand === 'ownership-03' || this.doesApplicantOwnTheLand === 'ownership-04'">
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
      doesApplicantOwnTheLand: '',
      declarationATitle: 'Ownership Certificate and Agricultural Land Declaration A',
      declarationADescription: ['21 days before the date of this application, nobody except the applicant was the owner of any part of the land or building to which the application relates'],
      declarationBTitle: 'Ownership Certificate and Agricultural Land Declaration B',
      declarationBDescription: ['the applicant has given the notice to everyone else who, 21 days before the date of this application, was the owner and/or agricultural tenant of any part of the land or building to which this application relates'],
      declarationCTitle: 'Ownership Certificate and Agricultural Land Declaration C',
      declarationCDescription: ['that all reasonable steps have been taken to find out the names and addresses of the other owners and/or agricultural tenants of the land or building, or of a part of it', 'I have/the applicant has been unable to do given them notice'],
    }
  },
  created () {
    this.doesApplicantOwnTheLand = this.$route.params.doesApplicantOwnTheLand;
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
  }
}
</script>
