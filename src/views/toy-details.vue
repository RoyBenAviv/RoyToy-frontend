<template>
  <section v-if="toy">
    <article>
      <h3>{{ toy.name }}</h3>
      <p>
        <span>SKU:</span>
        {{ toy._id }}
      </p>
      <p>
        <span>Categories:</span>
      </p>
      <p v-for="label in toy.labels" :key="label">{{ label }}</p>
      <p>
        <span>PRICE:</span>
        {{ formatPrice }}
      </p>
      <p>
        <span>Placed on store at:</span>
        {{ formatDate }}
      </p>

      <h4>Reviews:</h4>
      <ul>
        <li v-if="toy.reviews.length" v-for="review in toy.reviews" :key="review">
          <p>{{ review.txt }}</p>
        </li>
        <li v-else>No reviews yet.</li>
      </ul>
    </article>
    <button @click="goBack">go back</button>
  </section>
</template>

<script>
import { toyService } from '../services/toy.service.js';


export default {
  name: 'toy-details',
  data() {
    return {
      toy: null,
    };
  },
  created() {
    const { id } = this.$route.params;
    toyService.getById(id).then((toy) => {
      this.toy = toy;
    });
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
  },
  computed: {
    formatDate() {
      return new Date(this.toy.createdAt).toDateString();
    },
    formatPrice() {
      return new Intl.NumberFormat('en-US',
        { style: 'currency', currency: 'USD' })
        .format(this.toy.price);
    }
  }
};

</script>