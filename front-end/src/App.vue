<template>
  <v-app>
    <!-- <v-system-bar app dark height="75">
      <v-toolbar-title class="display-1">CHAPPIE</v-toolbar-title>
    </v-system-bar> -->
    <AppHeader />
    <NavigationDrawer />
    <Main />
  </v-app>
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer";
import AppHeader from "@/components/AppHeader";
import Main from "@/components/Main";
import openSocket from "socket.io-client";

export default {
  data() {
    return {
      // socket: io("http://localhost:3000"),
    };
  },
  components: {
    NavigationDrawer,
    AppHeader,
    Main,
  },
  created() {
    openSocket('http://localhost:3000');
  }
};
</script>