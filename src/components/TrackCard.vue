<template>
  <li class="track-card drop-shadow-bottom-right">
    <div class="track-card__image">
      <img :src="track.artworkUrl" />
    </div>
    <div class="track-card__content">
      <p class="track-card__title">{{ track.title }}</p>
      <p class="track-card__username">{{ track.username }}</p>
    </div>
    <div class="track-card__controls">
      <button class="btn btn-icon"><i class="fas fa-play"></i></button>
    </div>
  </li>
</template>

<script>
export default {
  name: "TrackCard",
  props: {
    track: {
      type: Object,
      required: true
    }
  },
  computed: {
    isPlaying() {
      return true;
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

    & > img {
      // border: 0;
      border-radius: 16px 16px 0 0;
      height: auto;
      max-width: 100%;
      vertical-align: middle;
    }
  }

  &__content {
    padding: 8px;
    color: black;
  }
}

.drop-shadow-bottom-right {
  filter: drop-shadow(10px 10px 10px #a6abbd);
}
</style>
