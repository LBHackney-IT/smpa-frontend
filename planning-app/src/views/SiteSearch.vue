<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Search site</h1>

			<div class="govuk-form-group">
				<label class="govuk-label" for="name">
					Enter postcode
				</label>
				<input class="govuk-input" id="name" name="name" type="text" v-model="postcode">
			</div>
			<v-cta name="Find address" :onClick="navigate"></v-cta>
    </div>
  </div>
</template>

<script>
	import vCta from '../components/Cta.vue';
	import router from '../router';
	export default {
		name: 'SiteSearch',
		components: {
			vCta
		},
		data () {
			return {
				postcode: ''
			}
		},
		methods: {
			navigate() {
				if (this.postcode === 'N16 8ED' || this.postcode === 'E8 3HW') {

					//todo check if site id is still necessary at this point. random number for mocking purposes
					const randomNumber = parseInt((Math.random() * 10000000) + 1);

					router.push({ name: 'SiteDetails', params: { siteId: randomNumber, postcode: this.postcode} });
				}
			}
		}
	}
</script>
