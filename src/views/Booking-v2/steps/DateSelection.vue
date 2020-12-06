<template>
  <div class="col-md-12 d-flex justify-content-center flex-column align-items-center pt-5 pb-5">
    <date-range-picker
            ref="picker"
            opens="inline"
            :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY' }"
            :autoApply="true"
            v-model="dates"
            alwaysShowCalendars
            showDropdowns
            linkedCalendars
    >
        <template v-slot:input="picker" style="min-width: 350px;">
            {{ picker.startDate | date}} - {{ picker.endDate | date }}
        </template>
    </date-range-picker>
  </div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import moment from 'moment'

export default {
  components: {
    DateRangePicker
  },
 data() {
    return {
      dates: {
        startDate: null,
        endDate: null
      }
    }
  },
  created() {
    this.dates.startDate = localStorage.getItem('checkInDate')
    this.dates.endDate = localStorage.getItem('checkOutDate')
  },
  watch: {
    dates: {
      handler: function(val) {
        if(val.startDate && val.endDate) {
          localStorage.setItem('checkInDate', val.startDate)
          localStorage.setItem('checkOutDate', val.endDate)
          this.$emit('can-continue', { value: true })
        }
      },
      deep: true,
      immediate: true
    }
  },
  filters: {
    date(val) {
    return val ? moment(val).format("DD MMMM YYYY") : "";
    }
  }
}
</script>
