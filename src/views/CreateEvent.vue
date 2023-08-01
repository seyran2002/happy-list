<template>
  <div class="create-event">
    <atom-title class="faq-title" tag="h1" :text="$t('createEvent.title')" text-position="text-center" />
    <atom-text class="text-center mt-26" :text="$t('createEvent.title_description')" />

    <organism-create-event />
  </div>
</template>

<script>
import AtomTitle from '@/components/atoms/AtomTitle';
import AtomText from '@/components/atoms/AtomText';
import OrganismCreateEvent from '@/components/organisms/OrganismCreateEvent';

export default {
  name: 'CreateEventPage',
  components: {
    AtomTitle,
    AtomText,
    OrganismCreateEvent,
  },
  metaInfo() {
    return {
      title: 'Create Event',
      meta: [{ vmid: 'description', name: 'description', content: 'This is Create Event page' }],
    };
  },
};
</script>
