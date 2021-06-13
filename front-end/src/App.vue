<template>
  <v-app>
    <Snackbar />
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
};
</script>