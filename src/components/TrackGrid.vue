<template>
  <ul class="track-grid">
    <template v-for="(track, index) in fakeTracks">
      <TrackCard :key="index" :track="track" />
    </template>
  </ul>
</template>

<script>
import TrackCard from "@/components/TrackCard.vue";

import { fakeTransformedData } from "@/fakeData";

export default {
  name: "TrackGrid",
  components: {
    TrackCard
  },
  // props: {
  //   tracks: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data() {
    return {
      fakeTracks: [
        fakeTransformedData,
        fakeTransformedData,
        fakeTransformedData
      ]
    };
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
