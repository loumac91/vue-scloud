<template>
  <button class="btn" v-on="$listeners">
    <i :class="['fas', getIcon, getSize, getColour]"></i>
  </button>
</template>

<script>
export default {
  name: "Icon",
  props: {
    type: {
      type: String,
      required: true
    },
    large: {
      type: Boolean,
      required: false
    },
    colour: {
      type: String,
      required: false,
      default: "white",
      validator(v) {
        return ["white", "black"].includes(v);
      }
    }
  },
  computed: {
    getIcon() {
      switch (this.type) {
        case "StepBackward":
          return "fa-step-backward";
        case "StepForward":
          return "fa-step-forward";
        case "Play":
          return "fa-play";
        case "Pause":
          return "fa-pause";
        case "Minus":
          return "fa-minus";
        case "Plus":
          return "fa-plus";
        default:
          return null;
      }
    },
    getSize() {
      return this.large ? "fa-lg" : "";
    },
    getColour() {
      return {
        "icon--white": this.colour === "white",
        "icon--black": this.colour === "black"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  outline: none;

  > i {
    padding: 8px;
  }

  .icon {
    &--white {
      color: white;
    }

    &--black {
      color: black;
    }
  }

  &:hover i {
    cursor: pointer;
  }
}
</style>
