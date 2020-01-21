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
.track-grid {
  display: flex;
  flex-wrap: wrap;
  list-style: none; // no dot or number etc.
  margin: 0;
}
</style>
