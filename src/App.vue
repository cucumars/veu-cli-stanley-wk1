<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/comp-btn-a">元件按鈕A</router-link> |
    <router-link to="/comp-btn-b">元件按鈕B</router-link> |
    <router-link to="/main">教案練習首頁</router-link> |
  </nav>
  <router-view/>
</template>

<style lang="scss">
  *{
      box-sizing: border-box;   
 
  }
  body {     
    background-color: #42b983;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    // color: #2c3e50;
    color: white;
  }

  nav {
    padding: 30px;

    a {
      font-weight: bold;
      // color: #2c3e50;
      color: white;

      &.router-link-exact-active {
        // color: #42b983;
        color: paleturquoise;
      }
    }
  }
</style>
