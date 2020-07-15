<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">douban</router-link> |
      <router-link to="/film">film</router-link> |
      <router-link to="/joke">joke</router-link> |
      <router-link to="/music">music</router-link> |
      <router-link to="/video">video</router-link> |
      <router-link to="/moive">movie</router-link> |
      <router-link to="/viewImg?id=666">viewImage</router-link> |
      <router-link to="/testRender">testRender</router-link> |
      <router-link to="/ball">ball</router-link> |
      <router-link to="/product">product</router-link> |
      <router-link to="/movieTable">movieTable</router-link> |
      <router-link to="/tanmu">tanmu</router-link> |
      <router-link to="/editor">ts</router-link>
    </div>
    <router-view />
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  background: rgba(255, 255, 255, 0.65);
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#effect {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100%;
  cursor: pointer;
  pointer-events: none;
}
</style>
