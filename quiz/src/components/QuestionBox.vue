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
					v-bind:class="answerClass(index)"
				>{{ answer }}</b-list-group-item>
			</b-list-group>

			<b-button variant="primary"
				@click="submitAnswer"
				:disabled="selectedAnswer == null || answered"
			>Submit</b-button>

			<b-button variant="success" 
				@click="nextQuestion"
				:disabled="answered == false"
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
			answered: false,
			selectedBoolean: false
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
				this.answered = false
				this.shuffleAnswers()
			}
		}
	},
	methods: {
		selectAnswer(index) {
			this.selectedAnswer = index
			this.selectedBoolean = true
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
			let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
			this.shuffledAnswers = _.shuffle(answers)
			this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
		},
		answerClass(index) {
			let answerClass = ''
			if (!this.answered && this.selectedAnswer === index) {
				answerClass = 'selected'
			} else if (this.answered && this.correctIndex === index) {
				answerClass = 'correct'
			} else if (this.answered && this.selectedAnswer === index && this.correctIndex) {
				answerClass = 'incorrect'
			}
			return answerClass	
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