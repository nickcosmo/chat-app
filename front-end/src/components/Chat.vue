<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-list dark class="grey darken-3">
          <v-list-item
            two-line
            v-for="message in getChannelMessages"
            :key="message._id"
            class="grey darken-3 my-2"
          >
            <!-- <v-divider dark></v-divider> -->
            <v-list-item-avatar
              rounded
              color="red"
              size="42"
              class="justify-center"
            >
              {{ message.userName | abbreviation }}
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle>
                <span class="text-subtitle-1">
                  {{ message.userName }}
                </span>
                <span class="ml-3">
                  {{ message.date }}
                </span>
              </v-list-item-subtitle>
              <v-list-item-title class="mt-1">
                {{ message.body }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-footer class="grey darken-3 px-15 pb-15" app inset height="82">
      <v-text-field
        background-color="grey darken-1"
        class="grey--text text--lighten-1"
        flat
        hide-details
        solo
        placeholder="type message"
        v-model="textInput"
      >
        <template v-slot:append>
          <v-btn class="ml-3 blue" @click="pushMessage">
            <v-icon color="white">mdi-send</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-footer>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import utilMixin from "@/mixins/util";
import socket from "@/socket";

export default {
  mixins: [utilMixin],
  data() {
    return {
      textInput: null,
    };
  },
  computed: {
    ...mapGetters("channel", ["getChannelMessages", "getCurrentChannel"]),
    ...mapGetters("user", ["getUser"]),
    pageHeight() {
      return document.body.scrollHeight;
    },
  },
  methods: {
    ...mapMutations("channel", ["ADD_CHANNEL", "ADD_MESSAGE"]),
    ...mapActions("channel", ["postMessage"]),
    pushMessage() {
      this.postMessage({
        channelId: this.getCurrentChannel._id,
        body: this.textInput,
        userId: this.getUser._id,
        userName: this.getUser.name,
        date: new Date(),
      });
    },
  },
  created() {
    this.$vuetify.goTo(this.pageHeight);

    // init socket listeners
    socket.connect();

    socket.on("newMessage", (payload) => {
      if (payload.success) {
        const message = payload.message[0];
        message.date = new Date(message.date);
        this.ADD_MESSAGE(message);
        this.$vuetify.goTo(this.pageHeight);
      }
    });
  },
  destroyed() {
    // turn socket listeners off!
    socket.off("newMessage");
    socket.disconnect();
  },
};
</script>