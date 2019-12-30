<template>
  <main class="app-container">
    <h1>Home</h1>
    <button @click="handleClick">getTracks</button>
  </main>
</template>

<script>
export default {
  name: "Home",
  methods: {
    handleClick() {
      this.$store.dispatch("FETCH_TRACKS", "travis orbin");
    }
  }
};
</script>
