<template>
  <article class="card">
    <div class="track-card__image"></div>
    <div class="track-card__content"></div>
    <p>Card</p>
  </article>
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

<style lang="scss" scoped></style>
