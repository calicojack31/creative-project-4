<template>
  <div class="admin">
    <h1>Glub it Up!</h1>
    <h5>Say something for the whole pond to see! Or change what someone else said!</h5>

    <div class="row">
      <div class="col-lg">


    <div class="heading">
      <h2>Make a Post!</h2>
    </div>
    <div class="add">
      <div class="form">
      <input v-model="subject" placeholder="Subject">
      <p></p>
      <textarea v-model="message" placeholder="Write your message!"/>
      <p></p>
      <input v-model="poster" placeholder="Who's posting?">
      <p></p>
      <button @click="upload">Post</button>
    </div>
    <div class="upload" v-if="addPost">
      <h2>{{addPost.subject}}</h2>
      <h2>{{addPost.message}}</h2>
      <h2>{{addPost.poster}}</h2>
    </div>
  </div>

  </div>
  <div class="col-lg">

  <div class="heading">
    <h2>Edit/Delete a Post!</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findSubject" placeholder="Search by Subject">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectPost(s)">{{s.subject}}
        </div>
      </div>
    </div>

    <div class="col-lg" v-if="findPost">
    <div class="upload" v-if="findPost">
      <input v-model="findPost.subject">
      <p></p>
      <textarea v-model="findPost.message"/>
      <p></p>
      <input v-model="findPost.poster">
    </div>
    <div class="actions" v-if="findPost">
      <button @click="deletePost(findPost)">Delete</button>
      <button @click="editPost(findPost)">Edit</button>
    </div>
  </div>


  </div>
</div>
</div>
<div class="row footer-protector">
</div>
</div>
</template>









<script>
import axios from 'axios';
export default {
  name: 'ChatAdmin',
  data() {
    return {
      subject: "",
      message: "",
      poster: "",
      addPost: null,
      posts: [],
      findSubject: "",
      findPost: null,
    }
  },
  computed: {
    suggestions() {
      let posts = this.posts.filter(post => post.subject.toLowerCase().startsWith(this.findSubject.toLowerCase()));
      return posts.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getPosts();
  },
  methods: {
    async upload() {

        let r1 = await axios.post('api/posts/', {
          subject: this.subject,
          message: this.message,
          poster: this.poster,
        });
        this.addPost = r1.data;

    },
    async getPosts() {

        let response = await axios.get("/api/posts");
        this.posts = response.data;
        return true;

    },
    selectPost(post) {
      this.findSubject = "";
      this.findPost = post;
    },
    async deletePost(post) {

        await axios.delete("/api/posts/" + post._id);
        this.findPost = null;
        this.getPosts();
        return true;

    },
    async editPost(post) {

        await axios.put("/api/posts/" + post._id, {
          subject: this.findPost.subject,
          message: this.findPost.message,
          poster: this.findPost.poster,
        });
        this.findPost = null;
        this.getPosts();
        return true;

    },
  }
}
</script>

<style scoped>

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  /*margin-left: 10px;*/
}

.add,
.edit {
  display: flex;
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  width: 100%;
}

.form {
  margin-right: 50px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.footer-protector {
  margin-top: 50px;
}

</style>
