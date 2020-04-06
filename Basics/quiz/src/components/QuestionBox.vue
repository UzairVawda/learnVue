<template>
	<div>
		<b-jumbotron>
			<template v-slot:lead>
				{{ currentQuestion.question }}
			</template>

			<hr class="my-4">
			
			<b-list-group>
				<b-list-group-item
					v-for="(answer, index) in answers" 
					@click="selectAnswer(index)"
					:key="index" 
					:class="answerClass(index)">
				{{ answer }}
				</b-list-group-item>
			</b-list-group>
			
			<br>

			<b-button
				variant="primary"
				@click="submitAnswer"
				:disabled="selectedIndex === null || answered"
			>Submit </b-button>
			
			<b-button 
				variant="success"
				@click="next"
			>Next</b-button>

		</b-jumbotron>
	</div>
</template>

<script>
export default {
	props: {
		currentQuestion: Object,
		next: Function,
		increment: Function
	}, 
	data() {
		return {
			selectedIndex: null,
			correctIndex: null,
			shuffledAnswers: [],
			answered: false
		}
	},
	computed: {
		answers() {
			let answers = [...this.currentQuestion.incorrect_answers]
			answers.push(this.currentQuestion.correct_answer)
			return answers
		}
	},
	watch: {
		currentQuestion: {
			immediate: true,
			handler() {
				this.selectedIndex = null
				this.answered = false
				this.shuffle();
			}
		}
	},
	methods: {
		shuffle: function() {
			let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
			for (let i = answers.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[answers[i], answers[j]] = [answers[j], answers[i]];
			}
			this.shuffledAnswers = answers
			this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
		},
		selectAnswer: function(index) {
			this.selectedIndex = index
		},
		submitAnswer: function() {
			let isCorrect = false;
			if (this.selectedIndex === this.correctIndex) {
				isCorrect = true
			}
			this.answered = true
			this.increment(isCorrect);
		}, 
		answerClass: function(index) {
			let answerClass = ''
			
			if (!this.answered && this.selectedIndex === index) { answerClass = 'selected' }  
			else if (this.answered && this.correctIndex === index) { answerClass =  'correct' }
			else if (this.answered && this.selectedIndex === index && this.correctIndex !== index) { 
				answerClass = 'incorrect' }
			
			return answerClass
		}
	}
}
</script>

<style scoped>

.list-group-item:hover {
	background-color: #EEE;
	cursor: pointer;
}

.selected {
	background-color: lightblue;
}

.correct {
	background-color: lightgreen;
}

.incorrect {
	background-color: red;
}

</style>