<template>
  <v-app-bar app class="grey darken-3 white--text">
    <v-app-bar-nav-icon
      class="d-flex d-lg-none"
      v-on:click="showDrawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>This Channel!</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { EventBus } from "../event-bus";

export default {
  data() {
    return {};
  },
  methods: {
    showDrawer() {
      EventBus.$emit('showDrawer');
    }
  }
};
</script>