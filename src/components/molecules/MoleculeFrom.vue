<template>
  <form class="form form-label form-css-label" autocomplete="off" @submit.prevent="validateForm">
    <atom-input
      v-for="item in inputs"
      :id="item.id"
      ref="inputs"
      :key="item.id"
      v-model="item.value"
      :validation-rules="item.validationRules"
      :label="item.label"
      :name="item.name"
      :translationWord="translationWord"
      @changeInputVal="(n, v) => $emit('changeInputVal', n, v)"
    />
    <atom-input-calendar v-if="datePicker" v-model="datePicker.date" @set-date="e => $emit('dateValueChange', e)" />
    <div class="text-right form-btn">
      <atom-link
        tag="button"
        text-size="text-14"
        text-color="text-white-color"
        font-family="font-source-bold"
        background="btn-gradient-color"
        class="btn"
      >
        {{ $t('profile.update') }}
      </atom-link>
    </div>
  </form>
</template>

<script>
import AtomInput from '../atoms/AtomInput';
import AtomInputCalendar from '../atoms/AtomInputCalendar';
import AtomLink from '../atoms/AtomLink';

export default {
  name: 'molecule-form',
  components: {
    AtomLink,
    AtomInputCalendar,
    AtomInput,
  },
  props: {
    translationWord: {
      type: String,
      default: 'createEvent',
    },
    inputs: {
      type: Array,
    },
    date: {
      type: Object,
    },
    datePicker: {
      type: Object,
      default: null,
    },
  },
  methods: {
    validateForm() {
      for (let i = 0; i < this.$refs.inputs.length; i++) {
        this.$refs.inputs[i].checkValidate();
      }
      if (!this.$refs.inputs.find(v => v.errors.items.length)) {
        this.$emit('submit-profile');
      }
    },
  },
};
</script>
