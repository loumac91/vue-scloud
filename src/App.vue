<template>
  <div id="app">
    <header class="header">
      <div class="navigation">
        <div class="navigation-layout">
          <div class="navigation-layout__left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              class="logo-container"
            >
              <path
                class="st0"
                d="M111.9 61.7h-6v-.5c0-23.1-18.8-41.9-41.9-41.9S22.1 38 22.1 61.1v.5h-6C7.8 61.7 1 68.4 1 76.8v16.9c0 8.3 6.8 15.1 15.1 15.1h8.5c1.4 0 2.5-1.1 2.5-2.5V61.1c0-20.4 16.6-36.9 36.9-36.9s36.9 16.6 36.9 36.9V106.2c0 1.4 1.1 2.5 2.5 2.5h8.5c8.3 0 15.1-6.8 15.1-15.1V76.8c0-8.4-6.8-15.1-15.1-15.1z"
              />
              <path
                class="st0"
                d="M41.8 73c-1.4 0-2.5 1.1-2.5 2.5V103c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V75.4c-.1-1.3-1.2-2.4-2.5-2.4zM52.9 80.6c-1.4 0-2.5 1.1-2.5 2.5V103c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V83.1c-.1-1.4-1.2-2.5-2.5-2.5zM64 65.5c-1.4 0-2.5 1.1-2.5 2.5v35c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V67.9c0-1.3-1.1-2.4-2.5-2.4zM75.1 76.6c-1.4 0-2.5 1.1-2.5 2.5v24c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V79c0-1.3-1.1-2.4-2.5-2.4zM86.2 85.2c-1.4 0-2.5 1.1-2.5 2.5V103c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V87.7c0-1.4-1.1-2.5-2.5-2.5z"
              />
            </svg>
          </div>
          <div class="navigation-layout__right">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
    <div class="page-container">
      <router-view />
    </div>
    <footer class="footer">
      <Player />
    </footer>
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
  width: 100%;
  background-color: $base-card-color;
}

.base-fixed-element {
  display: flex;
  width: 100%;
  height: $base-element-height;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
}

.header {
  @extend .base-fixed-element;
  background-color: inherit;
  top: 0;

  .navigation {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;

    &-layout {
      display: flex;
      max-width: $base-max-width;
      margin: 0 auto;
      align-items: center;
      flex: 1;

      .logo-container {
        width: 60px;
        height: 60px;
        margin: 0 16px;
      }

      &__left {
        display: flex;
        align-items: center;
        justify-self: flex-start;
      }

      &__right {
        display: flex;
        align-items: center;
        padding-top: 8px;
        flex: 1;
        flex-basis: 0;
        justify-self: flex-end;
      }
    }
  }
}

.page-container {
  margin-top: 80px;
  width: 100%;
}

.footer {
  @extend .base-fixed-element;
  bottom: 0;
}
</style>
