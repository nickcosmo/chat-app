<template>
  <v-app-bar app class="grey darken-3 white--text">
    <v-app-bar-nav-icon
      dark
      class="d-flex d-lg-none"
      v-on:click="showDrawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>{{ channelName | capitalize }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { EventBus } from "../event-bus";
import utilMixin from "@/mixins/util";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  mixins: [utilMixin],
  computed: {
    ...mapGetters("channel", ["getCurrentChannelName"]),
    channelName() {
      if (this.getCurrentChannelName) {
        return this.getCurrentChannelName;
      } else {
        return "";
      }
    },
  },
  methods: {
    showDrawer() {
      EventBus.$emit("showDrawer");
    },
  },
};
</script>