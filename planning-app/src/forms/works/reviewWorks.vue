<template>
	<div>
    <h4>Previous answers</h4>
    <ul>
      <li v-if="workStarted"><strong>{{workStarted.question}}</strong> {{workStarted.answer}}</li>
      <li v-if="multipleOccupation"><strong>{{multipleOccupation.question}}</strong> {{multipleOccupation.answer}}</li>
      <li v-if="proposal"><strong>{{proposal.question}}</strong>
        <ul><li v-bind:key="n" v-for="n in proposal.answers.proposal">{{ n }}</li></ul>
      </li>
      <!-- <li v-if="aboutProposal"><strong>{{aboutProposal.question}}</strong>
        <ul><li v-bind:key="n" v-for="n in aboutProposal.answers.proposal">{{ n }}</li></ul>
      </li> -->
      
    </ul>
	</div>
</template>

<script>
export default {
	name: 'reviewWorks',
	computed: {
		workStarted () {
      let workStarted = {};

      if (this.$store.state.workStarted && 
      this.$store.state.workStarted.answers && 
      this.$store.state.workStarted.answers.question && 
      this.$store.state.workStarted.answers.answerLabel) {
        workStarted.question = this.$store.state.workStarted.answers.question;
        workStarted.answer = this.$store.state.workStarted.answers.answerLabel;
			}
		
			return workStarted;
    },
    multipleOccupation () {
      let multipleOccupation = {};

      if (this.$store.state.multipleOccupation && 
      this.$store.state.multipleOccupation.answers && 
      this.$store.state.multipleOccupation.answers.question && 
      this.$store.state.multipleOccupation.answers.answerLabel) {
        multipleOccupation.question = this.$store.state.multipleOccupation.answers.question;
        multipleOccupation.answer = this.$store.state.multipleOccupation.answers.answerLabel;
			}
		
			return multipleOccupation;
    },
    proposal () {
      let proposal = {};

      if (this.$store.state.proposal && 
      this.$store.state.proposal.answers && 
      this.$store.state.proposal.question) {
        proposal.question = this.$store.state.proposal.question;
        proposal.answers = this.$store.state.proposal.answers;
			}
		
			return proposal;
    }
    // aboutProposal () {
    //   let aboutProposal = {};

    //   if (this.$store.state.aboutProposal && 
    //   this.$store.state.aboutProposal.answers && 
    //   this.$store.state.aboutProposal.question) {
    //     aboutProposal.question = this.$store.state.aboutProposal.question;
    //     aboutProposal.answers = this.$store.state.aboutProposal.answers;
		// 	}
		
		// 	return aboutProposal;
		// }
	}
}
</script>

