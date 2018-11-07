<template>
    <div>
        <a class="govuk-link" href="#hide" v-if="isShown" v-on:click="isShown=false">Hide</a>
        <a class="govuk-link" href="#show" v-if="!isShown" v-on:click="isShown=true">Show</a>
        <div v-if="isShown" v-html="content"></div>
    </div>
</template>

<script>
export default {
  name: 'ShowHide',
  props: ['content'],
  data() {
    return {
      isShown: false
    }
  }
}
</script>