<template>
  <fieldset
    class="form-label-group create-event--wrapper-info-form-block---form-input"
    :class="{
      'error-style': errors.has(name),
      'not-empty': inputVal.length !== 0,
    }"
  >
    <input
      :id="id"
      v-model="inputVal"
      v-validate="validationRules"
      autocomplete="off"
      :type="type"
      :name="name"
      @input="changeInputVal"
      @click="changeInputVal"
    />
    <label :for="id">{{ label }} {{ isRequired ? '*' : '' }}</label>
    <span class="error-message">{{ errors.first(name) ? $t(`${translationWord}.${errors.first(name)}`) : '' }}</span>
  </fieldset>
</template>

<script>
export default {
  name: 'AtomInput',
  props: {
    value: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      default: 'city',
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    validationRules: {
      type: String,
      required: false,
    },
    translationWord: {
      type: String,
      default: 'createEvent',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    isRequired() {
      return this.validationRules && this.validationRules.split('|').includes('required');
    },
  },
  data() {
    return {
      inputVal: this.value,
      mapInput: '',
      sydney: '',
      infowindow: '',
      map: '',
      service: '',
      place: '',
    };
  },
  created() {
    this.$eventHub.$on('check-validate', this.checkValidate);
    this.$eventHub.$on('reset-form', this.resetInput);
  },
  mounted() {
    if (this.id === 'country') {
      this.place = new google.maps.places.Autocomplete(document.getElementById(this.id), {
        types: ['(cities)'],
      });
      document.getElementById(this.id).placeholder = '';
    }
  },
  methods: {
    checkValidate() {
      this.$validator.validate();
    },
    resetInput() {
      this.$validator.reset();
    },
    changeInputVal() {
      if (this.id === 'country') {
        this.$emit('changeInputVal', document.getElementById(this.id).value, this.name);
      } else {
        this.$emit('changeInputVal', this.inputVal, this.name);
      }
    },
  },
  watch: {
    value() {
      this.inputVal = this.value;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/atoms/AtomInput';
</style>
