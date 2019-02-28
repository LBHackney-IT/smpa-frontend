<template>
	<div>
    <h1 class="govuk-heading-xl">
      About the extension or alteration to any other building
    </h1>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h2 class="govuk-heading-m">
            Does the work include the removal or demolition of any existing outbuilding?
          </h2>
        
        </legend>
        <div class="govuk-radios govuk-radios--inline">
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-existing-outbuilding-1" name="work-existing-outbuilding" type="radio" value="Yes" v-model="workStarted">
						<label class="govuk-label govuk-radios__label" for="work-existing-outbuilding-1">
							Yes
						</label>
					</div>
					<div class="govuk-radios__item">
						<input class="govuk-radios__input" id="work-existing-outbuilding-2" name="work-existing-outbuilding" type="radio" value="No" v-model="workStarted">
						<label class="govuk-label govuk-radios__label" for="work-existing-outbuilding-2">
							No
						</label>
					</div>
				</div>
      </fieldset>
      <div class="govuk-form-group">
        <label class="govuk-label" for="more-detail">
          Can you provide more detail?
        </label>
        <span id="more-detail-hint" class="govuk-hint">
          Do not include personal or financial information, like your National Insurance number or credit card details.
        </span>
        <textarea class="govuk-textarea" id="more-detail" name="more-detail" rows="5" aria-describedby="more-detail-hint"></textarea>
      </div>
    </div>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import Navigate from '../../common/navigate';

export default {
	name: 'Outbuilding',
	components: {
    vCta
  },
  created () {
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  data () {
    return {
      selectedProposal: [],
      workStarted: undefined,
      currentWorks: undefined
    }
  },
	methods: {
    fetchData () {
      this.selectedProposal = [];
      this.currentWorks = this.$route.params.currentLevelInfo;
    },
    navigate() {
      var routerParams = Navigate.calculateNavigation(this.$store.state.state.proposalFlow, this.currentWorks, 'Outbuilding');
      router.push(routerParams);
    }
  }
}
</script>