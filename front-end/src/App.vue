<template>
  <v-app>
    <!-- <v-system-bar app dark height="75">
      <v-toolbar-title class="display-1">CHAPPIE</v-toolbar-title>
    </v-system-bar> -->
    <router-view></router-view>
  </v-app>
</template>

<script>
import openSocket from "socket.io-client";

export default {
  data() {
    return {
      // socket: io("http://localhost:3000"),
    };
  },

  created() {
    openSocket("http://localhost:3000");
  },
};
</script>