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
  name: 'MoleculeNewEventForm',
  components: {
    AtomInput,
  },
  props: {
    eventData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    inputs() {
      return [
        {
          id: 'eventName',
          name: 'name',
          value: this.eventData.name,
          label: this.$t('createEvent.event_name'),
          validationRules: 'required',
        },
        {
          id: 'eventLocation',
          name: 'location',
          value: this.eventData.location,
          label: this.$t('createEvent.event_location'),
          validationRules: 'required',
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
