<template>
  <div id="app">
    <Header 
      v-bind:numberOfCorrect="numberOfCorrect"
      v-bind:numberTotal="numberTotal"
    />
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="8" offset="2">    
          <QuestionBox 
          v-if="questions.length"
            v-bind:currentQuestion="questions[index]"
            v-bind:nextQuestion="nextQuestion"
            v-bind:increment="increment"
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
    QuestionBox,
  },
  data() {
    return {
      questions: [],
      index: 0,
      answers: [],
      numberOfCorrect: 0,
      numberTotal: 0
    }
  },
  methods: {
    nextQuestion() {
      this.index++
    },
    increment(isCorrect) {
      if (isCorrect) {
        this.numberOfCorrect++
      }
      this.numberTotal++
    }
  },
  mounted: function() {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple', {
      method: 'get'
    })
    .then(async (response) => {
      return await response.json()
    })
    .then((jsonData) => {
      console.log(jsonData)
      this.questions = jsonData.results
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
