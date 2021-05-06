<template>
  <!-- <v-system-bar app dark height="75">
      <v-toolbar-title class="display-1">CHAPPIE</v-toolbar-title>
    </v-system-bar> -->
  <v-main class="d-flex align-end grey darken-3">
    <AppHeader />
    <NavigationDrawer />
    <Chat />
  </v-main>
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer";
import AppHeader from "@/components/AppHeader";
import Chat from "@/components/Chat";
export default {
  components: {
    NavigationDrawer,
    AppHeader,
    Chat,
  },
};
</script>