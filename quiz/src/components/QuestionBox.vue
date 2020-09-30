<template>
	<div class="questionbox-container">
		<b-jumbotron>
			<template v-slot:lead>
				{{ currentQuestion.question }}
			</template>

			<hr class="my-4">
			
			<b-list-group v-for="(answer, index) in shuffledAnswers" v-bind:key="index">
				<b-list-group-item
					@click="selectAnswer(index)"
					v-bind:class="[ selectedAnswer === index ? 'selected' : '' ]"
				>{{ answer }}</b-list-group-item>
			</b-list-group>

			<b-button variant="primary"
				@click="submitAnswer"
				v-bind:disabled="selectedAnswer === null || isNaN(selectedAnswer)"
			>Submit</b-button>

			<b-button variant="success" 
				@click="nextQuestion"
			>Next Question</b-button>
		</b-jumbotron>
	</div>
</template>

<script>
import _ from 'lodash'

export default {
	props: {
		currentQuestion: Object,
		nextQuestion: Function,
		increment: Function 
	},
	data() {
		return {
			selectedAnswer: null,
			shuffledAnswers: [],
			correctIndex: 0,
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
			handler(){
				this.selectedAnswer = null
				this.shuffleAnswers()
			}
		}
	},
	methods: {
		selectAnswer(index) {
			this.selectedAnswer = index
		},
		submitAnswer() {
			var isCorrect = false
			if (this.selectedAnswer === this.correctIndex) {
				isCorrect = true
			}

			this.increment(isCorrect)
			this.answered = true
		},
		shuffleAnswers() {
			console.log(isNaN(this.selectedAnswer))
			let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
			this.shuffledAnswers = _.shuffle(answers)
			this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
		}
	}
}
</script>

<style scoped>
.list-group {
	margin-bottom: 15px;
}
.list-group:hover {
	background-color: #eee;
	cursor: pointer;
}
.btn {
	margin: 0px 5px 0px 5px; 
}

.selected {
	background-color: lightblue;
}

.correct {
	background-color: lightgreen;
}
.incorrect {
	background-color: lightcoral;
}
</style>