<template>
  <div v-show="isInitialised" class="player">
    <PlayerTimeline :track="true" />
    <div class="player-controls">
      <div class="player-controls__buttons">
        <IconButton
          :icon="'StepBackward'"
          :neumorphic="true"
          @click="handleStepBack"
        />
        <IconButton
          :icon="getPlayingIcon"
          :neumorphic="true"
          @click="handlePlayPause"
        />
        <IconButton
          :icon="'StepForward'"
          :neumorphic="true"
          @click="handleStepForward"
        />
      </div>
      <div v-if="getCurrentTrack" class="player-controls__time">
        {{ getCurrentTime }} / {{ getTrackDuration }}
      </div>
      <div v-if="getCurrentTrack" class="player-controls__track-title">
        {{ trackTitle }}
      </div>
      <div class="player-controls__volume">
        <IconButton
          :icon="'Minus'"
          :neumorphic="true"
          @click="decreaseVolume"
        />
        {{ getVolume }}
        <IconButton :icon="'Plus'" :neumorphic="true" @click="increaseVolume" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import IconButton from "@/components/IconButton.vue";
import PlayerTimeline from "@/components/PlayerTimeline.vue";
import {
  SET_PLAYER_PLAYING,
  SET_PLAYER_PAUSED,
  DECREASE_PLAYER_VOLUME,
  INCREASE_PLAYER_VOLUME,
  LOAD_NEXT_TRACK,
  LOAD_PREVIOUS_TRACK
} from "@/store/action.types";

export default {
  name: "Player",
  components: {
    PlayerTimeline,
    IconButton
  },
  computed: {
    ...mapState({
      trackTitle: state => state.player.title
    }),
    ...mapGetters([
      "isInitialised",
      "getCurrentTrack",
      "getIsPlaying",
      "getIsPaused",
      "getVolume",
      "getCurrentTime",
      "getTrackDuration",
      "getBufferedPercent",
      "getPlayedPercent"
    ]),
    getPlayingIcon() {
      return this.getIsPaused || (!this.getIsPaused && !this.getIsPlaying)
        ? "Play"
        : this.getIsPlaying
        ? "Pause"
        : "";
    },
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
    handleStepBack() {
      this.$store.dispatch(LOAD_PREVIOUS_TRACK);
    },
    handlePlayPause() {
      const playerState = this.getIsPlaying
        ? SET_PLAYER_PAUSED
        : SET_PLAYER_PLAYING;
      this.$store.dispatch(playerState);
    },
    handleStepForward() {
      this.$store.dispatch(LOAD_NEXT_TRACK);
    },
    decreaseVolume() {
      this.$store.dispatch(DECREASE_PLAYER_VOLUME);
    },
    increaseVolume() {
      this.$store.dispatch(INCREASE_PLAYER_VOLUME);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

@keyframes reveal-player {
  0% {
    bottom: -70px;
  }
  100% {
    bottom: 0px;
  }
}

.player {
  width: 100%;
  background-color: $base-card-color;
  border-top-left-radius: map-get($radius, "base");
  border-top-right-radius: map-get($radius, "base");
  overflow: hidden;
  animation-name: reveal-player;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-duration: 0.8s;

  &-controls {
    display: flex;
    max-width: $base-max-width;
    margin: 0 auto;
    align-items: center;
    padding-top: 8px;
    flex: 1;

    > * {
      padding: 8px;
    }

    &__track-title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: normal;
      white-space: nowrap;
    }

    &____volume {
      align-self: flex-end;
    }
  }
}
</style>
