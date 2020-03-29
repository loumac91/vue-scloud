<template>
  <div v-if="isInitialised" class="player">
    <PlayerTimeline :track="true" />
    <div class="player-controls">
      <div class="player-controls__buttons">
        <Icon
          :type="'StepBackward'"
          :neumorphic="true"
          @click="handleStepBack"
        />
        <Icon
          :type="getPlayingIcon"
          :neumorphic="true"
          @click="handlePlayPause"
        />
        <Icon
          :type="'StepForward'"
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
        <Icon :type="'Minus'" :neumorphic="true" @click="decreaseVolume" />
        {{ getVolume }}
        <Icon :type="'Plus'" :neumorphic="true" @click="increaseVolume" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Icon from "@/components/Icon.vue";
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
    Icon
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
  display: block;
  height: 100%;
  width: 100%;
  background-color: $base-card-color;
  border-top-left-radius: map-get($radius, "base");
  border-top-right-radius: map-get($radius, "base");
  overflow: hidden;

  transform: translateZ(0);
  animation-name: reveal-player;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-duration: 0.8s;

  &-controls {
    display: flex;
    max-width: 970px;
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
