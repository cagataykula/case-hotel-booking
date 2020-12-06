<template>
	<lottie :options="{ animationData }" :width="280" />
</template>

<script>
import Lottie from 'vue-lottie'
import animationData from '../assets/hello-animation.json'

export default {
	name: 'app',
	components: {
		lottie: Lottie
	},
	data() {
		return {
			animationData
		}
	}
}
</script>
