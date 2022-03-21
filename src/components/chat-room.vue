<template>
  <section class="chat">
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}: </span>
        {{ msg.txt }}
      </li>
    </ul>
    <form @submit.prevent="sendMsg">
      <input @input="typing" type="text" v-model="msg.txt" placeholder="Type your message.."/>
      <p v-if="isTyping">{{msg.from}} is typing..</p>
      <button>Send</button>
    </form>
  </section>
</template>
 
<script>
import {socketService} from '../services/socket.service';

export default {

  name: 'chat-room',
  props: {
    toy: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      msg: { from: this.$store.getters.loggedinUser?.fullname || 'Guest', txt: '' },
      msgs: [],
      topic: this.toy._id,
      isTyping: false
    };
  },
  created() {
    socketService.setup();
    socketService.emit('chat topic', this.topic)
    socketService.on('chat addMsg', this.addMsg)
    socketService.on('chat test', this.isTyping)
  },
  unmounted() {
    socketService.off('chat addMsg', this.addMsg)
    socketService.off('chat test', this.isTyping)
    // socketService.terminate();
  },
  methods: {
    addMsg(msg) {
      console.log('msg',msg);
      this.msgs.push(msg)
    },
    sendMsg() {
      socketService.emit('chat newMsg', this.msg)
    },
    typing() {
      socketService.emit('chat typing', this.isTyping)
    }
  },
  computed: {
  },
  components: {
  }
};
</script>
 
<style>
</style>