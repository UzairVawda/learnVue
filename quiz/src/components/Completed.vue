<template>
  <div>
	<h3 class="displayScore">Out of {{ numberTotal }} questions, you got {{ numberOfCorrect }} correct.</h3>
	<b-card class="text-center" v-for="(question, index) in questions" :key="index">
		<p>{{ question[index].question }}</p>
	</b-card>
  </div>
</template>

<script>
export default {
	props: [
		'numberOfCorrect', 
		'numberTotal',
		'questions'
    ]
}
</script>

<style scoped>
.displayScore {
	margin-top: 50px;
}
</style>