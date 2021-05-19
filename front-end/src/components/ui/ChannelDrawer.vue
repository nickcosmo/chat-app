<template>
  <div>
    <v-app-bar flat class="grey darken-4">
      <v-btn class="grey darken-4 mr-3" small plain icon @click="goBack">
        <v-icon color="white">mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>All Channels</v-toolbar-title>
    </v-app-bar>
    <v-list>
      <p class="px-5 my-5">{{ getCurrentChannel.name | capitalize }}</p>
      <v-list-item-title class="px-5">
        {{ getCurrentChannel.description }}
      </v-list-item-title>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import utilMixin from "@/mixins/util";

export default {
  mixins: [utilMixin],
  data() {
    return {
      mainDrawer: true,
    };
  },
  computed: {
    ...mapGetters("channel", ["getCurrentChannel"]),
  },
  methods: {
    goBack() {
      this.$emit("goBack");
    },
  },
  emits: ["goBack"],
};
</script>
