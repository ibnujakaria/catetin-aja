<template>
  <div class="">
    <div id="header">
      <h1 id="title">Catetin Aja</h1>
      <div id="search">
        <input v-model.trim="$store.state.keyword" placeholder="Cari...">
      </div>
    </div>
    <div style="height: 70px;"></div>
    <router-view></router-view>
    <snackbar></snackbar>
  </div>
</template>

<script>
import Snackbar from './components/Snackbar'
export default {
  name: 'app',
  components: {Snackbar}
}
</script>

<style media="screen">
html {
  font-family: 'Roboto Slab', serif;
}
body{
  padding: 0;
  margin: 0;
  background-color: #e8e8e8;
}
h1 {
  margin: 0;
}
#title {
  color: #000;
  display: inline-block;;
}
#search {
  position: absolute;
  top: 8px;
  right: 50px;
}
#search input {
  background-color: #ffbb00;
  border: none;
  padding: 10px 10px 10px 10px;
}
#header {
  background-color: #ffbb00;
  width: 100%;
  padding: 10px 5px 5px 25px;
  position: fixed;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

#note-create {
  padding: 10px 10px 10px 10px;
  width: 500px;
  margin: auto;
  background-color: #fff;
}
button:hover {
  cursor: pointer;
}
</style>
