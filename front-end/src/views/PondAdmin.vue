<template>
<div class="admin">
  <h1>Make a Splash!</h1>
  <h5>As something of a case study in anarchy, you have the option to register and modify
     the information of not just yourself, but anybody!</h5>
     <div class="row">
       <div class="col-lg">
<div class="heading">
  <!--<div class="circle">1</div>-->
  <h2>Sign Someone Up!</h2>
</div>
<div class="add">
  <div class="form">
    <input v-model="title" placeholder="Name">
    <p></p>
    <input v-model="asl" placeholder="Age / Sex / Location">
    <p></p>
    <input v-model="contact" placeholder="How to Contact">
    <p></p>
    <textarea v-model="description" placeholder="Tell us about this person!"/>
    <p></p>
    <input type="file" name="photo" @change="fileChanged">
    <p></p>
    <button @click="upload">Upload</button>
  </div>
  <div class="upload" v-if="addItem">
    <h2>{{addItem.title}}</h2>
    <h2>{{addItem.asl}}</h2>
    <h2>{{addItem.contact}}</h2>
    <p>{{addItem.description}}</p>
    <img :src="addItem.path" />
  </div>
</div>
</div>
<div class="col-lg">
<div class="heading">
<!--  <div class="circle">2</div>  -->
  <h2>Edit/Delete Someone!</h2>
</div>
<div class="edit">
  <div class="form">
    <input v-model="findTitle" placeholder="Search by Name">
    <div class="suggestions" v-if="suggestions.length > 0">
      <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
      </div>
    </div>
  </div>
  <div class="upload" v-if="findItem">
    <input v-model="findItem.title">
    <p></p>
    <input v-model="findItem.asl">
    <p></p>
    <input v-model="findItem.contact">
    <p></p>
    <textarea v-model="findItem.description"/>
    <p></p>
    <img :src="findItem.path" />
  </div>
  <div class="actions" v-if="findItem">
    <button @click="deleteItem(findItem)">Delete</button>
    <button @click="editItem(findItem)">Edit</button>
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
  name: 'PondAdmin',
  data() {
    return {
      title: "",
      asl: "",
      contact: "",
      description: "",
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },
  computed: {
  suggestions() {
    let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    return items.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {

        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          asl: this.asl,
          contact: this.contact,
          description: this.description,
          path: r1.data.path
        });
        this.addItem = r2.data;

    },
    async getItems() {

        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;

    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {

        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;

    },
    async editItem(item) {

        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          asl: this.findItem.asl,
          contact: this.findItem.contact,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;

    },
  }
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

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

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
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

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
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
