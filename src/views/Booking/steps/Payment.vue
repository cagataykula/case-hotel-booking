<template>
	<div
		class="col-md-12 d-flex justify-content-center flex-column align-items-center"
	>
		<h1>Payment</h1>
		<credit-card
			class="mt-5"
			:cardHolder="payment.nameSurname"
			:cardNumber="payment.cardNumber"
			:expireMonth="payment.month"
			:expireYear="payment.year"
			:cvv="payment.cvv"
			cardHolderPlaceholder="Name Surname"
			cardNumberPlaceholder="0000 0000 0000 0000"
			expireMonthPlaceholder="00"
			expireYearPlaceholder="00"
			cvvPlaceholder="000"
			fontColor="#fff"
			:width="290"
			:flip="flip"
		/>
		<ValidationObserver ref="form">
			<div class="col-md-12 mt-4" style="max-width: 450px;">
				<ValidationProvider
					vid="cardNumber"
					name="Card Number"
					rules="required|numeric|min:13|max:19"
					v-slot="{ errors }"
					slim
				>
					<div class="form-group text-left">
						<label for="card-number">Card Number</label>
						<input
							v-model="payment.cardNumber"
							type="text"
							id="card-number"
							class="form-control"
							:class="{ 'validation-error': errors[0] }"
						/>
					</div>
				</ValidationProvider>
				<ValidationProvider
					vid="nameSurname"
					name="Name Surname"
					rules="required"
					v-slot="{ errors }"
					slim
				>
					<div class="form-group">
						<div class="forum-group text-left">
							<label for="name-surname">Name Surname</label>
							<input
								v-model="payment.nameSurname"
								type="text"
								id="name-surname"
								class="form-control"
								:class="{ 'validation-error': errors[0] }"
							/>
						</div>
					</div>
				</ValidationProvider>
				<div class="form-group row">
					<div class="col-sm-4 align-self-center pb-5">
						<!-- <h5>Expiration</h5> -->
					</div>
					<ValidationProvider
						vid="month"
						name="Expire Month"
						rules="required|length:2"
						v-slot="{ errors }"
						slim
					>
						<div class="form-group col">
							<div>
								<label for="month">Month</label>
							</div>
							<div>
								<input
									v-model="payment.month"
									type="number"
									id="month"
									class="form-control"
									:class="{ 'validation-error': errors[0] }"
									size="2"
								/>
							</div>
						</div>
					</ValidationProvider>
					<ValidationProvider
						vid="year"
						name="Expire Year"
						rules="required|length:2"
						v-slot="{ errors }"
						slim
					>
						<div class="form-group col">
							<div>
								<label for="year">Year</label>
							</div>
							<div>
								<input
									v-model="payment.year"
									type="number"
									id="year"
									class="form-control"
									:class="{ 'validation-error': errors[0] }"
									size="2"
								/>
							</div>
						</div>
					</ValidationProvider>
					<ValidationProvider
						vid="cvv"
						name="CVV/CVC"
						rules="required|min:3|max:4"
						v-slot="{ errors }"
						slim
					>
						<div class="form-group col-sm-3">
							<div>
								<label for="exampleInputEmail1">CVV/CVC</label>
							</div>
							<div>
								<input
									@focus="flip = true"
									@blur="flip = false"
									v-model="payment.cvv"
									type="number"
									class="form-control"
									:class="{ 'validation-error': errors[0] }"
									size="4"
								/>
							</div>
						</div>
					</ValidationProvider>
				</div>
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
import CreditCard from '../../../components/CreditCard'
export default {
	components: {
		// eslint-disable-next-line vue/no-unused-components
		CreditCard
	},
	data() {
		return {
			payment: {
				nameSurname: '',
				cardNumber: '',
				month: '',
				year: '',
				cvv: '',
			},
			flip: false
		}
	},
	methods: {
		backStep() {
			this.$emit('back-step')
		},
		submit() {
			this.$refs.form.validate().then((valid) => {
				if (valid) {
					this.$store.dispatch('makePayment', this.payment)
					return this.$emit('finish-steps')
				}
				else {
					console.log(typeof this.$refs.form.errors)
					let errorMessage = ''
					Object.keys(this.$refs.form.errors).forEach((key) => {
						this.$refs.form.errors[key].forEach((error) => {
							errorMessage += error + '<br>'
						})
					})
					Swal.fire({
						title: 'Missing Fields!',
						html: errorMessage,
						icon: 'error',
						confirmButtonText: 'OK'
					})
				}
			})
		}
	}
}
</script>

<style></style>
