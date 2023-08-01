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
  name: 'MoleculeNewPresentForm',
  components: {
    AtomInput,
  },
  props: {
    presentData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    inputs() {
      return [
        {
          id: 'present_name',
          name: 'present_name',
          value: this.presentData.present_name,
          label: this.$t('createEvent.present_name'),
          validationRules: 'required|max:50',
        },
        {
          id: 'present_link',
          name: 'present_link',
          value: this.presentData.present_link,
          label: this.$t('createEvent.present_link'),
          validationRules: 'url: {require_protocol: true }',
        },
        {
          id: 'present_description',
          name: 'present_description',
          value: this.presentData.present_description,
          label: this.$t('createEvent.present_description'),
          validationRules: 'max:191',
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
