<template>
  <ul class="track-grid">
    <template v-for="(track, index) in tracks">
      <TrackCard :key="index" :track="track" />
    </template>
  </ul>
</template>

<script>
import TrackCard from "@/components/TrackCard.vue";

export default {
  name: "TrackGrid",
  components: {
    TrackCard
  },
  props: {
    tracks: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.track-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax($min-card-width, 1fr));
  grid-gap: 12px;
  width: 100%;
  padding: 0 8px;
}
</style>
