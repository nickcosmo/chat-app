<template>
  <div>
    <v-navigation-drawer
      v-if="!selectChannel"
      v-model="mainDrawer"
      app
      dark
      class="grey darken-4"
    >
      <v-app-bar flat class="grey darken-4">
        <v-toolbar-title>Channels</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="grey darken-3" v-bind="attrs" v-on="on">
              <v-icon color="white">mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-card class="pa-4" dark>
            <v-card-title>NEW CHANNEL</v-card-title>
            <v-text-field
              class="px-4"
              outlined
              placeholder="Channel Name"
              v-model="newChannelName"
            ></v-text-field>
            <v-textarea
              class="px-4"
              outlined
              placeholder="Channel Description"
              v-model="newChannelDesc"
            ></v-textarea>
            <div class="px-4">
              <v-btn class="blue" @click="postChannel">Save</v-btn>
            </div>
          </v-card>
        </v-dialog>
      </v-app-bar>

      <v-list>
        <v-list-item-group>
          <v-list-item v-for="channel in getChannels" :key="channel._id">
            <v-list-item-title
              @click="
                selectChannel = !selectChannel;
                getSelectedChannel(channel._id);
              "
            >
              {{ channel.name | capitalize }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-if="selectChannel"
      v-model="channelDrawer"
      app
      dark
      class="grey darken-4"
    >
      <v-app-bar flat class="grey darken-4">
        <v-toolbar-title>All Channels</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="grey darken-3" @click="selectChannel = !selectChannel"
          ><v-icon color="white">mdi-arrow-left</v-icon></v-btn
        >
      </v-app-bar>
      <v-list>
        <p class="px-5 mb-5">{{ selectedChannel.name | capitalize }}</p>
        <v-list-item-title class="px-5">{{
          selectedChannel.description
        }}</v-list-item-title>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { EventBus } from "../event-bus";
import utilMixin from "../mixins/util";

export default {
  mixins: [utilMixin],
  data() {
    return {
      mainDrawer: true,
      channelDrawer: true,
      dialog: false,
      selectChannel: false,
      selectedChannel: null,
      newChannelName: null,
      newChannelDesc: null,
    };
  },
  computed: {
    ...mapGetters("channel", ["getChannels"]),
    ...mapGetters("user", ["getUserId"]),
  },
  methods: {
    ...mapActions("channel", ["read", "create"]),
    async postChannel() {
      const payload = {
        userId: this.getUserId,
        description: this.newChannelDesc,
        name: this.newChannelName,
      };
      await this.create(payload);
    },
    getSelectedChannel(id) {
      const channel = this.getChannels.filter((channel) => channel._id === id);
      this.selectedChannel = channel[0];
    },
  },
  async created() {
    await this.read();

    if (
      this.$vuetify.breakpoint.name == "xs" ||
      this.$vuetify.breakpoint.name == "sm"
    ) {
      this.mainDrawer = false;
    }

    EventBus.$on("showDrawer", () => {
      this.mainDrawer = !this.mainDrawer;
    });
  },
};
</script>