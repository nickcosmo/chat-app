<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div v-for="message in getChannelMessages" :key="message._id">
          <!-- <v-divider dark></v-divider> -->
          <v-card class="py-6 px-2 grey darken-3 white--text" flat>
            <div class="d-flex flex-row align-center">
              <v-avatar rounded color="red" size="45" class="mr-5">
                {{ message.userName | abbreviation }}
              </v-avatar>
              {{ message.body }}
            </div>
          </v-card>
        </div>
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
import { mapActions, mapGetters } from "vuex";
import utilMixin from "@/mixins/util";

export default {
  mixins: [utilMixin],
  data() {
    return {
      textInput: null,
      // messages: [],
    };
  },
  computed: {
    ...mapGetters("channel", ["getChannelMessages", "getCurrentChannel"]),
    ...mapGetters("user", ["getUser"]),
  },
  methods: {
    ...mapActions("channel", ["postMessage"]),
    pushMessage() {
      this.postMessage({
        channelId: this.getCurrentChannel._id,
        body: this.textInput,
        userId: this.getUser._id,
        userName: this.getUser.name,
        date: Date.now(),
      });
    },
  },
};
</script>