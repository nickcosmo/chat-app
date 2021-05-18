<template>
  <div>
    <v-navigation-drawer
      v-if="!selectedChannel"
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
            <v-btn class="grey darken-3" small plain v-bind="attrs" v-on="on">
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

      <v-text-field
        label="Search"
        v-model="searchString"
        outlined
        clearable
        class="mx-3 mt-3"
        prepend-inner-icon="mdi-magnify"
        dense
        @click:prepend-inner="pushSearchChannels"
      >
      </v-text-field>

      <v-list v-if="getSearchChannels.length > 0">
        <v-list-item-title class="pl-4"> Search Results </v-list-item-title>
        <v-list-item
          v-for="searchChannel in getSearchChannels"
          :key="searchChannel._id"
        >
          <v-list-item-title>
            {{ searchChannel.name | capitalize }}
          </v-list-item-title>
          <v-list-item-action>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="grey"
                  class="darken-3"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  large
                  @click="pushAddChannel(searchChannel._id, searchChannel.name)"
                >
                  <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>
              </template>
              <span>Add Channel</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-list v-else>
        <v-list-item-group>
          <v-list-item v-for="channel in getUser.channels" :key="channel._id">
            <v-list-item-icon>
              <v-avatar color="grey" class="darken-3" size="32" rounded>
                {{ channel.name | abbreviation }}
              </v-avatar>
            </v-list-item-icon>
            <v-list-item-title @click="selectChannel(channel._id)">
              {{ channel.name | capitalize }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- <v-spacer></v-spacer> -->
      <template v-slot:append>
        <UserFooter />
      </template>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-if="selectedChannel"
      v-model="mainDrawer"
      app
      dark
      class="grey darken-4"
    >
      <v-app-bar flat class="grey darken-4">
        <v-btn
          class="grey darken-4 mr-3"
          small
          plain
          icon
          @click="selectedChannel = !selectedChannel"
        >
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
      <template v-slot:append>
        <UserFooter />
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { EventBus } from "../event-bus";
import utilMixin from "../mixins/util";
import UserFooter from "./UserFooter.vue";

export default {
  mixins: [utilMixin],
  components: {
    UserFooter,
  },
  data() {
    return {
      mainDrawer: true,
      channelDrawer: true,
      dialog: false,
      selectedChannel: null,
      newChannelName: null,
      newChannelDesc: null,
      searchString: null,
    };
  },
  computed: {
    ...mapGetters("channel", [
      "getCurrentChannel",
      "getChannels",
      "getSearchChannels",
    ]),
    ...mapGetters("user", ["getUserId", "getUser"]),
    pageHeight() {
      return document.body.scrollHeight;
    },
  },
  watch: {
    searchString: function (newString) {
      if (newString == "" || newString == null) {
        this.$store.commit("channel/CLEAR_SEARCH_CHANNELS");
      }
    },
  },
  methods: {
    // TODO remove read ref?
    ...mapActions("channel", [
      "read",
      "create",
      "getMessages",
      "searchChannels",
    ]),
    ...mapActions("user", ["addChannel"]),
    ...mapMutations("channel", ["REMOVE_CURRENT_CHANNEL"]),
    async postChannel() {
      const payload = {
        userId: this.getUserId,
        description: this.newChannelDesc,
        name: this.newChannelName,
      };
      await this.create(payload);
    },
    async selectChannel(id) {
      // this.getSelectedChannel(id);
      try {
        await this.getMessages(id);
        this.selectedChannel = true;
        this.$vuetify.goTo(this.pageHeight);
      } catch (err) {
        console.log(err);
      }
    },
    removeCurrentChannel() {
      this.selectedChannel = false;
      this.REMOVE_CURRENT_CHANNEL();
    },
    // getSelectedChannel(id) {
    //   const channel = this.getChannels.filter((channel) => channel._id === id);
    //   this.selectedChannel = channel[0];
    // },
    async pushSearchChannels() {
      await this.searchChannels({ string: this.searchString });
    },
    async pushAddChannel(channelId, channelName) {
      const userName = this.getUser.name;
      const userId = this.getUser._id;
      const data = {
        userName: userName,
        userId: userId,
        channelName: channelName,
        channelId: channelId,
      };
      await this.addChannel(data);
      this.searchString = null;
    },
  },
  async created() {
    // TODO remove?
    // await this.read();

    if (
      this.$vuetify.breakpoint.name == "xs" ||
      this.$vuetify.breakpoint.name == "sm" ||
      this.$vuetify.breakpoint.name == "md"
    ) {
      this.mainDrawer = false;
    }

    EventBus.$on("showDrawer", () => {
      this.mainDrawer = !this.mainDrawer;
    });
  },
};
</script>