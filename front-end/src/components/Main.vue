<template>
  <v-main class="d-flex align-end grey darken-3">
    <AppHeader />
    <NavigationDrawer />
    <Chat />
  </v-main>
</template>

<script>
import NavigationDrawer from "@/components/ui/NavigationDrawer";
import AppHeader from "@/components/ui/AppHeader";
import Chat from "@/components/ui/Chat";
export default {
  components: {
    NavigationDrawer,
    AppHeader,
    Chat,
  },
};
</script>