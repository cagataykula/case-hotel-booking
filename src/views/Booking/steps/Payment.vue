<template>
	<div
		class="col-md-12 d-flex justify-content-center flex-column align-items-center"
	>
		<h1>Payment</h1>
		<credit-card
      class="mt-5"
			:cardHolder="nameSurname"
			:cardNumber="cardNumber"
			:expireMonth="month"
			:expireYear="year"
			:cvv="cvv"
			cardHolderPlaceholder="Name Surname"
			cardNumberPlaceholder="0000 0000 0000 0000"
			expireMonthPlaceholder="00"
			expireYearPlaceholder="00"
			cvvPlaceholder="000"
			fontColor="#fff"
			:width="290"
			:flip="flip"
		/>
		<div class="col-md-12 mt-4" style="max-width: 450px;">
			<div class="form-group text-left">
				<label for="exampleInputEmail1">Card Number</label>
				<input type="text" v-model="cardNumber" class="form-control" />
			</div>
			<div class="form-group text-">
				<div class="forum-group text-left">
					<label class="control-label">Name Surname</label>
					<input v-model="nameSurname" class="form-control" type="text" />
				</div>
			</div>
			<div class="form-group row">
				<div class="col-sm-4 align-self-center pb-5">
					<!-- <h5>Expiration</h5> -->
				</div>
				<div class="form-group col">
					<div>
						<label for="exampleInputEmail1">Month</label>
					</div>
					<div>
						<input v-model="month" type="email" class="form-control" size="3" />
					</div>
				</div>
				<div class="form-group col">
					<div>
						<label for="exampleInputEmail1">Year</label>
					</div>
					<div>
						<input v-model="year" type="email" class="form-control" size="3" />
					</div>
				</div>
				<div class="form-group col-sm-3">
					<div>
						<label for="exampleInputEmail1">CVV</label>
					</div>
					<div>
						<input
							@focus="flip = true"
							@blur="flip = false"
							v-model="cvv"
							type="email"
							class="form-control"
							size="3"
						/>
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
				<button type="button" class="btn btn-primary mr-3 ml-3" @click="submit">
					Payment &gt;
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import CreditCard from '../../../components/CreditCard'
export default {
	components: {
		// eslint-disable-next-line vue/no-unused-components
		CreditCard
	},
	data() {
		return {
			nameSurname: '',
			cardNumber: '',
			month: '',
			year: '',
			cvv: '',
			flip: false
		}
	},
	methods: {
		backStep() {
			this.$emit('back-step')
		},
		submit() {
			this.$emit('finish-steps')
		}
	}
}
</script>

<style></style>
