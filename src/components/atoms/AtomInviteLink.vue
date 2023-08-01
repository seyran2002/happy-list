<template>
  <fieldset
    class="form-label-group hg-invite-link-content"
    :class="{
      'not-empty': inputVal.length !== 0,
      'input-with-icons': inputIcons.length,
    }"
  >
    <div
      :id="`show_${id}`"
      v-model="inputVal"
      :class="[dataClasses, textSize, height, borderRadius, inputIconsPosition]"
    >
      <span>{{ inputVal }}</span>
    </div>
    <input :id="`input_${id}`" type="hidden" :value="inputVal" />

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
  </fieldset>
</template>

<script>
export default {
  name: 'AtomInviteLink',
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
    dataClasses: {
      type: String,
      default: 'hg-invite-link',
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
    initIconAction(clickEvent) {
      if (clickEvent === 'copyInviteUrl') {
        this.copyInviteUrl(`input_${this.id}`);
      } else {
        this.$eventHub.$emit(clickEvent, `input_${this.id}`);
      }
    },
    copyInviteUrl(inputID) {
      const urlToCopy = document.getElementById(inputID);
      urlToCopy.setAttribute('type', 'text');
      urlToCopy.select();

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        alert(this.$t(`createEvent.copy_link_${msg}`));
      } catch (err) {
        alert(this.$t('createEvent.unable_copy'));
      }

      /* unselect the range */
      urlToCopy.setAttribute('type', 'hidden');
      window.getSelection().removeAllRanges();
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
@import '@/assets/styles/atoms/AtomInviteLink.scss';
</style>
