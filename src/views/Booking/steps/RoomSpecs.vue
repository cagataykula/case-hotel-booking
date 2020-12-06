<template>
	<div
		class="col-md-12 d-flex justify-content-center flex-column align-items-center"
	>
		<h1>Room Specs</h1>
		<ValidationObserver ref="form">
			<div class="form-row-left mt-5">
				<ValidationProvider
					vid="roomType"
					name="Room type"
					rules="required"
					slim
				>
					<div class="form-row align-items-left">
						Room type:
						<div class="form-group ml-2">
							<div class="form-check form-check-inline">
								<input
									v-model="room.type"
									class="form-check-input"
									type="radio"
									name="roomType"
									id="Standart"
									value="Standart"
								/>
								<label class="form-check-label" for="Standart">Standart</label>
							</div>
							<div class="form-check form-check-inline">
								<input
									v-model="room.type"
									class="form-check-input"
									type="radio"
									name="roomType"
									id="Deluxe"
									value="Deluxe"
								/>
								<label class="form-check-label" for="Deluxe">Deluxe</label>
							</div>
							<div class="form-check form-check-inline">
								<input
									v-model="room.type"
									class="form-check-input"
									type="radio"
									name="roomType"
									id="Suit"
									value="Suit"
								/>
								<label class="form-check-label" for="Suit">Suit</label>
							</div>
						</div>
					</div>
				</ValidationProvider>

				<ValidationProvider
					vid="roomView"
					name="Room View"
					rules="required"
					slim
				>
					<div class="form-row align-items-left">
						Room view:
						<div class="form-group ml-2">
							<div class="form-check form-check-inline">
								<input
									v-model="room.view"
									class="form-check-input"
									type="radio"
									name="roomView"
									id="Sea"
									value="Sea"
								/>
								<label class="form-check-label" for="Sea">Sea</label>
							</div>
							<div class="form-check form-check-inline">
								<input
									v-model="room.view"
									class="form-check-input"
									type="radio"
									name="roomView"
									id="Land"
									value="Land"
								/>
								<label class="form-check-label" for="land">Land</label>
							</div>
						</div>
					</div>
				</ValidationProvider>
			</div>
		</ValidationObserver>
		<div class="row mt-2">
			<div class="row">
				<button
					type="button"
					class="btn btn-primary mr-3 ml-3"
					@click="backStep"
				>
					&lt; Dates
				</button>
				<button type="button" class="btn btn-primary mr-3 ml-3" @click="submit">
					Payment &gt;
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
	components: {},
	data() {
		return {
			room: {
				type: null,
				view: null
			}
		}
	},
	created() {
		const { type, view } = this.$store.getters.getRoomSpecs
		this.room = { type, view }
	},
	methods: {
		backStep() {
			this.$emit('back-step')
		},
		submit() {
			this.$refs.form.validate().then((valid) => {
				if (valid) return this.$emit('next-step')
				else {
					console.log(typeof this.$refs.form.errors)
					let errorMessage = ''
					Object.keys(this.$refs.form.errors).forEach((key) => {
						this.$refs.form.errors[key].forEach((error) => {
							errorMessage += error + '<br>'
						})
					})
					Swal.fire({
						title: 'Error',
						html: errorMessage,
						icon: 'error',
						confirmButtonText: 'OK'
					})
				}
			})
		}
	},
	watch: {
		room: {
			handler: function() {
				this.$store.dispatch('saveRoomSpecs', this.room)
			},
			deep: true
		}
	}
}
</script>
