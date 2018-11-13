<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            About the development
          </h1>
        </legend>

        <p>The floor area is:</p>

        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Area
          </label>
          <input class="govuk-input" id="name" name="name" type="number">
        </div>

        <div class="govuk-form-group">
          <label class="govuk-label" for="sort">
            Choose
          </label>
          <select class="govuk-select" id="sort" name="sort">
            <option value="published" selected>Choose</option>
            <option value="updated">Recently updated</option>
            <option value="views">Most views</option>
            <option value="comments">Most comments</option>
          </select>
        </div>


        <p>The number of stories proposed is:</p>
        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Number of stories
          </label>
          <input class="govuk-input" id="name" name="name" type="number">
        </div>


        <p>The number of bedrooms gained are:</p>
        <div class="govuk-form-group">
          <label class="govuk-label" for="name">
            Number of bedrooms
          </label>
          <input class="govuk-input" id="name" name="name" type="number">
        </div>

      </fieldset>
    </div>
		<v-cta name="Next" :onClick="consoleClick"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';

export default {
	name: 'AboutDevelopment',
	components: {
    vCta
  },
  data () {
    return {}
  },
	methods: {
    consoleClick() {
      console.log('Button clicked');
    }
  }
}
</script>