<template >
  <p v-if="isLoading">Loading...</p>
  <section class="toy-list" v-else>
    <carousel :items-to-show="5" :wrap-around="true">
      <slide v-for="toy in toys" :key="toy._id">
        <toy-preview @removeToy="removeToy"  :toy="toy"  />
      </slide>
          <template #addons>
      <Navigation />
      <Pagination />
    </template>
    </carousel>
  </section>
</template>

<script>
import toyPreview from './toy-preview.vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
export default {

  name: 'toy-list',

  props: {
    toys: {
      type: Array,
      required: true,
    },
  },
  components: {
    toyPreview,
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  methods: {
    removeToy(toyId) {
      this.$emit('removeToy', toyId);
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  }
};
</script>
