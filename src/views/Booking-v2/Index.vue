<template>
	<div class="row">
		<div class="col-md-12">
			<section class="section">
				<div class="container">
					<div class="columns">
						<div class="column is-8 is-offset-2">
							<horizontal-stepper
								class="stepperComp"
								:steps="demoSteps"
								@completed-step="completeStep"
								@active-step="isStepActive"
								@stepper-finished="alert"
                                :top-buttons="true"
                                :keep-alive="false"
							></horizontal-stepper>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
import HorizontalStepper from 'vue-stepper'

// This components will have the content for each stepper step.
import DateSelection from './steps/DateSelection.vue'
import RoomType from './steps/RoomType.vue'
import Payment from './steps/Payment.vue'

export default {
	components: {
		HorizontalStepper
	},
	data() {
		return {
			demoSteps: [
				{
					icon: 'date_range',
					name: 'dateSelection',
					title: 'Booking Dates',
					subtitle: 'Select your booking dates',
					component: DateSelection,
					completed: false
				},
				{
					icon: 'room',
					name: 'roomType',
					title: 'Room Type',
					subtitle: 'Select your room type',
					component: RoomType,
					completed: false
				},
				{
					icon: 'room',
					name: 'payment',
					title: 'Payment',
					subtitle: 'Please enter your payment information',
					component: Payment,
					completed: false
				}
			]
		}
	},
	methods: {
		// Executed when @completed-step event is triggered
		completeStep(payload) {
			this.demoSteps.forEach((step) => {
				if (step.name === payload.name) {
					step.completed = true
				}
            })
		},
		// Executed when @active-step event is triggered
		isStepActive(payload) {
			this.demoSteps.forEach((step) => {
				if (step.name === payload.name) {
					if (step.completed === true) {
						step.completed = false
					}
				}
			})
		},
		// Executed when @stepper-finished event is triggered
		alert(payload) {
			alert('BOOKING SET', payload.toString())
		}
	}
}
</script>

<style lang="scss" scoped>
.stepper-box /deep/ {
	.content {
		overflow: visible;
	}
}
</style>
