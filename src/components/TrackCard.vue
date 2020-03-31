<template>
  <li class="track-card">
    <div class="track-card__image" @click="handleClick">
      <img :src="getArtWorkUrl" @error="handleImgError" />
      <div v-if="track.streamable" class="track-card__overlay-container">
        <IconButton :icon="getPlayingIcon" :large="true" :colour="'black'" />
      </div>
    </div>
    <PlayerTimeline :track="isCurrentTrack" />
    <div class="track-card__content">
      <p class="track-card__title">{{ track.title }}</p>
      <p class="track-card__username">{{ track.username }}</p>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
import IconButton from "@/components/IconButton.vue";
import PlayerTimeline from "@/components/PlayerTimeline.vue";
import {
  LOAD_PLAYER,
  SET_PLAYER_PLAYING,
  SET_PLAYER_PAUSED
} from "@/store/action.types";

export default {
  name: "TrackCard",
  components: {
    PlayerTimeline,
    IconButton
  },
  props: {
    track: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      override: false,
      backUpImage: require("@/assets/404_image.png")
    };
  },
  computed: {
    ...mapGetters(["getIsPlaying", "getIsPaused"]),
    isCurrentTrack() {
      return this.$store.getters.isCurrentTrack(this.track);
    },
    getPlayingIcon() {
      const showPlay =
        !this.isCurrentTrack || (this.isCurrentTrack && !this.getIsPlaying);
      const showPause = this.isCurrentTrack && this.getIsPlaying;

      return showPlay ? "Play" : showPause ? "Pause" : "";
    },
    getArtWorkUrl() {
      return this.override
        ? this.backUpImage
        : this.track.artworkUrl ?? this.backUpImage;
    }
  },
  methods: {
    handleClick() {
      if (this.isCurrentTrack && this.getIsPlaying) {
        return this.$store.dispatch(SET_PLAYER_PAUSED);
      } else if (this.isCurrentTrack && this.getIsPaused) {
        return this.$store.dispatch(SET_PLAYER_PLAYING);
      }

      this.$store.dispatch(LOAD_PLAYER, this.track);
    },
    handleImgError() {
      this.override = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.track-card {
  display: flex;
  flex-direction: column;
  border-radius: map-get($radius, heavy);
  // background-color: $base-card-color;
  background: linear-gradient(145deg, #d4d5d9, #fdfeff);
  box-shadow: 20px 20px 60px #c9c9cd, -20px -20px 60px #ffffff;

  &__image {
    position: relative;
    height: auto;

    &:hover img {
      opacity: 0.4;
    }

    &:hover .track-card__overlay-container {
      opacity: 1;
    }

    &:hover img,
    .track-card__overlay-container {
      cursor: pointer;
    }

    & > img {
      border-radius: map-get($radius, heavy) map-get($radius, heavy) 0 0;
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
</style>
