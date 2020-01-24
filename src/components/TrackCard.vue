<template>
  <li class="track-card">
    <div class="track-card__image">
      <img :src="track.artworkUrl" />
    </div>
    <div class="track-card__content">
      <h1>{{ track.title }}</h1>
      <p>{{ track.username }}</p>
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
  }
};
</script>

<style lang="scss" scoped>
.track-card {
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  flex: 0 1 calc(25% - 1em);

  @media (max-width: 768px) {
    flex: 0 1 calc(50% - 1em);
  }

  &__image {
    position: relative;

    & > img {
      max-width: 100%;
      border: 0;
      vertical-align: middle;
    }
  }

  &__content {
    color: #fff;
  }
}
</style>
