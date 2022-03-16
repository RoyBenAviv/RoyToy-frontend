<template>
    <toy-filter @setFilter="setFilter" />
    <toy-list v-if="toys" @removeToy="removeToy" :toys="toys" />

      <nice-popup class="chat" v-if="isChatOpen">
      <template #header>

      </template>

        <p>Chat is currently offline.</p>

      <template #footer>

      </template>
    </nice-popup>


    <div @click="isChatOpen = !isChatOpen" class="chat-widget">Chat</div>
</template>

<script>
import toyList from '../components/toy-list.vue';
import toyFilter from '../components/toy-filter.vue'
import nicePopup from '../components/nice-popup.vue';
export default {

  name: 'toy-app',
  data() {
    return {
      isChatOpen: false
    };
  },
  methods: {
    removeToy(toyId) {
      this.$store.dispatch({ type: 'removeToy', id: toyId })
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'filter', filterBy})
    },
  },
  computed: {
    toys() {
      return this.$store.getters.getToys;
    }
  },
  components: {
    toyList,
    toyFilter,
    nicePopup
  }
};
</script>

<style scoped>
  .chat-widget {
    position: fixed;
    right: 10px;
    bottom: 10px;
    background-color: red;
    color: white;
    padding: 20px;

    cursor: pointer;
    border-radius: 50%;
  }

  .chat {
    position: fixed;
    right: 10px;
    bottom: 80px;
    background-color: red;
    color: white;
    padding: 20px;
  }

</style>
