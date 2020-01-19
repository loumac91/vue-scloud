<template>
  <div>
    <h1>Home</h1>
    <button @click="handleClick">getTracks</button>
    <div class="card">
      <h1>Hello Vorld</h1>
    </div>
  </div>
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

<style lang="scss" scoped></style>
