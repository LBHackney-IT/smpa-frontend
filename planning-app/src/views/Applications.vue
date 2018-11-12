<template>
	<div class="govuk-grid-row">
		<div class="govuk-grid-column-two-thirds">
			<router-view></router-view>
		</div>
		<div class="govuk-grid-column-one-third">
			<Steps v-bind:steps="steps" />
		</div>
	</div>
</template>

<script>
  import HelpLink from '../components/HelpLink.vue';
  import Steps from '../components/Steps.vue';

  const steps = [{
    title: "Site details",
    name: "SiteDetails",
    content: '<p>Enter your site address</p>',
    isActive: false
  },
  {
    title: "Description of the works",
    name: "FormWorkDescription",
    content: '<p>Describe your proposal.</p><ul><li>Development</li><li>Materials</li><li>Surroundings</li></ul>',
    isActive: false
  },
  {
    title: "Supporting documentation",
    name: "FormDocumentation",
    content: '<p>Hello Step 2!!</p>',
    isActive: false
  },
  {
    title: "Declarations", 
    name: "FormDeclarations",
    content: '<p>Hello Step 2!!</p>',
    isActive: false
  },
  {
    title: "Contact details",
    name: "FormContact",
    content: '<p>Hello Step 2!!</p>',
    isActive: false
  },
  {
    title: "Pay and submit",
    name: "FormPaySubmit",
    content: '<p>Hello Step 2!!</p>',
    isActive: false
  }];

  export default {
    name: 'Applications',
    components: {
      HelpLink,
      Steps
    },
    data() {
      return { steps };
    },
    mounted() {
      
    }
  }
</script>
