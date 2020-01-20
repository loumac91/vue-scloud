<template>
  <li class="track-card">
    <div class="track-card__image">
      <img :src="track.artworkUrl" />
    </div>
    <div class="track-card__content"></div>
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
  mounted() {
    console.log("t", this.track);
  }
};
</script>

<style lang="scss" scoped>
.track-card {
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 50%;
  }

  &__image {
    position: relative;
    height: auto;
    background: #fff;
  }
}
</style>
