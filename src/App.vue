<template>
  <div id="app">
    <header class="v-scloud-header">
      <SearchBar />
    </header>
    <router-view />
    <div class="v-scloud-footer">
      <Player />
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import Player from "@/components/Player.vue";

export default {
  name: "App",
  components: {
    SearchBar,
    Player
  }
};
</script>

<style lang="scss">
@import "@/styles/variables.scss";

#app {
  display: grid;
  grid-template-areas:
    "h h h h h"
    "g1 m m m g2"
    "g1 f f f g2"; // TODO - redundant?
}

.v-scloud-header {
  grid-area: h;
}

.page-container {
  min-width: 368px;
  grid-area: m;
}

.base-fixed-element {
  display: flex;
  width: 100%;
  height: $base-element-height;
}

.v-scloud-header {
  @extend .base-fixed-element;
}

.v-scloud-footer {
  @extend .base-fixed-element;

  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
}
</style>
