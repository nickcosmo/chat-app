<template>
  <v-footer class="justify-center align-center white--text" height="62">
    <v-avatar rounded color="red" size="45" class="mr-5">
      {{ getUser.abbrev }}
    </v-avatar>
    {{ getUser.name }}
    <v-spacer></v-spacer>
    <v-btn plain icon>
      <v-icon>mdi-chevron-down</v-icon>
    </v-btn>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("user", ["getUser"]),
  },
};
</script>