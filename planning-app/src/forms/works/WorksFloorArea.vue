<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the floor area added
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            How much floor area is being added?
          </h2>
        </legend>

        <div class="govuk-inset-text">
          <p class="govuk-body govuk-!-font-weight-bold">Definition</p>
          <p>Gross internal area (GIA) is the area of a building. Broadly speaking it includes the whole enclosed area of a building within the external walls taking each floor into account and excluding the thickness of the external walls. Measurement should be in accordance with the RICS Code of Practice.</p>
          <details class="govuk-details">
            <summary class="govuk-details__summary">
              <span class="govuk-details__summary-text">
                Specifics on what not to be included and what to be included
              </span>
            </summary>
            <div class="govuk-details__text">
              GIA will include:
              <ul>
                <li>areas occupied by internal walls (whether structural or not) and partitions</li>
                <li>service accommodation such as WCs, showers, changing rooms and the like</li>
                <li>columns, piers, whether free standing or projecting inwards from an external wall, chimney breasts, lift wells, stairwells etc</li>
                <li>lift rooms, plant rooms, tank rooms, fuel stores, whether or not above roof level</li>
                <li>open-sided covered areas (should be stated separately)</li>
              </ul>

              GIA will exclude:
              <ul>
                <li>open balconies</li>
                <li>open fire escapes</li>
                <li>open-sided covered ways</li>
                <li>open vehicle parking areas, terraces and the like</li>
                <li>minor canopies</li>
                <li>any area with ceiling height of less than 1.5m (except under stairways)</li>
                <li>any area under the control of service or other external authorities</li>
              </ul>
            </div>
          </details>
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label govuk-!-width-one-third" for="one-quarter">
            Gross Internal Area
          </label>
          <input class="govuk-input govuk-!-width-one-quarter" id="one-quarter" name="one-quarter" type="number">
          <select class="govuk-select" id="sort" name="sort">
            <option value="sqm" selected>sqm</option>
            <option value="sqft">sqft</option>
          </select>
        </div>
      </fieldset>
    </div>
    <free-description></free-description>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import FreeDescription from '../../components/FreeDescription.vue';

export default {
	name: 'WorksFloorArea',
	components: {
    vCta,
    FreeDescription
  },
  data () {
    return {
      selectedProposal: []
    }
  },
  created () {
      this.fetchData();
  },
	methods: {
    navigate() {
      router.push({ name: 'WorksData' });
    }
  },
  computed: {
		isInConservationArea () {
      if (this.$store.state.site && this.$store.state.site.siteConstraints && this.$store.state.site.siteConstraints.conservationArea) {
        return this.$store.state.site.siteConstraints.conservationArea;
      } else {
        return false;
      }
		}
	}
}
</script>