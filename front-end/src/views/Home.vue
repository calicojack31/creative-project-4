<template>
  <div class="home">
    <section class="image-gallery row">
      <div class="image col-md" v-for="item in items" :key="item.id">
        <h4>{{item.title}}</h4>
        <h5>{{item.asl}}</h5>
        <h5>{{item.contact}}</h5>
        <p>{{item.description}}</p>
        <img :src="item.path" />

      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        this.sendStatus(500);
      }
    },
  },
}
</script>


<style scoped>
.image h2 {
  font-style: italic;
}

p {
  font-size: 0.85em;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  /*display: inline-block;*/
  width: 100%;
  min-width: 275px;
  /*border: 1px solid #5BDEFF;*/
}

.image img {
  display: block;
  width: 100%;
  height: auto;
}

.image h5 {
  margin-top: -10px;
}

.image p {
  margin-top: -5px;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
