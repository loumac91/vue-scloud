<template>
  <div id="app">
    <Header />
    <main class="app-container">
      <router-view />
    </main>
    <Player />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Player from "./components/Player.vue";

export default {
  name: "App",
  components: {
    Header,
    Player
  }
};
</script>

<style lang="scss">
#app {
  display: grid;
  grid-template-areas:
    "h h h"
    "m m m"
    "f f f"; // TODO - redundant?
}

.app-container {
  grid-area: m;
}
</style>
