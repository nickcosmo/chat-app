<template>
  <v-app>
    <Snackbar />
    <!-- <v-system-bar app dark height="75">
      <v-toolbar-title class="display-1">CHAPPIE</v-toolbar-title>
    </v-system-bar> -->
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import Snackbar from "@/components/ui/Snackbar";

export default {
  components: {
    Snackbar,
  },
  methods: {
    ...mapActions("user", ["tryLogin"]),
  },
  created() {
    // TODO auto login init
    // this.tryLogin();
  },
};
</script>