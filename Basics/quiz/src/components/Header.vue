<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="dark">
			<b-navbar-brand>Quiz App</b-navbar-brand>
			<b-navbar-nav>
				<b-nav-text>Score: {{ numberOfCorrect }}/{{ totalNumber }}</b-nav-text>
			</b-navbar-nav>
		</b-navbar>
	</div>
</template>

<script>
export default {
	props: [
		'numberOfCorrect',
		'totalNumber',
	]
}
</script>