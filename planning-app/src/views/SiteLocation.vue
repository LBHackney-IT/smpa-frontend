<template>
  <div>
    <h1 class="govuk-heading-xl">Your site details</h1>

    <table class="govuk-table govuk-!-margin-bottom-9">
      <caption class="govuk-table__caption govuk-!-margin-bottom-8">This is the information we currently hold about the chosen address:</caption>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <th class="govuk-table__header" scope="row">Address</th>
          <td class="govuk-table__cell">
            {{this.application.data.site_address.address_line_1}}<br>
            {{this.application.data.site_address.address_line_2}}<br>
            {{this.application.data.site_address.address_line_3}}<br> 
            {{this.application.data.site_address.postcode}}<br> 
            {{this.application.data.site_address.town_city}}<br> 
          </td>
        </tr>
        <tr class="govuk-table__row">
          <th class="govuk-table__header" scope="row">Easting & Northing</th>
          <td class="govuk-table__cell">{{this.application.data.site_address.easting}}, {{this.application.data.site_address.northing}}</td>
        </tr>
        <tr class="govuk-table__row">
          <th class="govuk-table__header" scope="row">Property type</th>
          <td class="govuk-table__cell">{{this.application.data.site_address.property_type}}</td>
        </tr>
        <tr class="govuk-table__row">
          <th class="govuk-table__header" scope="row">BLPU classification</th>
          <td class="govuk-table__cell">{{this.application.data.site_address.description}}</td>
        </tr>
      </tbody>
    </table>

    <v-map v-if="this.application" :geoJson="this.application.data.site_address.siteGeoJson"></v-map>

    <table class="govuk-table govuk-!-margin-bottom-9">
      <caption class="govuk-table__caption govuk-!-font-weight-regular govuk-!-margin-bottom-8">The following planning considerations are relevant to your planning application.</caption>
      <tbody class="govuk-table__body">
        <tr class="govuk-table__row">
          <th class="govuk-table__header" scope="row">Conservation area</th>
          <td class="govuk-table__cell">
            <span v-if="this.application.data.site_constraints.nb_conarea > 0">{{this.application.data.site_constraints.conarea_name }}</span>
            <span v-if="this.application.data.site_constraints.nb_conarea === 0">No</span>
          </td>
        </tr>
        <tr class="govuk-table__row">
          <th class="govuk-table__header" scope="row">Listed building</th>
          <td class="govuk-table__cell">
            <span v-if="parseInt(this.application.data.site_constraints.is_listed_building) > 0">Yes</span>
            <span v-if="parseInt(this.application.data.site_constraints.is_listed_building) === 0">No</span>
          </td>
        </tr>
        <tr class="govuk-table__row">
          <th class="govuk-table__header" scope="row">Article 4 Directions</th>
          <td class="govuk-table__cell">
            <span v-if="this.application.data.site_constraints.nb_a4d > 0">{{this.application.data.site_constraints.a4d_name }}</span>
          </td>
        </tr>
        <tr class="govuk-table__row" v-if="parseInt(this.application.data.site_constraints.is_floodzone_2) > 0 || parseInt(this.application.data.site_constraints.is_floodzone_3a) > 0 || parseInt(this.application.data.site_constraints.is_floodzone_3b) > 0 ">
          <th class="govuk-table__header" scope="row">Climate change and environmental sustainability</th>
          <td class="govuk-table__cell">
            <span v-if="parseInt(this.application.data.site_constraints.is_floodzone_2) > 0">Flood Zone 2</span>
            <span v-if="parseInt(this.application.data.site_constraints.is_floodzone_3a) > 0">Flood Zone 3a</span>
            <span v-if="parseInt(this.application.data.site_constraints.is_floodzone_3b) > 0">Flood Zone 3b</span>
          </td>
        </tr>
      </tbody>
    </table>

    <router-link class="govuk-button" :to="{ name: 'ApplicationTaskOverview', params: { applicationId: this.application.data.id}}">Continue</router-link>
  </div>
</template>

<script>
  import { getRouteAppId } from '../mixins/getRouteAppId';
  import vMap from '../components/Map.vue';
  import vCta from '../components/Cta.vue';

  export default {
    mixins: [ getRouteAppId ],
    name: 'SiteLocation',
    components: {
      vMap
    },
    computed: {
      application () {
        let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
        return this.$store.state.state.applications[index];
      }
    }
  }
</script>
