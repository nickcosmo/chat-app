<template>
  <v-app-bar app class="grey darken-3 white--text">
    <v-app-bar-nav-icon
      class="d-flex d-lg-none"
      v-on:click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>This Channel!</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>