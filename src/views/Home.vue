<template>
  <main class="page-container">
    <TrackGrid :tracks="tracks" />
  </main>
</template>

<script>
import { mapState } from "vuex";
import TrackGrid from "@/components/TrackGrid.vue";

export default {
  name: "Home",
  components: {
    TrackGrid
  },
  computed: {
    ...mapState({
      tracks: state => state.track.tracks
    })
  }
};
</script>

<style lang="scss" scoped></style>
