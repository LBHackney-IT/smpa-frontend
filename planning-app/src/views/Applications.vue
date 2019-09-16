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
  export default {
    name: 'Applications',
    created() {
      // Not the ideal fix, more info on this in the project's README
      if (window.localStorage.getItem('signInRefresh')) {
        window.localStorage.removeItem('signInRefresh');
        window.location.reload();
      }
    }
  }
</script>
