<template>
	<div>
    <h1 class="govuk-heading-xl">
      Description of the works
    </h1>

    <p>Based on your answers, you are applying for the following works:</p>
	
    <div class="govuk-inset-text">
      <ul>
        <li v-for="(item, index) in this.proposal" v-bind:key="index">{{item.proposalName}}</li>
      </ul>
    </div>
		<v-cta name="Continue" :onClick="navigate"></v-cta>
	</div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';


export default {
	name: 'DescriptionOfTheWorks',
	components: {
    vCta
  },
  data () {
    return {
      selectedProposal: []
    }
  },
	methods: {
    navigate() {
      router.push({ name: 'WorksFloorArea' });
    }
  },
  computed: {
		proposal () {
      if (this.$store.state) {
        return this.$store.state.state.proposalFlow;
      }
		}
	}
}
</script>