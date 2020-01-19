<template>
  <div>
    <h1>Home</h1>
    <button @click="handleClick">getTracks</button>
    <div class="card">
      <h1>Hello Vorld</h1>
    </div>
    <TrackCard :track="track" />
  </div>
</template>

<script>
import TrackCard from "@/components/TrackCard.vue";

import { fakeApiResponse } from "@/fakeData";

export default {
  name: "Home",
  components: {
    TrackCard
  },
  data() {
    return {
      track: fakeApiResponse
    };
  },
  methods: {
    handleClick() {
      this.$store.dispatch("FETCH_TRACKS", "travis orbin");
    }
  }
};
</script>

<style lang="scss" scoped></style>
