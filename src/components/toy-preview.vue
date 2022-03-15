<template>
  <li>
    <custom-card>
      <template #header>
        <p>{{ toy.name }}</p>
        <p>{{ formatPrice }}</p>
        <p v-for="label in toy.labels" :key="label">{{ label }}</p>
      </template>

      <template #footer>
        <button @click="goToDetail">Details</button>
        <button @click="goToEdit">Edit</button>
        <button @click="removeToy(toy._id)">Delete</button>
      </template>
    </custom-card>
  </li>
</template>

<script>
import customCard from './custom-card.vue';

export default {
  name: 'toy-preview',
  props: {
    toy: Object,
  },
  components: {
    customCard,
  },
  methods: {
    goToDetail() {
      this.$router.push(`/details/${this.toy._id}`);
    },
    goToEdit() {
      this.$router.push(`/edit/${this.toy._id}`);
    },
    removeToy(toyId) {
      this.$emit('removeToy', toyId);
    },
  },
  computed: {
    formatPrice() {
      return new Intl.NumberFormat('en-US', 
      { style: 'currency', currency: 'USD'})
      .format(this.toy.price)
    }
  }
};
</script>
