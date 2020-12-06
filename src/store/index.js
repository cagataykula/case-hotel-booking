import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields'

import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
	getters: {
		getField,
		getDates: (state) => state.dates,
		getRoomSpecs: (state) => state.roomSpecs,
		getCreditCard: (state) => state.creditCard
	},
	state: {
		dates: {
			raw: {
				checkInDate:
					localStorage.getItem('checkInDate') &&
					new Date(localStorage.getItem('checkInDate')),
				checkOutDate:
					localStorage.getItem('checkOutDate') &&
					new Date(localStorage.getItem('checkOutDate'))
			},
			formatted: {
				checkInDate:
					localStorage.getItem('checkInDate') &&
					moment(new Date(localStorage.getItem('checkInDate'))).format(
						'DD MMMM YYYY'
					),
				checkOutDate:
					localStorage.getItem('checkOutDate') &&
					moment(new Date(localStorage.getItem('checkOutDate'))).format(
						'DD MMMM YYYY'
					)
			}
		},
		roomSpecs: {
			type: localStorage.getItem('roomType'),
			view: localStorage.getItem('roomView')
		},
		creditCard: {
			nameSurname: localStorage.getItem('creditCardHolderName') || '',
			cardNumber: localStorage.getItem('creditCardNumber') || '',
			month: localStorage.getItem('creditCardMonth') || '',
			year: localStorage.getItem('creditCardYear') || '',
			cvv: localStorage.getItem('creditCardCVV') || ''
		}
	},
	mutations: {
		updateField,
		setDates(state, dates) {
			state.dates = dates
		},
		setRoomSpecs(state, roomSpecs) {
			state.roomSpecs = roomSpecs
		},
		setCreditCard(state, creditCard) {
			state.creditCard = creditCard
		}
	},
	actions: {
		saveDates({ commit }, payload) {
			const { checkInDate, checkOutDate } = payload
			checkInDate && localStorage.setItem('checkInDate', payload.checkInDate)
			checkOutDate && localStorage.setItem('checkOutDate', payload.checkOutDate)
			const dates = {
				raw: {
					checkInDate: checkInDate || null,
					checkOutDate: checkOutDate || null
				},
				formatted: {
					checkInDate:
						checkInDate && moment(new Date(checkInDate)).format('DD MMMM YYYY'),
					checkOutDate:
						checkOutDate &&
						moment(new Date(checkOutDate)).format('DD MMMM YYYY')
				}
			}
			commit('setDates', dates)
		},
		saveRoomSpecs({ commit }, payload) {
			const { type, view } = payload
			localStorage.setItem('roomType', type)
			localStorage.setItem('roomView', view)
			commit('setRoomSpecs', payload)
		},
		makePayment({ getters }, payload) {
			return new Promise((resolve) => {
				const { checkInDate, checkOutDate } = getters.getDates.raw
				const dates = { checkInDate, checkOutDate }
				const roomSpecs = getters.getRoomSpecs
	
				const postData = {
					dates,
					roomSpecs,
					payment: payload
				}
				console.log('BOOKING INFORMATION:', postData)
				resolve()
			})
		},
		clearBookingData({ state }) {
			return new Promise((resolve) => {
				state.dates = {
					raw: {
						checkInDate: null,
						checkOutDate: null
					},
					formatted: {
						checkInDate: null,
						checkOutDate: null
					}
				}

				state.roomSpecs = {
					type: null,
					view: null
				}

				state.creditCard = {
					nameSurname: '',
					cardNumber: '',
					month: '',
					year: '',
					cvv: ''
				}

				localStorage.removeItem('checkInDate')
				localStorage.removeItem('checkOutDate')

				localStorage.removeItem('roomType')
				localStorage.removeItem('roomView')

				localStorage.removeItem('creditCardHolderName')
				localStorage.removeItem('creditCardNumber')
				localStorage.removeItem('creditCardMonth')
				localStorage.removeItem('creditCardYear')
				localStorage.removeItem('creditCardCVV')
				resolve()
			})
		},
		saveCreditCard({ commit }, payload) {
			const { nameSurname, cardNumber, month, year, cvv } = payload
			localStorage.setItem('creditCardHolderName', nameSurname)
			localStorage.setItem('creditCardNumber', cardNumber)
			localStorage.setItem('creditCardMonth', month)
			localStorage.setItem('creditCardYear', year)
			localStorage.setItem('creditCardCVV', cvv)
			commit('setCreditCard', payload)
		}
	}
})
