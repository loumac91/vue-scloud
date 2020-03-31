<template>
  <button :type="type" :class="['btn', getButtonCss]" v-on="$listeners">
    <i :class="['fas', getIcon, getSize, getColour]"></i>
  </button>
</template>

<script>
export default {
  name: "Icon",
  props: {
    icon: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: ""
    },
    large: {
      type: Boolean,
      required: false
    },
    neumorphic: {
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
    getButtonCss() {
      return this.neumorphic ? "btn--neumorphic" : "";
    },
    getIcon() {
      switch (this.icon) {
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
        case "Search":
          return "fa-search";
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
@import "@/styles/variables.scss";

.btn {
  background: inherit;
  color: inherit;
  border: none;
  padding: 0;
  outline: none;

  &--neumorphic {
    border-radius: 8px;
    background: #cdcfda;
    box-shadow: 11px 11px 23px #c7c9d3, -11px -11px 23px #d3d5e1;

    &:hover {
      border-radius: 8px;
      background: linear-gradient(145deg, #dbdde9, #b9bac4);
      box-shadow: 11px 11px 23px #c7c9d3, -11px -11px 23px #d3d5e1;
    }

    &:active {
      border-radius: 8px;
      background: #cdcfda;
      box-shadow: inset 11px 11px 23px #c7c9d3, inset -11px -11px 23px #d3d5e1;
    }
  }

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
