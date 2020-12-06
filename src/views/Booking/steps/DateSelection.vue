<template>
	<div
		class="col-md-12 d-flex justify-content-center flex-column align-items-center"
	>
		<h1>Check-in & Check-out Dates</h1>
		<div class="form-group row mt-5">
			<h5 class="col-sm-5 col-form-label">
				Check-in Date
			</h5>
			<div class="col-sm-7">
				<date-picker
					:get-classes="getRangeClasses"
					v-model="dates.checkInDate"
					value-type="date"
					format="DD MMMM YYYY"
					placeholder="Select check-in date"
					:disabled-date="disableAfterEnd"
				></date-picker>
			</div>
		</div>
		<div class="form-group row">
			<h5 class="col-sm-5 col-form-label">
				Check-out Date
			</h5>
			<div class="col-sm-7">
				<date-picker
					:get-classes="getRangeClasses"
					type="date"
					v-model="dates.checkOutDate"
					value-type="date"
					format="DD MMMM YYYY"
					:disabled-date="disableBeforeStart"
					placeholder="Select check-out date"
				></date-picker>
			</div>
		</div>
		<div class="w-50 clearfix col-sm-12 float-md-right">
			<h5 class="float-md-right clearfix">
				<template v-if="getHowManyDays">
					{{ getHowManyDays }} day{{ getHowManyDays > 1 ? 's' : null }}
				</template>
			</h5>
		</div>
		<div class="form-group row">
			<div class="col-sm-12">
				<button @click="submit" type="button" class="btn btn-primary">
					Room Specs &gt;
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment'

export default {
	components: {
		DatePicker
	},
	data() {
		return {
			dates: {
				checkInDate: null,
				checkOutDate: null
			},
			open: false
		}
	},
	created() {
		const { checkInDate, checkOutDate } = this.$store.getters.getDates.raw

		if (checkInDate && checkOutDate) {
			this.dates.checkInDate = checkInDate
			this.dates.checkOutDate = checkOutDate
		}
	},
	computed: {
		getHowManyDays() {
			if (this.dates.checkInDate && this.dates.checkOutDate) {
				const checkInDate = moment(this.dates.checkInDate)
				const checkOutDate = moment(this.dates.checkOutDate)
				return checkOutDate.diff(checkInDate, 'days') + 1
			} else return false
		}
	},
	methods: {
		getRangeClasses(cellDate, currentDates, classnames) {
			const classes = []
			const start =
				this.dates.checkInDate &&
				new Date(this.dates.checkInDate).setHours(0, 0, 0, 0)
			const end =
				this.dates.checkOutDate &&
				new Date(this.dates.checkOutDate).setHours(0, 0, 0, 0)
			if (
				!/disabled|active|not-current-month/.test(classnames) &&
				start &&
				end &&
				cellDate.getTime() >= start &&
				cellDate.getTime() <= end
			) {
				classes.push('in-range')
			}
			return classes
		},
		disableBeforeStart(date) {
			const checkInDate = moment(this.dates.checkInDate)
			return date < checkInDate || false
		},
		disableAfterEnd(date) {
			const checkOutDate = moment(this.dates.checkOutDate)
			return date > checkOutDate || false
		},
		submit() {
			this.$emit('next-step')
		}
	},
	watch: {
		dates: {
			handler: function() {
				this.$store.dispatch('saveDates', this.dates)
			},
			deep: true
		}
	},
	filters: {
		date(val) {
			return val ? moment(val).format('DD MMMM YYYY') : ''
		}
	}
}
</script>
