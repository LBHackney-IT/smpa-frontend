<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl" v-if="serviceAvailable">Search site</h1>
      <h1 class="govuk-heading-xl" v-if="!serviceAvailable">Sorry, this service is not available for this property</h1>

			<div class="govuk-form-group" v-if="!hasResults && !loading">
				<label class="govuk-label govuk-!-font-weight-bold" for="postcode">
					Enter postcode
				</label>
				<input class="govuk-input govuk-!-width-one-quarter govuk-radios--inline govuk-!-margin-right-5" id="postcode" name="postcode" type="text" v-model="postcode" v-on:input="reset" v-on:keyup.13="getPostcode">
        <v-cta name="Find address" :onClick="getPostcode"></v-cta>

        <div v-if="error && !loading" class="govuk-inset-text govuk-inset-text--error ">
          {{ errorMessage }}
        </div>
			</div>

      <div v-if="hasZeroResults && !loading" class="govuk-inset-text govuk-inset-text--error ">
        There are no results matching your search term. Please try again.
      </div>



      <div v-if="hasResults && !loading || loading">
        <p class="govuk-!-font-weight-bold">Postcode</p>
        <p class="govuk-!-font-weight-bold">
          <span>{{postcode}}</span>
          <button class="govuk-link govuk-!-margin-left-5" v-on:click="reset">Change</button>
        </p>
      </div>

      <p v-if="loading">Loading results...</p>

      <p v-if="!loading && !serviceAvailable">If you are proposing works to a flat you need to apply for full planning permission. This service is still in development. Please submit your application using <a href="https://www.planningportal.co.uk/">Planning Portal</a>.</p>

      <div v-if="hasResults && !loading && serviceAvailable">
        <div class="govuk-form-group">
          <label class="govuk-label" for="address">
            Select an address
          </label>
          <select class="govuk-select" name="address" v-model="selected" id="address">
            <option v-for="address in this.addressesResponse.address" v-bind:value="address" v-bind:key="address.uprn">
              {{ address.line1 }} {{ address.line2 }} {{ address.line3 }}
            </option>
          </select>
        </div>
        <v-cta name="Continue" :onClick="navigate"></v-cta>
      </div>
    
    </div>
  </div>
</template>

<script>
	import vCta from '../components/Cta.vue';
  import router from '../router';
  import axios from 'axios';

  const CancelToken = axios.CancelToken;
  let cancel;

	export default {
		name: 'SiteSearch',
		components: {
			vCta
		},
		data () {
			return {
        postcode: '',
        loading: false,
        addressesResponse: {},
        error: false,
        errorMessage: '',
        selected: '',
        serviceAvailable: true
			}
		},
		methods: {
      reset() {
        if (this.loading) {
          cancel();
        }
        this.error = false;
        this.addressesResponse = {};
        this.serviceAvailable = true;
        this.selected = {};
      },
      getPostcode() {
        if (this.postcode.trim() === '') {
          this.error = true;
          this.errorMessage = 'Postcode is empty. Please try again.';
          return;  
        }

        this.loading = true;
        const api = "https://ndws9fa08d.execute-api.eu-west-2.amazonaws.com/production/api/v1/addresses/";
        const token = process.env.VUE_APP_ADDRESSAPITOKEN;
        axios.get(api , { 
          headers: { 
            "x-api-key" : `${token}`
          },
          params: {
            'PostCode': this.postcode,
            'Format': 'Detailed'
          },
          cancelToken: new CancelToken(function executor(c) {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          })
        })
        .then(response => {
          this.loading = false;
          this.addressesResponse = response.data.data;
        })
        .catch(error => {
          this.error = true;
          this.errorMessage = 'There has been an error. Please try again.';
        })
        .finally(() => { 
          this.loading = false
        })
      },
			navigate() {
        if (this.selected.usageCode == 'RD02' || this.selected.usageCode == 'RD03' || this.selected.usageCode == 'RD04' || this.selected.usageCode == 'RD') {
          router.push({ name: 'SiteDetails', params: { selectedAddress: this.selected, postcode: this.postcode.replace( /\s/g, '')} });
        } else {
          this.serviceAvailable = false;
        }
      }
    },
    computed: {
      hasZeroResults () {

        if (this.addressesResponse) {
          return this.addressesResponse.total_count === 0;
        } 
        
      },
      hasResults () {

        if (this.addressesResponse) {
          return this.addressesResponse.total_count > 0;
        } 
        
      }
    }
	}

</script>
