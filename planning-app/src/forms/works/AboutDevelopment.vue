<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            About the development
          </h1>
        </legend>

        <h4 class="govuk-heading-s">
					The floor area is:
				</h4>

        <warning-message :message="floorAreaMessage" v-bind:typeAlert="false"></warning-message>

        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Floor area added
          </label>
          <span class="govuk-hint">
            Enter floor area added in sq.m
          </span>
          <input class="govuk-input govuk-!-width-one-quarter" id="name" name="name" type="number" v-model="floorArea">
        </div>

        <h4 class="govuk-heading-s">
					The number of bedrooms added is:
				</h4>

        <warning-message :message="numberBedroomsMessage" v-bind:typeAlert="false"></warning-message>

        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Number of bedrooms added
          </label>
          <span class="govuk-hint">
            Enter 0 if no bedrooms are added
          </span>
          <input class="govuk-input govuk-!-width-one-quarter" id="name" name="name" type="number" v-model="numberOfBedrooms">
        </div>

        <h4 class="govuk-heading-s">
					The number of new additional storeys added is:
				</h4>
        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Number of new storeys added
          </label>
          <span class="govuk-hint">
            Enter 0 if no new storeys are added
          </span>
          <input class="govuk-input govuk-!-width-one-quarter" id="name" name="name" type="number" v-model="numberOfStoreys">
        </div>
      </fieldset>
    </div>
    <free-description></free-description>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
    <!-- <review-works></review-works> -->
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import FreeDescription from '../../components/FreeDescription.vue';

export default {
	name: 'AboutDevelopment',
	components: {
    vCta,
    FreeDescription
  },
  data () {
    return {
      floorAreaMessage: 'Floor area is measured as GIA (gross internal area). Broadly speaking the whole enclosed area of a building within the external walls taking each floor into account and excluding the thickness of the external walls.',
      numberBedroomsMessage: 'A single bedroom must have a floor area of at least 7.5 sqm and be at least 2.15m wide. A double (or twin) bedroom must have a floor area of at least 11.5 sqm.',
      floorArea: undefined,
      numberOfBedrooms: undefined,
      numberOfStoreys: undefined
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'Trees' });
    }
  }
}
</script>