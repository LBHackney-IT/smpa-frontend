<template>
	<div class="govuk-grid-row">
		<div class="govuk-grid-column-two-thirds">
      <a @click="$router.go(-1)" class="govuk-back-link">Back</a>
			<router-view></router-view>
		</div>
		<div class="govuk-grid-column-one-third">
		</div>
	</div>
</template>

<script>
  import HelpLink from '../components/HelpLink.vue';

  export default {
    name: 'AccountsActions',
    components: {
      HelpLink
    }
  }
</script>
