<template>
  <div>
    <v-app-bar flat class="grey darken-4">
      <v-btn class="grey darken-4 mr-3" small plain icon @click="goBack">
        <v-icon color="white">mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>All Channels</v-toolbar-title>
    </v-app-bar>
    <v-list>
      <p class="pl-4 my-5">{{ getCurrentChannel.name | capitalize }}</p>
      <v-list-item-title class="px-4">
        {{ getCurrentChannel.description }}
      </v-list-item-title>
      <v-divider class="my-8 mx-4"></v-divider>
      <v-list-item-title class="pl-4">MEMBERS</v-list-item-title>
      <v-list-item
        v-for="member in getCurrentChannel.members"
        :key="member._id"
      >
        <v-list-item-icon>
          <v-avatar color="grey" class="darken-3" size="32" rounded>
            {{ member.name | abbreviation }}
          </v-avatar>
        </v-list-item-icon>
        <v-list-item-title>
          {{ member.name | capitalize }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import utilMixin from "@/mixins/util";

export default {
  mixins: [utilMixin],
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
