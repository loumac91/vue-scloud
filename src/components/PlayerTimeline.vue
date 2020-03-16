<template>
  <div class="player-timeline" @click="handleClick">
    <div class="player-timeline__buffer" :style="getBufferedCss"></div>
    <div class="player-timeline__played" :style="getPlayedCss"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { SET_PLAYER_CURRENT_TIME } from "@/store/action.types";

export default {
  name: "PlayerTimeline",
  computed: {
    ...mapState({
      trackDuration: state => state.player.trackDuration
    }),
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
  },
  methods: {
    handleClick(e) {
      const { currentTarget, pageX } = e;
      const time =
        ((pageX - currentTarget.getBoundingClientRect().left) /
          currentTarget.offsetWidth) *
        this.trackDuration;

      this.seek(time);
    },
    seek(time) {
      this.$store.dispatch(SET_PLAYER_CURRENT_TIME, time);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.player-timeline {
  position: relative;
  width: 100%;
  height: 6px;
  background-color: $player-timeline-color-base;
  cursor: pointer;

  &__buffer,
  &__played {
    height: inherit;
    position: absolute;
  }

  &__buffer {
    background-color: $player-timeline-color-buffer;
  }

  &__played {
    background-color: $player-timeline-color-play;
  }
}
</style>
