<template>
  <fieldset
    class="form-label-group hg-custom-input-content"
    :class="{
      'error-style': errors.has(name),
      'not-empty': inputVal.length !== 0,
      'input-with-icons': inputIcons.length,
    }"
  >
    <input
      :id="`input_${id}`"
      v-model="inputVal"
      v-validate="validationRules"
      type="text"
      :class="[dataClasses, textSize, height, borderRadius, inputIconsPosition]"
      :name="name"
      @input="changeInputVal"
    />
    <span v-if="inputIcons.length" :class="['hg-icons-content', inputIconsPosition]">
      <img
        v-for="inputIcon in inputIcons"
        :src="require(`@/assets/images/svg/${inputIcon.iconName}.svg`)"
        :title="inputIcon.title"
        :class="inputIcon.iconName"
        width="16"
        height="16"
        alt=""
        @click.stop.prevent="initIconAction(inputIcon.clickEvent)"
      />
    </span>

    <label v-if="label" :for="`input_${id}`">{{ label }} *</label>
    <span class="error-message">{{ errors.first(name) ? $t(`createEvent.${errors.first(name)}`) : '' }}</span>
  </fieldset>
</template>

<script>
export default {
  name: 'AtomInputAdvanced',
  props: {
    value: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    validationRules: {
      type: String,
      required: false,
    },
    dataClasses: {
      type: String,
      default: 'hg-custom-input',
    },
    height: {
      type: String,
      validator(value) {
        return ['height-32', ''].includes(value);
      },
      default: '',
    },
    textSize: {
      type: String,
      validator(value) {
        return ['text-11', ''].includes(value);
      },
      default: '',
    },
    borderRadius: {
      type: String,
      validator(value) {
        return ['border-radius-10', ''].includes(value);
      },
      default: '',
    },
    inputIcons: {
      type: Array,
      default: '',
    },
    inputIconsPosition: {
      type: String,
      validator(value) {
        return ['append-icons-left', 'append-icons-right', ''].includes(value);
      },
      default: '',
    },
  },
  data() {
    return {
      inputVal: this.value,
    };
  },
  methods: {
    changeInputVal() {
      this.$emit('changeInputVal', this.inputVal, this.name);
    },
    initIconAction(clickEvent) {
      this.$eventHub.$emit(clickEvent, `input_${this.id}`);
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
@import '@/assets/styles/atoms/AtomInputAdvanced.scss';
</style>
