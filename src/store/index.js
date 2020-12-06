import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields'

import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
	getters: {
		getField,
		getDates: (state) => state.dates,
		getRoomSpecs: (state) => state.roomSpecs
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
		}
	},
	mutations: {
		updateField,
		setDates(state, dates) {
			state.dates = dates
		},
		setRoomSpecs(state, roomSpecs) {
			state.roomSpecs = roomSpecs
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
					checkInDate: checkInDate && moment(new Date(checkInDate)).format(
						'DD MMMM YYYY'
					),
					checkOutDate: checkOutDate && moment(new Date(checkOutDate)).format(
						'DD MMMM YYYY'
					)
				}
			}
			commit('setDates', dates)
		},
		saveRoomSpecs({ commit }, payload) {
			const { type, view } = payload
			localStorage.setItem('roomType', type)
			localStorage.setItem('roomView', view)
			commit('setRoomSpecs', payload)
		}
	}
})
