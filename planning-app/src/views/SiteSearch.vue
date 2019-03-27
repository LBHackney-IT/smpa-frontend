<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Search site</h1>

			<div class="govuk-form-group" v-if="!hasResults && !loading">
				<label class="govuk-label" for="postcode">
					Enter postcode
				</label>
				<input class="govuk-input govuk-!-width-one-quarter govuk-radios--inline" id="postcode" name="postcode" type="text" v-model="postcode">
        <v-cta name="Find address" :onClick="getPostcode"></v-cta>

        <div v-if="error && !loading">
          There has been an error. Please try again.
        </div>
			</div>


      <div v-if="hasZeroResults && !loading">
        There are no results matching your search term. Please try again.
      </div>


      <div v-if="loading">
        <p>Postcode</p>
        <p>{{postcode}}</p>

        <p>Loading results...</p>
      </div>

      <div v-if="hasResults && !loading">
        <p>Postcode</p>
        <p>{{postcode}}</p>

        <label class="govuk-label" for="address">
          Select an address
        </label>

        <select v-model="selected" id="address">
          <option v-for="address in this.addressesResponse.address" v-bind:value="address" v-bind:key="address.uprn">
            {{ address.line1 }} {{ address.line2 }} {{ address.line3 }}
          </option>
        </select>

        <br/>

        <v-cta name="Continue" :onClick="navigate"></v-cta>
      </div>
    
    </div>
  </div>
</template>

<script>
	import vCta from '../components/Cta.vue';
  import router from '../router';
  import axios from 'axios';

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
        selected: ''
			}
		},
		methods: {
      getPostcode() {
        this.loading = true;
        const api = "https://g6bw0g0ojk.execute-api.eu-west-2.amazonaws.com/staging/address/api/v1/addresses/";
        const token = process.env.VUE_APP_ADDRESSAPITOKEN;
        axios.get(api , { 
          headers: { 
            "x-api-key" : `${token}`
          },
          params: {
            'PostCode': this.postcode,
            'Format': 'Detailed'
          }
        })
        .then(response => {
          this.loading = false;
          this.addressesResponse = response.data.data;
        })
        .catch(error => {
          this.error = true;
          console.log('error', error);
        })
        .finally(() => { 
          this.loading = false
        })
      },
			navigate() {
        this.$store.commit('setSite', JSON.parse(JSON.stringify(this.selected)));

        //todo check if site id is still necessary at this point. random number for mocking purposes
        const randomNumber = parseInt((Math.random() * 10000000) + 1);

        router.push({ name: 'SiteDetails', params: { siteId: randomNumber, selectedAddress: this.selected} });
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
