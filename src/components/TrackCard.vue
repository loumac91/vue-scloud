<template>
  <li class="track-card drop-shadow--bottom-right">
    <div class="track-card__image" @click="handleClick">
      <img :src="track.artworkUrl" />
      <div v-if="track.streamable" class="track-card__overlay-container">
        <i :class="['fas fa-lg', getIcon]"></i>
      </div>
    </div>
    <div class="track-card__content">
      <p class="track-card__title">{{ track.title }}</p>
      <p class="track-card__username">{{ track.username }}</p>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
import {
  LOAD_PLAYER,
  SET_PLAYER_PLAYING,
  SET_PLAYER_PAUSED
} from "@/store/action.types";
import { PLAYING, PAUSED } from "@/constants";

export default {
  name: "TrackCard",
  props: {
    track: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      playerState: "getPlayerState"
    }),
    isCurrentTrack() {
      return this.$store.getters.isCurrentTrack(this.track);
    },
    isPlaying() {
      return this.playerState === PLAYING;
    },
    isPaused() {
      return this.playerState === PAUSED;
    },
    getIcon() {
      const showPlay =
        !this.isCurrentTrack || (this.isCurrentTrack && !this.isPlaying);
      const showPause = this.isCurrentTrack && this.isPlaying;

      return {
        "fa-play": showPlay,
        "fa-pause": showPause
      };
    }
  },
  methods: {
    handleClick() {
      // TODO debounce
      if (this.isCurrentTrack && this.isPlaying) {
        return this.$store.dispatch(SET_PLAYER_PAUSED);
      } else if (this.isCurrentTrack && this.isPaused) {
        return this.$store.dispatch(SET_PLAYER_PLAYING);
      }

      this.$store.dispatch(LOAD_PLAYER, this.track);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.track-card {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  flex: 0 1 calc(25% - 1em);
  background-color: $base-card-color;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex: 0 1 calc(50% - 1em);
  }

  &__image {
    position: relative;
    height: auto;

    &:hover img {
      opacity: 0.4;
      cursor: pointer;
    }

    &:hover .track-card__overlay-container {
      opacity: 1;
    }

    & > img {
      border-radius: 16px 16px 0 0;
      height: auto;
      max-width: 100%;
      vertical-align: middle;
    }

    > .track-card__overlay-container {
      transition: 0.5s ease;
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__content {
    padding: 8px;
    color: black;
  }
}

.drop-shadow--bottom-right {
  filter: drop-shadow(10px 10px 10px #a6abbd);
}
</style>
