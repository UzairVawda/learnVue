<template>
	<div id="app">
		<Header 
		:numberOfCorrect="numberOfCorrect"
		:totalNumber="totalNumber"
		/>

		<b-container class="bv-example-row">
			<b-row>
				<b-col  cols="12" lg="12" md="12" sm="12">
					<QuestionBox 
						v-if="questions.length"
						:currentQuestion="questions[index]"
						:next="next"
						:increment="increment"
					/>
				</b-col>
			</b-row> 
		</b-container>

	</div>
</template>

<script>
import Header from './components/Header.vue'
import QuestionBox from './components/QuestionBox.vue'

export default {
	name: 'App',
	components: {
		Header, 
		QuestionBox
	}, 
	data() { 
		return {
			questions: [],
			index: 0,
			numberOfCorrect: 0,
			totalNumber: 0, 
		}
	},
	methods: {
		next: function() {
			this.index++
		},
		increment: function(isCorrect) {
			if (isCorrect) {
				this.numberOfCorrect ++
			}
			this.totalNumber++
		}
	},
	mounted: function() {
		fetch('https://opentdb.com/api.php?amount=10&type=multiple', {
			method: 'get'
		})
			.then((response) => {
				return(response.json());
			})
			.then((jsonData) => {
				this.questions = jsonData.results
			})
	}
}
</script>
