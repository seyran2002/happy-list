<template>
  <fieldset
    :class="{
      'form-label-group': true,
      'create-event--wrapper-info-form-block---form-input': true,
      'error-style': errors.has('time'),
      'not-empty': !!value,
    }"
  >
    <div class="time-picker-input-container">
      <input
        :id="id"
        v-model="time"
        v-validate="'required|time'"
        type="text"
        :class="className"
        class="time-picker-input"
        value="00:00"
        name="time"
        :aria-invalid="!isValid && time.length > 0"
        @input="setTime"
        @focus="$event.target.select()"
        @change="changeTime()"
      />

      <label :for="id">{{ labelText }} *</label>
      <span v-if="time" class="trash__time" @click="resetTime">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </span>
      <span class="error-message"> {{ errors.first('time') ? $t('createEvent.invalid_time_format') : '' }}</span>
    </div>
  </fieldset>
</template>

<script>
import { timeFormat } from '@/utils/validators';

export default {
  name: 'AtomTimepicker',
  props: {
    value: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: () => '',
    },
    labelText: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: () => '',
    },
    selectedEventDate: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      time: this.value,
      isValid: true,
      isDirty: false,
    };
  },
  created() {
    this.$eventHub.$on('check-validate', this.checkValidate);
  },
  methods: {
    checkValidate() {
      this.$validator.validate();
    },
    resetTime() {
      this.time = '';
      this.isValid = true;
    },
    setTime() {
      this.isDirty = true;
      const timeLength = String(this.time).length;
      if (timeLength === 2 && Number(this.time)) {
        this.time += ':';
      } else if (
        this.time.length === 2 &&
        Number(this.time[0]) &&
        [':', '.', '-'].some(el => this.time[1].includes(el))
      ) {
        this.time = `0${this.time[0]}:`;
      } else if (timeLength > 3 && timeLength < 4) {
        if (Number(this.time.substring(0, 2)) && Number(this.time.substring(3, 4))) {
          this.time += '';
        }
      } else if (timeLength > 5 && timeLength < 6) {
        const timeType = this.time.substring(5, 6).toLowerCase();
        if (timeType !== 'am' || timeType !== 'pm') {
          this.time = this.time.substring(0, 5);
        }
      }

      this.validateHhMm();
    },
    validateHhMm() {
      this.isValid = timeFormat.validate(this.time);
      if (this.isValid) {
        this.validateDateTime();
      }
      this.$emit('set-time', this.time, this.isValid);
    },
    changeTime() {
      if (this.time.length === 4 && Number(this.time[3])) {
        this.time = `${this.time.substring(0, 3)}0${this.time[3]}`;
      }
      this.validateHhMm();
    },
    validateDateTime() {
      if (this.selectedEventDate) {
        const dateNow = new Date();
        const dateTime = new Date(`${this.selectedEventDate} ${this.time}`);
        if (
          dateNow.getFullYear() === new Date(dateTime).getFullYear() &&
          dateNow.getMonth() === new Date(dateTime).getMonth() &&
          dateNow.getDate() === new Date(dateTime).getDate()
        ) {
          this.isValid = dateTime > new Date(`${this.selectedEventDate} ${dateNow.getHours()}:${dateNow.getMinutes()}`);
        } else {
          this.isValid = true;
        }
      }
    },
  },
  mounted() {
    if (this.time) {
      this.validateHhMm();
    }
  },
  watch: {
    selectedEventDate() {
      if (this.isDirty) {
        this.validateDateTime();
      }
    },
    value() {
      this.time = this.value;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/atoms/AtomTimepicker.scss';
</style>
