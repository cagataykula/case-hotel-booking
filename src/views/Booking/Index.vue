<template>
	<div class="row pt-3 pb-3">
		<div class="col-md-3">
			<div class="col-md-12 stepsWrapper sticky-top m-0 p-0">
				<div class="steps">
					<div
						v-for="(step, i) in steps"
						:key="step.order + step.name"
						class="bg-secondary rounded p-2 mt-2"
						:style="{
							'background-color': activeIndex >= i ? '#007bff !important' : null
						}"
						:class="{
							'bg-primary': step.active,
							'not-allowed': !step.seen && !step.active,
							pointer: step.seen || step.active
						}"
						@click="!finished && step.seen && tabClick(step, i)"
					>
						<span class="text-white d-inline">
							{{ `${step.order}. ${step.name}` }}
						</span>
						<div v-if="step.completed" class="text-white d-inline">
							<svg
								width="1em"
								height="1em"
								viewBox="0 0 16 16"
								class="bi bi-check"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill-rule="evenodd"
									d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
								/>
							</svg>
						</div>
					</div>
					<div class="col col-md-12 p-0 mt-3">
						<div class="progress">
							<div
								class="progress-bar"
								role="progressbar"
								:aria-valuenow="progress"
								aria-valuemin="0"
								aria-valuemax="100"
								:style="{ width: `${progress}%` }"
							>
								<strong>{{ progress }}%</strong>
							</div>
						</div>
					</div>
					<div class="informationWrapper row mt-4">
						<div class="info col col-md-12">
							<transition-group name="slide-fade">
								<h4
									key="dates"
									class="title"
									v-if="
										getDates.formatted.checkInDate ||
											getDates.formatted.checkOutDate
									"
								>
									Dates
								</h4>
								<div
									class="infoContent"
									v-if="getDates.formatted.checkInDate"
									key="checkInDate"
								>
									<strong class="infoSubTitle">Check-in</strong>
									<span class="infoValue">
										{{ getDates.formatted.checkInDate }}
									</span>
								</div>
								<div
									class="infoContent"
									v-if="getDates.formatted.checkOutDate"
									key="checkOutDate"
								>
									<strong class="infoSubTitle">Check-out</strong>
									<span class="infoValue">
										{{ getDates.formatted.checkOutDate }}
									</span>
								</div>
							</transition-group>
						</div>
						<div class="info col col-md-12">
							<transition-group name="slide-fade">
								<h4
									class="title"
									v-if="getRoomSpecs.type || getRoomSpecs.view"
									key="title"
								>
									Room
								</h4>
								<div
									class="infoContent"
									v-if="getRoomSpecs.type"
									key="roomType"
								>
									<strong class="infoSubTitle">Room type</strong>
									<span class="infoValue">
										{{ getRoomSpecs.type }}
									</span>
								</div>
								<div
									class="infoContent"
									v-if="getRoomSpecs.view"
									key="roomView"
								>
									<strong class="infoSubTitle">Room view</strong>
									<span class="infoValue">
										{{ getRoomSpecs.view }}
									</span>
								</div>
							</transition-group>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-9">
			<div class="col-md-12 childPageWrapper">
				<router-view
					@next-step="nextStep"
					@back-step="backStep"
					@finish-steps="finishSteps"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'

export default {
	components: {},
	data() {
		return {
			steps: [
				{
					order: '1',
					name: 'Dates',
					active: true,
					completed: false,
					route: '/booking/dates',
					seen: true
				},
				{
					order: '2',
					name: 'Room Specs',
					active: false,
					completed: false,
					route: '/booking/room-specs',
					seen: false
				},
				{
					order: 3,
					name: 'Payment',
					active: false,
					completed: false,
					route: '/booking/payment',
					seen: false
				}
			],
			activeIndex: 0,
			finished: false
		}
	},
	computed: {
		...mapGetters(['getDates', 'getRoomSpecs']),
		progress() {
			const passed = this.steps.filter((e) => e.completed)
			const progress = Math.round((100 / this.steps.length) * passed.length)
			return progress
		}
	},
	methods: {
		tabClick(step, i) {
			if (step.route != this.$route.path) {
				this.activeIndex = i
				this.$router.push(step.route)
			}
		},
		nextStep() {
			this.steps[this.activeIndex].completed = true
			this.activeIndex += 1
			this.steps[this.activeIndex].active = true
			this.$router.push(this.steps[this.activeIndex].route)
		},
		backStep() {
			this.steps[this.activeIndex].active = false
			this.activeIndex -= 1
			this.$router.push(this.steps[this.activeIndex].route)
		},
		finishSteps() {
			this.steps[this.activeIndex].completed = true
			this.finished = true
			const swalMixin = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-primary m-2',
					cancelButton: 'btn btn-danger m-2'
				},
				buttonsStyling: false
			})

			swalMixin
				.fire({
					title: 'You Finished Steps.',
					html:
						'You can see the post data from the developer console.<br><br>Do you want me to delete your all data?',
					icon: 'success',
					showCancelButton: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No',
					reverseButtons: true
				})
				.then((result) => {
					if (result.isConfirmed) {
						this.$store.dispatch('clearBookingData').then(() => {
							Swal.fire('Deleted!', 'localStorage cleaned.', 'success').then(
								() => {
									this.redirectHomePageModal()
								}
							)
						})
					}
					this.redirectHomePageModal()
				})
		},
		redirectHomePageModal() {
			const swalMixin = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-primary m-2',
					cancelButton: 'btn btn-danger m-2'
				},
				buttonsStyling: false
			})
			swalMixin
				.fire({
					text: 'Do you want me to redirect you to the homepage?',
					icon: 'success',
					showCancelButton: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No',
					reverseButtons: true
				})
				.then((result) => {
					if (result.isConfirmed) {
						this.$router.push('/')
					} else {
						this.$router.push('/booking')
					}
				})
		}
	},
	watch: {
		$route: {
			handler(to, from) {
				if (!from && to.path != this.steps[0].route )
					return this.$router.replace(this.steps[0].route)
				this.steps.forEach((step, index) => {
					if (step.route == to.path) {
						this.activeIndex = index
						step.active = true
					} else {
						step.active = false
					}
				})
			},
			immediate: true
		},
		activeIndex(i) {
			this.steps[i].seen = true
		}
	}
}
</script>

<style lang="scss" scoped>
.stepsWrapper {
	top: 30px;
}

.pointer {
	cursor: pointer;
}

.not-allowed {
	cursor: not-allowed;
}

.info {
	.title {
		text-align: left;
		margin-top: 10px;
	}
	.infoContent {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		.infoSubTitle {
		}
		.infoValue {
		}
	}
}

.childPageWrapper {
	@media (max-width: 767.8px) {
		margin-top: 70px;
	}
}

.slide-fade-enter-active {
	transition: all 0.3s ease;
}
.slide-fade-leave-active {
	transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
	transform: translateY(10px);
	opacity: 0;
}
</style>
