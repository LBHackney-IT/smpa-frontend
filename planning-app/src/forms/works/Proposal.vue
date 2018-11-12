<template>
	<div>
		<div class="govuk-form-group">
      <fieldset class="govuk-fieldset" aria-describedby="proposal-hint">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--xl">
          <h1 class="govuk-fieldset__heading">
            What is your proposal?
          </h1>
        </legend>
        <span id="proposal-hint" class="govuk-hint">
          Select all that apply.
        </span>

        <!-- <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator> -->


        <div class="govuk-checkboxes">
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-1" name="proposal" type="checkbox" value="carcasses">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-1">
              Enlargement, improvement or alteration
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-2" name="proposal" type="checkbox" value="mines">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-2">
              New build
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-3" name="proposal" type="checkbox" value="farm">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-3">
              Change or confirmation of use
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-4" name="proposal" type="checkbox" value="farm">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-4">
              Demolition
            </label>
          </div>
          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
              Trees work
            </label>
          </div>

          <div class="govuk-checkboxes__item">
            <input class="govuk-checkboxes__input" id="proposal-6" name="proposal" type="checkbox" value="farm">
            <label class="govuk-label govuk-checkboxes__label" for="proposal-6">
              Equipment
            </label>
          </div>

          <div class="govuk-inset-text">
            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                CCTV
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Satellite dish
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Solar panel
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Security alarm
              </label>
            </div>

            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="proposal-5" name="proposal" type="checkbox" value="farm">
              <label class="govuk-label govuk-checkboxes__label" for="proposal-5">
                Tank
              </label>
            </div>

          </div>
        </div>
      </fieldset>
    </div>
		<v-cta name="Next" :onClick="consoleClick"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import VueFormGenerator from "vue-form-generator";

export default {
	name: 'Proposal',
	components: {
    vCta,
    "vue-form-generator": VueFormGenerator.component
  },
  data () {
    return {
      model: {
        id: 1,
        name: "John Doe",
        password: "J0hnD03!x4",
        age: 35,
        skills: ["Javascript", "VueJS"],
        email: "john.doe@gmail.com",
        status: true
      },
      schema: {
        groups: [{
          fields: [{
            type: "input",
            inputType: "text",
            label: "Name",
            model: "name",
            readonly: false,
            featured: true,
            required: true,
            disabled: false,
            placeholder: "User's name",
            labelClasses: "govuk-label",
            styleClasses: "govuk-form-group",
            validator: VueFormGenerator.validators.string
          }, {
            type: "input",
            inputType: "password",
            label: "Password",
            model: "password",
            min: 6,
            required: true,
            hint: "Minimum 6 characters",
            validator: VueFormGenerator.validators.string
          }],
        }]
      },

      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      }
    }
  },
	methods: {
    consoleClick() {
      console.log('Button clicked');
    }
  }
}
</script>