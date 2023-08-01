<template>
  <div id="NotFoundComponent">
    <h5>{{ $t('notFound.about') }}</h5>
    <div class="description text-16">
      <div>
        {{ $t('notFound.name') }}:
        <span class="font-light"><i>{{ $t(`notFound.paintings.${item.name}`) }}</i></span>
      </div>
      <div>
        {{ $t('notFound.author') }}:
        <span class="font-light"><i>{{ $t(`notFound.painters.${item.author}`) }}</i></span>
      </div>
    </div>
    <div class="image">
      <picture-component :sources="sources" :fallback-img="fallbackImg" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      images: [
        { path: 'a-friend-in-need-painting', name: 'A Friend in Need', author: 'Cassius Marcellus Coolidge' },
        {
          path: 'A-Sunday-Afternoon-on-the-Island-of-La-Grande-Jatte-painting2',
          name: 'A Sunday Afternoon on the Island of La Grande Jatte',
          author: 'Georges Seurat',
        },
        {
          path: 'Cafe-Terrace-at-Night-van-gogh-painting',
          name: 'Café Terrace at Night',
          author: 'Vincent van Gogh',
        },
        {
          path: 'la-moulin-de-la-galette-renoir-painting',
          name: 'Dance at le Moulin de la Galette',
          author: 'Pierre-Auguste Renoir',
        },
        { path: 'las-meninas-de-diego-velazquez-painting', name: 'Las Meninas', author: 'Diego Velázquez' },
        {
          path: 'Massacre-of-the-Innocents-painting',
          name: 'Massacre of the Innocents',
          author: 'Peter Paul Rubens',
        },
        { path: 'night-watch-rembrandt-wallpaper', name: 'Night Watch', author: 'Rembrandt' },
        { path: 'Nighthawks_by_Edward_Hopper', name: 'Nighthawks', author: 'Edward Hopper' },
        {
          path: 'Peter_Paul_Rubens_The_Disembarkation_at_Marseilles',
          name: 'The Disembarkation at Marseilles',
          author: 'Peter Paul Rubens',
        },
        { path: 'Samson_and_Delilah', name: 'Samson and Delilah', author: 'Peter Paul Rubens' },
        { path: 'school-of-athens-raphael-painting', name: 'The School of Athens', author: 'Raphael' },
        { path: 'The-Birth-of-Venus-Painting', name: 'The Birth of Venus', author: 'Sandro Botticelli' },
        {
          path: 'the-creation-of-adam-michelangelo-wallpaper',
          name: 'The Creation Of Adam',
          author: 'Michelangelo',
        },
        { path: 'The-Dance-by-Henri-Matisse-painting', name: 'The Dance', author: 'Henri Matisse' },
        {
          path: 'the-hippopotamus-and-crocodile-hunt',
          name: 'The Hippopotamus and Crocodile Hunt',
          author: 'Peter Paul Rubens',
        },
        { path: 'the-kiss-gustav-klimt-painting', name: 'The Kiss', author: 'Gustav Klimt' },
        { path: 'the-last-supper-mary-magdalene-painting', name: 'The Last Supper', author: 'Leonardo da Vinci' },
      ],
      item: null,
    };
  },
  computed: {
    sources() {
      return [
        { srcset: require(`./../assets/images/art/${this.item.path}.webp`), type: 'webp' },
        { srcset: require(`./../assets/images/art/${this.item.path}.jpg`), type: 'jpg' },
      ];
    },
    fallbackImg() {
      return {
        src: require(`./../assets/images/art/${this.item.path}.jpg`),
        alt: this.item.name,
      };
    },
  },
  created() {
    this.item = this.images[Math.floor(Math.random() * this.images.length)];
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/pages/NotFound.scss';
</style>
