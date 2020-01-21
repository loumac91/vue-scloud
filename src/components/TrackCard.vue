<template>
  <li class="track-card">
    <div class="track-card__image">
      <img :src="track.artworkUrl" />
    </div>
    <div class="track-card__content">
      <h1>HEADER</h1>
      <p>Lorem ipsum</p>
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
  align-items: center;

  @media (min-width: 768px) {
    width: 50%;
  }

  &__image {
    position: relative;
    height: auto;
  }

  &__content {
    color: #fff;
  }
}
</style>
