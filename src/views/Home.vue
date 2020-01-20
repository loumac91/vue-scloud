<template>
  <div>
    <h1>Home</h1>
    <button @click="handleClick">getTracks</button>
    <div class="card">
      <h1>Hello Vorld</h1>
    </div>
    <TrackGrid />
  </div>
</template>

<script>
import TrackGrid from "@/components/TrackGrid.vue";

export default {
  name: "Home",
  components: {
    TrackGrid
  },
  methods: {
    handleClick() {
      this.$store.dispatch("FETCH_TRACKS", "TRAVIS ORBIN");
    }
  }
};
</script>

<style lang="scss" scoped></style>
