<template>
    <div>
      <a class="govuk-link" href="#hide" v-if="isShown || active" v-on:click="isShown=false">Hide</a>
      <a class="govuk-link" href="#show" v-if="!isShown && !active" v-on:click="isShown=true">Show</a>
      <div v-if="isShown || active" v-html="content"></div>
    </div>
</template>

<script>
export default {
  name: 'ShowHide',
  props: {
    content: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      isShown: false
    }
  }
}
</script>