<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the floor area
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
          <p>Additional floor area should be measured according to the definition of Gross internal area (GIA). Broadly speaking this includes the whole enclosed area of a building within the external walls taking each floor into account.</p>
          <details class="govuk-details">
            <summary class="govuk-details__summary">
              <span class="govuk-details__summary-text">
                What to include and not include
              </span>
            </summary>
            <div class="govuk-details__text">
              Include:<br>
              <ul>
                <li>areas occupied by internal walls (whether structural or not) and partitions</li>
                <li>service accommodation such as WCs, showers and changing rooms</li>
                <li>columns, pillars (whether free standing or projecting inwards from an external wall), chimney breasts, lift wells and stairwells</li>
                <li>lift rooms, plant rooms, tank rooms and fuel stores (whether or not above roof level)</li>
                <li>open-sided covered areas</li>
              </ul>

              Don't include:
              <ul>
                <li>open balconies</li>
                <li>open fire escapes</li>
                <li>open-sided covered ways</li>
                <li>open vehicle parking areas and terraces</li>
                <li>minor canopies</li>
                <li>any area with ceiling height of less than 1.5m (except under stairways)</li>
                <li>any area under the control of service or other external authorities</li>
              </ul>
            </div>
          </details>
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label govuk-!-width-one-third" for="one-quarter">
            Additional floor area
          </label>
          <input class="govuk-input govuk-!-width-one-quarter" id="one-quarter" name="one-quarter" type="number" v-model="floorArea"> 
          
          <select class="govuk-select" id="sort" name="sort" v-model="selectedOption">
            <option v-bind:value="option.id" v-bind:key="option.id" v-for="option in this.defaultOptions">{{option.name}}</option>
          </select>
        </div>
      </fieldset>
    </div>
		<v-cta name="Continue" :onClick="submit"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import FreeDescription from '../../components/FreeDescription.vue';
import { getRouteAppId } from '../../mixins/getRouteAppId';

export default {
  name: 'WorksFloorArea',
  mixins: [ getRouteAppId ],
	components: {
    vCta,
    FreeDescription
  },
  data () {
    return {
      floorArea: undefined,
      selectedOption: '',
      defaultOptions: undefined
    }
  },
  beforeMount () {
    this.loadDefaultOptions();
  },
	methods: {
    navigate() {
      router.push({ name: 'WorksData' });
    },
    loadDefaultOptions() {
      this.$store.dispatch('getDefaultData', 'area-units').then((response) => {
        this.defaultOptions = response.data;
      })
    },
    submit() {
      let payload = {
        "additional_floor_area_units_id": this.selectedOption,
        "additional_floor_area": this.floorArea
      };

      const extensionId = this.$store.getters.getExtensionId(this.applicationId);

      this.$store.dispatch('updateExtensionProposal', { "application_id": this.applicationId, 'selectedProposals': payload, "extension_id": extensionId }).then(() => {
        this.navigate();
      })
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