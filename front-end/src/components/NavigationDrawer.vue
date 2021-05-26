<template>
  <div>
    <v-navigation-drawer v-model="mainDrawer" app dark class="grey darken-4">
      <div v-if="!selectedChannel">
        <v-app-bar flat class="grey darken-4">
          <v-toolbar-title>Channels</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="grey darken-3" small plain v-bind="attrs" v-on="on">
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            </template>

            <ChannelModal @postChannel="postChannel" :status="dialog" />
          </v-dialog>
        </v-app-bar>

        <div>
          <SearchChannels :status="mainDrawer" />
        </div>

        <v-list v-if="getSearchChannels.length === 0">
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
      </div>

      <ChannelDrawer
        v-if="selectedChannel"
        @goBack="selectedChannel = !selectedChannel"
      />
      <template v-slot:append>
        <UserFooter />
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { EventBus } from "../event-bus";
import utilMixin from "../mixins/util";
import UserFooter from "./ui/UserFooter";
import ChannelModal from "./ui/ChannelModal";
import ChannelDrawer from "./ui/ChannelDrawer";
import SearchChannels from "./ui/SearchChannels";

export default {
  mixins: [utilMixin],
  components: {
    UserFooter,
    ChannelModal,
    ChannelDrawer,
    SearchChannels,
  },
  data() {
    return {
      mainDrawer: true,
      dialog: false,
      selectedChannel: null,
    };
  },
  computed: {
    ...mapGetters("channel", ["getSearchChannels"]),
    ...mapGetters("user", ["getUserId", "getUser"]),
    pageHeight() {
      return document.body.scrollHeight;
    },
  },
  methods: {
    // TODO remove read ref?
    ...mapActions("channel", ["create", "getMessages"]),
    ...mapActions("user", ["addChannel"]),
    async postChannel(channel) {
      const payload = {
        userId: this.getUserId,
        userName: this.getUser.name,
        description: channel[1],
        name: channel[0],
      };
      const response = await this.create(payload);
      EventBus.$emit("showSnackbar", response);
      this.dialog = false;
    },
    async selectChannel(id) {
      try {
        await this.getMessages(id);
        this.selectedChannel = true;
        this.$vuetify.goTo(this.pageHeight);
      } catch (err) {
        console.log(err);
      }
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