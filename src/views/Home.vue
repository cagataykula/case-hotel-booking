<template>
	<div class="col-md-12">
		<div class="col-md-12">
			<HelloAnimation />
		</div>
		<div class="d-flex justify-content-center flex-column">
			<h1>Hello</h1>
			<p class="text-center">
				You can click the button below and you can see the booking page.
			</p>
		</div>
		<div class="col-sm-12">
			<button class="btn btn-primary" @click="$router.push('/booking')">
				Booking
			</button>
		</div>
		<div class="col-sm-12 mt-5">
      <Contact />
		</div>
	</div>
</template>

<script>
import HelloAnimation from '../components/HelloAnimation.vue'
import Contact from '../components/Contact.vue'
export default {
	name: 'Home',
	components: {
    HelloAnimation,
    Contact
	}
}
</script>
