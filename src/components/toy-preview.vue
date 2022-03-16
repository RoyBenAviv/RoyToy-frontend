<template>
    <custom-card>
      <template #header>
        <img width="100%" :src="toy.url" alt="No image"/>
          <div class="information">
              <h2>{{ toy.name }}</h2>
              <h2>{{ formatPrice }}</h2>
          </div>
      </template>
        <div class="categories">
            <p>Categories: <span>{{ toy.labels.join(', ')}}</span></p> 
        </div>

      <template #footer>
        <button @click="goToDetail">Details</button>
        <button @click="goToEdit">Edit</button>
        <button @click="removeToy(toy._id)">Delete</button>
      </template>
    </custom-card>
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
