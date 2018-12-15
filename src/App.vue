<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">douban</router-link>|
      <router-link to="/film">film</router-link>|
      <router-link to="/joke">joke</router-link>|
      <router-link to="/music">music</router-link>|
      <router-link to="/video">video</router-link>|
      <router-link to="/moive">movie</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
