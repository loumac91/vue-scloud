<template>
  <div id="app">
    <Header />
    <main class="page-container">
      <router-view />
    </main>
    <Player />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Player from "@/components/Player.vue";

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
    "h h h h h"
    "g1 m m m g2"
    "f f f f f"; // TODO - redundant?
}

.page-container {
  min-width: 368px;
  max-width: 1272px;
  grid-area: m;
}
</style>
