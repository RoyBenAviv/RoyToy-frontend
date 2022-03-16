<template>
  <section class="toy-edit" v-if="toyToEdit">
  <h1>{{formTitle}}</h1>
    <form @submit.prevent="save">
    <label>
        Name of the toy?
      <input type="text" placeholder="Write the name here" v-model="toyToEdit.name" />
    </label>
        Price of the toy?
      <input type="number" v-model="toyToEdit.price" min="0" max="150"/>
      <label> On stock?
        <input type="checkbox" v-model="toyToEdit.inStock" />
      </label>

      <label class="label-category" v-for="label in labels" :key="label">
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
    },
    formTitle() {
            const { id } = this.$route.params;
            return id ? 'Edit Toy' : 'Add new toy!';
    },
  }
};
</script>