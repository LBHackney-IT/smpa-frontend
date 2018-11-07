<template>
    <div class="steps govuk-body">
			<div v-for="(step, index) in steps" v-bind:key="step" class="steps__single-step">
				<div class="steps__step-guide">
					<div class="steps__step-number" v-bind:class="[currentRoute === step.name ? 'steps--current-step' : '']">
						{{index + 1}}
					</div>
					<div class="steps__line-guide" v-bind:class="[currentRoute === step.name ? 'steps--current-step' : '']"></div>
					<div v-if="index == steps.length - 1" class="steps__line-end"></div>
				</div>
				
				<div class="steps__step-info">
					<h4>{{step.title}}</h4>
					<ShowHide v-bind:content="step.content"/>
				</div>
			</div>
    </div>
</template>

<script>
	import ShowHide from '../components/ShowHide.vue';
	
	export default {
		name: 'Steps',
		props: ['steps'],
		components: {
      ShowHide
		},
		computed: {
      currentRoute () {
        return this.$route.name;
      }
    }
	}
</script>