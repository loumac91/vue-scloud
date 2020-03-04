<template>
  <div v-if="true || isInitialised" class="player">
    <PlayerTimeline />
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
import { mapGetters } from "vuex";
import PlayerTimeline from "@/components/PlayerTimeline.vue";

export default {
  name: "Player",
  components: {
    PlayerTimeline
  },
  computed: {
    ...mapGetters(["isInitialised", "getBufferedPercent", "getPlayedPercent"]),
    getBufferedCss() {
      return {
        width: this.getBufferedPercent
      };
    },
    getPlayedCss() {
      return {
        width: this.getPlayedPercent
      };
    }
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
  // background-color: $dark-grey;
  background-color: $base-card-color;
  border-top-left-radius: map-get($radius, "base");
  border-top-right-radius: map-get($radius, "base");
  overflow: hidden;

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
