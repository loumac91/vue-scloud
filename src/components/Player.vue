<template>
  <div class="player">
    <div class="player-timeline"></div>
    <div class="player-controls">
      <div class="player-controls__buttons">
        <i class="fas fa-lg fa-step-backward"></i>
        <i :class="['fas fa-lg', 'fa-play']"></i>
        <i class="fas fa-lg fa-step-forward"></i>
      </div>
      <div class="player-controls__time"></div>
      <div class="player-controls__track-title"></div>
      <div class="player-controls__volume"></div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";

export default {
  name: "Player",
  data() {
    return {
      showPlayer: false
    };
  },
  mounted() {
    const t = setTimeout(() => {
      this.showPlayer = true;
      clearInterval(t);
    }, 3000);
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.player {
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 100%;
  min-width: map-get($breakpoints, "xlarge");
  background-color: $dark-grey;
  border-top-left-radius: map-get($radius, "base");
  border-top-right-radius: map-get($radius, "base");
  overflow: hidden;

  &-timeline {
    height: 8px;
    background-color: $blue;
    cursor: pointer;
  }

  &-controls {
    display: flex;
    align-items: center;
    flex: 1;

    &__buttons {
      &:hover i {
        cursor: pointer;
      }

      & i {
        color: white;
      }
    }
  }
}
</style>
