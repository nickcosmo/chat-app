<template>
  <v-app>
    <!-- <v-system-bar app dark height="75">
      <v-toolbar-title class="display-1">CHAPPIE</v-toolbar-title>
    </v-system-bar> -->
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("user", ["tryLogin"]),
  },
  created() {
    // TODO for auto login
    // this.tryLogin();
  },
};
</script>