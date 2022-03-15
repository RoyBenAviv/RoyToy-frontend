<template>
  <section v-if="toyToEdit">
  <pre>{{toyToEdit}}</pre>
    <form @submit.prevent="save">
      <input type="text" placeholder="Toy name?" v-model="toyToEdit.name" />
      <input type="number" v-model="toyToEdit.price" />
      <label> On stock?
        <input type="checkbox" v-model="toyToEdit.inStock" />
      </label>
      <label v-for="label in labels" :key="label">
            {{label}}
              <input type="checkbox" :value="label" v-model="toyToEdit.labels"/>


      </label>
      <button>Save</button>
    </form>
  </section>
</template>

<script>

import { toyService } from '../services/toy.service.js';

export default {
  name: 'toy-edit',
  data() {
    return {
      toyToEdit: null,
    };
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      toyService.getById(id).then((toy) => {
        this.toyToEdit = toy;
      });
    } else this.toyToEdit = toyService.getEmptyToy();
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    save() {
      console.log('this.toyToEdit',this.toyToEdit);
      this.$store.dispatch({ type: 'saveToy', toy: this.toyToEdit })
        .then(() => {
          this.$router.push('/');
        });
    },
  },
  computed: {
    labels() {
      return this.$store.getters.getLabels;
    }
  }
};
</script>