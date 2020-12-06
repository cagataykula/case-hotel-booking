<template>
  <div class="col-md-12 d-flex justify-content-center flex-column align-items-center pt-5 pb-5">
      <div class="form-row-left">
        <div class="form-row align-items-left">
            Room type:
            <div class="form-group ml-2">
                <div class="form-check form-check-inline">
                    <input v-model="room.type" class="form-check-input" type="radio" name="roomType" id="standart" value="standart">
                    <label class="form-check-label" for="standart">Standart</label>
                </div>
                <div class="form-check form-check-inline">
                    <input v-model="room.type" class="form-check-input" type="radio" name="roomType" id="deluxe" value="deluxe">
                    <label class="form-check-label" for="deluxe">Deluxe</label>
                </div>
                <div class="form-check form-check-inline">
                    <input v-model="room.type" class="form-check-input" type="radio" name="roomType" id="suit" value="suit">
                    <label class="form-check-label" for="suit">Suit</label>
                </div>
            </div>
        </div>
        <div class="form-row align-items-left">
            Room view:
            <div class="form-group ml-2">
                <div class="form-check form-check-inline">
                    <input v-model="room.view" class="form-check-input" type="radio" name="roomView" id="sea" value="sea">
                    <label class="form-check-label" for="sea">Sea</label>
                </div>
                <div class="form-check form-check-inline">
                    <input v-model="room.view" class="form-check-input" type="radio" name="roomView" id="land" value="land">
                    <label class="form-check-label" for="land">Land</label>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  components: {
    
  },
 data() {
    return {
      room: {
        type: null,
        view: null
      }
    }
  },
  created() {
    this.room.type = localStorage.getItem('roomType')
    this.room.view = localStorage.getItem('roomView')
  },
  watch: {
    room: {
      handler: function(val) {
        if(this.room.view) localStorage.setItem('roomView', val.view)
        if(this.room.type) localStorage.setItem('roomType', val.type)

        if(val.type && val.view)
        this.$emit('can-continue', { value: true })
      },
      deep: true
    }
  }
}
</script>
