<template>
  <v-footer class="justify-center align-center white--text" height="62">
    <v-avatar rounded color="red" size="45" class="mr-5">
      {{ getUser.name | abbreviation }}
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
import utilMixin from "@/mixins/util";

export default {
  mixins: [utilMixin],
  computed: {
    ...mapGetters("user", ["getUser"]),
  },
};
</script>