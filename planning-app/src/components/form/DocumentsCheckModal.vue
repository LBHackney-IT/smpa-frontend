<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-if="stepOne">

          <div class="modal-header">
            <slot name="header">
              <h2 class="govuk-heading-l">This file includes:</h2>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <span id="modal-hint" class="govuk-hint">
                Select all that apply
              </span>
            </slot>

            <div class="govuk-grid-row">
              <div class="govuk-grid-column-one-half">
                <div class="govuk-checkboxes">
                  <div class="govuk-checkboxes__item">
                    <input class="govuk-checkboxes__input" id="file-includes-1" name="file-includes-1" type="checkbox" value="block-plan" v-model="fileIncludes" >
                    <label class="govuk-label govuk-checkboxes__label" for="file-includes-1">
                      Block plan
                    </label>
                  </div>

                  <div class="govuk-checkboxes__item">
                    <input class="govuk-checkboxes__input" id="file-includes-2" name="file-includes-2" type="checkbox" value="existing-elevations" v-model="fileIncludes" >
                    <label class="govuk-label govuk-checkboxes__label" for="file-includes-2">
                      Existing elevations
                    </label>
                  </div>

                  <div class="govuk-checkboxes__item">
                    <input class="govuk-checkboxes__input" id="file-includes-3" name="file-includes-3" type="checkbox" value="existing-floor-plans" v-model="fileIncludes" >
                    <label class="govuk-label govuk-checkboxes__label" for="file-includes-3">
                      Existing floor plans
                    </label>
                  </div>

                  <div class="govuk-checkboxes__item">
                    <input class="govuk-checkboxes__input" id="file-includes-4" name="file-includes-4" type="checkbox" value="existing-sections" v-model="fileIncludes" >
                    <label class="govuk-label govuk-checkboxes__label" for="file-includes-4">
                      Existing sections
                    </label>
                  </div>

                  <div class="govuk-checkboxes__item">
                    <input class="govuk-checkboxes__input" id="file-includes-5" name="file-includes-5" type="checkbox" value="other" v-model="fileIncludes" >
                    <label class="govuk-label govuk-checkboxes__label" for="file-includes-5">
                      Other (photos, etc)
                    </label>
                  </div>
                </div>
              </div>
              <div class="govuk-grid-column-one-half">
                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="file-includes-6" name="file-includes-6" type="checkbox" value="site-layout-plan" v-model="fileIncludes" >
                  <label class="govuk-label govuk-checkboxes__label" for="file-includes-6">
                    Site layout plan
                  </label>
                </div>

                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="file-includes-7" name="file-includes-7" type="checkbox" value="proposed-elevations" v-model="fileIncludes" >
                  <label class="govuk-label govuk-checkboxes__label" for="file-includes-7">
                    Proposed elevations
                  </label>
                </div>

                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="file-includes-8" name="file-includes-8" type="checkbox" value="proposed-floor-plans" v-model="fileIncludes" >
                  <label class="govuk-label govuk-checkboxes__label" for="file-includes-8">
                    Proposed floor plans
                  </label>
                </div>

                <div class="govuk-checkboxes__item">
                  <input class="govuk-checkboxes__input" id="file-includes-9" name="file-includes-9" type="checkbox" value="proposed-sections" v-model="fileIncludes" >
                  <label class="govuk-label govuk-checkboxes__label" for="file-includes-9">
                    Proposed sections
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="govuk-button" @click="goToStepTwo()">
                Next
              </button>
            </slot>
          </div>
        </div>

        <div class="modal-container" v-if="stepTwo">

          <div class="modal-header">
            <slot name="header">
              <h2 class="govuk-heading-l">This file includes:</h2>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <span id="modal-hint" class="govuk-hint">
                Select all.
              </span>
            </slot>

            <div class="govuk-checkboxes">
              <div class="govuk-checkboxes__item">
                <input class="govuk-checkboxes__input" id="file-conditions-1" name="file-conditions-1" type="checkbox" value="file-conditions-1" v-model="fileConditions" >
                <label class="govuk-label govuk-checkboxes__label" for="file-conditions-1">
                  Have a scale of 1:50 or 1:100
                </label>
              </div>

              <div class="govuk-checkboxes__item">
                <input class="govuk-checkboxes__input" id="file-conditions-2" name="file-conditions-2" type="checkbox" value="file-conditions-2" v-model="fileConditions" >
                <label class="govuk-label govuk-checkboxes__label" for="file-conditions-2">
                  Have a visual scale bar showing 1m and 10m
                </label>
              </div>

              <div class="govuk-checkboxes__item">
                <input class="govuk-checkboxes__input" id="file-conditions-3" name="file-conditions-3" type="checkbox" value="file-conditions-3" v-model="fileConditions" >
                <label class="govuk-label govuk-checkboxes__label" for="file-conditions-3">
                  Show the direction of North
                </label>
              </div>

              <div class="govuk-checkboxes__item">
                <input class="govuk-checkboxes__input" id="file-conditions-4" name="file-conditions-4" type="checkbox" value="file-conditions-4" v-model="fileConditions" >
                <label class="govuk-label govuk-checkboxes__label" for="file-conditions-4">
                  Display key dimensions of the proposal
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="footer">

              <div class="govuk-form-group">
                <label class="govuk-label" for="file-upload-1">
                  Upload a file
                </label>
                <input class="govuk-file-upload" id="file-upload-1" name="file-upload-1" type="file" :disabled="fileConditions.length < 4" @change="$emit('close')">
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DocumentsCheckModal',
  data () {
    return {
      stepOne: true,
      stepTwo: false,
      fileIncludes: [],
      fileConditions: []

    }
  },
  methods: {
    goToStepTwo() {
      this.stepOne = false;
      this.stepTwo = true;
    },
    uploadFile() {

    }
  }
}
</script>