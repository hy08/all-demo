<template>
  <div id="app">
    <h1>system1-module1</h1>
    <img src="./assets/welcome.png" />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {
    console.log("system1-module1 created");
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
