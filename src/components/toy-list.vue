<template>
  <ul>
    <p v-if="isLoading">Loading...</p>
    <toy-preview v-else @removeToy="removeToy" v-for="toy in toys" :toy="toy" :key="toy._id" />
  </ul>
</template>

<script>
import toyPreview from './toy-preview.vue';

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
