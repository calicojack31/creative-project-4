<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img id='site-logo' src="/catfish.png">
      </div>
    </router-link>
    <div class="col-lg">
      <!--Probably add another class after col-lg to make it work better on mobile-->
    <div class="title row">
      <h1>The Catfish Pond</h1>
    </div>
  <!--  <div class="tagline row">
      <p>Be yourself. Or don't.</p>
    </div> -->
  </div>
  </div>
  <div class="content">
    <router-view />
  </div>

<!--
  <div class="footer">
    <router-link to="/admin">Admin</router-link>
  </div>
-->


<h1 class="allow-footer"></h1>
  <footer class="footer">
    <div class="container">
      <div class="row">
          <router-link class="col-sm" to="/home">Go Fishing!</router-link>
          <router-link class="col-sm" to="/pond-admin">Make a Splash!</router-link>
      </div>
      <div class="row">
            <router-link class="col-sm" to="/chat">Read the Chat!</router-link>
            <router-link class="col-sm" to="/chat-admin">Glub it Up!</router-link>
      </div>
      <div class="row">
          <a class="col-sm" href="https://github.com/calicojack31/creative-project-3.git">UPDATE ME GitHub Repository Here</a>
      </div>



    </div>
  </footer>
</div>


</template>

<style>

/*IMPORT A FONT HERE, SEE MY SMASHVUE CODE*/
/*Things after this taken from that code*/

.allow-footer {
  padding-bottom: 30px;
}

html {
  position: relative;
  min-height: 100%;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  margin-top: 100px;
  background-color: #adefff;
  color: #1C454F;
}

/*End of code borrowing for now*/


html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #5BDEFF;
  color: #1C454F;
  /*align-items: center;
  text-align: center;
  justify-content: center;*/
}

.title {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title h1 {
  font-size: 50px;
}

.tagline {
  margin-top: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
/*.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #e3e3e3;
  font-size: 12px;
}*/

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}


#site-logo {
  height: 90px;
  display: flex;
  padding-right: 20px;
}



</style>
