<template>
  <div class="chat">
    <section class="chat-gallery">
      <div class="post row" v-for="post in posts" :key="post.id">
        <h4>{{post.subject}}</h4>
        <p>{{post.message}}</p>
        <h5>{{post.poster}}</h5>
      </div>
    </section>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: 'Chat',
  data() {
    return {
      posts: [],
    }
  },
  created() {
    this.getPosts();
  },
  methods: {
    async getPosts() {

        let response = await axios.get("/api/posts");
        this.posts = response.data;
        return true;

      }
    },
  };

</script>

<style scoped>

.post {
  margin-top: 15px;
  padding-left: 5px;
  padding-right: 5px;
  border: 1px solid #5BDEFF;
  border: 1px solid #629e3a;
}

.post
h4,
p,
h5 {
  width: 100%;
}

h5 {
  margin-top: -15px;
}

</style>
