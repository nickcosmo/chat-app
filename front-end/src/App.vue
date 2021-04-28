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

export default {
  components: {
    NavigationDrawer,
    AppHeader,
    Main
  },
};
</script>