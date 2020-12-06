<template>
	<div
		class="col-md-12 d-flex justify-content-center flex-column align-items-center"
	>
		<h1>Room Specs</h1>
		<div class="form-row-left mt-5">
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
		</div>
		<div class="row mt-2">
			<div class="row">
				<button
					type="button"
					class="btn btn-primary mr-3 ml-3"
					@click="backStep"
				>
					&lt; Dates
				</button>
				<button
					type="button"
					class="btn btn-primary mr-3 ml-3"
					@click="submit"
				>
					Payment &gt;
				</button>
			</div>
		</div>
	</div>
</template>

<script>
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
			this.$emit('next-step')
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
