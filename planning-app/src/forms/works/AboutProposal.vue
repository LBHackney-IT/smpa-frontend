<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            About the extension, improvement or alteration
          </h1>
        </legend>
        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="carcasses">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              Extension
            </label>
            <span>Rear / side / front extension; adding a new floor; basement; porche, bay windows.</span>
          </div>

          <div class="govuk-inset-text">
            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Rear extension
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Side extension
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Front extension
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Addition of a new floor
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Basement
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Outbuilding
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Porche
              </label>
            </div>
          </div>


          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="mines">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              Alterations and / or additions to the roof
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-3" name="proposal" type="checkbox" value="farm">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-3">
              Gates, fences, walls, etc
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="farm">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              Chimneys, flues, etc
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
              Hard surfaces
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-6" name="proposal" type="checkbox" value="farm">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-6">
              Means of access to a highway
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-6" name="proposal" type="checkbox" value="farm">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-6">
              Repair or replace of windows and / or doors
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-6" name="proposal" type="checkbox" value="farm">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-6">
              Exterior painting
            </label>
          </div>
        </div>
      </fieldset>
    </div>
		<v-cta name="Next" :onClick="consoleClick"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';

export default {
	name: 'AboutProposal',
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