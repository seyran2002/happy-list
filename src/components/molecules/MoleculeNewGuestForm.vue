<template>
  <div>
    <atom-input
      v-for="item in inputs"
      :id="item.id"
      :key="item.id"
      v-model="item.value"
      :validation-rules="item.validationRules"
      :label="item.label"
      :name="item.name"
      @changeInputVal="changeInputVal"
    />
  </div>
</template>

<script>
import AtomInput from '@/components/atoms/AtomInput';

export default {
  name: 'MoleculeNewGuestForm',
  components: {
    AtomInput,
  },
  props: {
    guestData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    inputs() {
      return [
        {
          id: 'guestName',
          name: 'guest_name',
          value: this.guestData.guest_name,
          label: this.$t('createEvent.guest_name'),
          validationRules: 'required',
        },
        {
          id: 'guestContact',
          name: 'guest_contact',
          value: this.guestData.guest_contact,
          label: this.$t('createEvent.guest_contact'),
          validationRules: 'required|phoneOrEmail',
        },
      ];
    },
  },
  methods: {
    changeInputVal(val, name) {
      this.$emit('changeInputVal', val, name);
    },
  },
};
</script>
