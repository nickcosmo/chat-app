<template>
  <v-container id="container" class="chatContainer">
    <v-row class="d-flex justify-center">
      <v-col class="col-12 col-md-10">
        <v-list dark class="grey darken-3">
          <div class="d-flex justify-center">
            <v-progress-circular
              indeterminate
              color="grey darken-4"
              v-if="paginationRequest"
            ></v-progress-circular>
          </div>
          <v-list-item
            two-line
            v-for="message in getChannelMessages"
            :key="message._id"
            class="grey darken-3 my-2"
          >
            <v-list-item-avatar
              rounded
              :color="avatarColor(message.userId)"
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
                  {{ message.date | toDate }}
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
    <validation-observer ref="chatObserver">
      <validation-provider v-slot="{ errors }" rules="required">
        <v-footer class="grey darken-3 pb-15" app inset height="82">
          <v-row class="d-flex justify-center">
            <v-col class="col-12 col-md-10">
              <v-form ref="messageForm">
                <v-text-field
                  :error-messages="errors"
                  background-color="grey darken-1"
                  class="grey--text text--lighten-1"
                  flat
                  solo
                  placeholder="type message"
                  v-model="textInput"
                  clearable
                >
                  <template v-slot:append>
                    <v-btn class="ml-3 blue" @click="pushMessage">
                      <v-icon color="white">mdi-send</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-form>
            </v-col>
          </v-row>
        </v-footer>
      </validation-provider>
    </validation-observer>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import utilMixin from "@/mixins/util";
import socket from "@/socket";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  mixins: [utilMixin],
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      textInput: null,
      paginationRequest: false,
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
    ...mapActions("channel", ["postMessage", "getPaginatedMessages"]),
    async pushMessage() {
      if (await this.$refs.chatObserver.validate()) {
        await this.postMessage({
          channelId: this.getCurrentChannel._id,
          body: this.textInput,
          userId: this.getUser._id,
          userName: this.getUser.name,
          date: new Date(),
        });
        this.$refs.messageForm.reset();
      }
    },
    async paginateMessages() {
      this.paginationRequest = true;
      await this.getPaginatedMessages(this.getCurrentChannel._id);
      this.paginationRequest = false;
    },
    scrollTrigger() {
      if (document.documentElement.scrollTop === 0) {
        this.paginateMessages();
      }
    },
    avatarColor(userId) {
      if (userId === this.getUser._id) {
        return "red darken-3";
      }
      return "grey darken-4";
    },
  },
  filters: {
    toDate: (messageDate) => {
      let date = messageDate.toUTCString();
      return date.slice(0, 22);
    },
  },
  created() {
    this.$vuetify.goTo(document.body.scrollHeight);

    // init socket listeners
    socket.connect();

    socket.on("newMessage", (payload) => {
      if (payload.success) {
        const message = payload.message[0];
        message.date = new Date(message.date);
        this.ADD_MESSAGE(message);
        this.$vuetify.goTo(document.body.scrollHeight);
      }
    });
  },
  destroyed() {
    // turn socket listeners off!
    socket.off("newMessage");
    socket.disconnect();
  },
  beforeDestroy() {
    // remove scroll listener
    window.removeEventListener("scroll", this.scrollTrigger);
  },
  mounted() {
    window.addEventListener("scroll", this.scrollTrigger);
  },
};
</script>