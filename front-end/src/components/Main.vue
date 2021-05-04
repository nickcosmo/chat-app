<template>
  <v-main class="d-flex align-end grey darken-3">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div v-for="message in getChannelMessages" :key="message._id">
            <!-- <v-divider dark></v-divider> -->
            <v-card class="py-6 px-2 grey darken-3 white--text" flat>
              <div class="d-flex flex-row align-center">
                <v-avatar rounded color="red" size="45" class="mr-5">
                  NL
                </v-avatar>
                {{ message.body }}
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-footer class="grey darken-3 px-15 pb-15" app inset height="82">
      <v-text-field
        background-color="grey darken-1"
        class="grey--text text--lighten-1"
        flat
        hide-details
        solo
        placeholder="type message"
        v-model="textInput"
      ></v-text-field>
      <v-btn large class="ml-3 blue" @click="pushMessage">
        <v-icon color="white">mdi-send</v-icon>
      </v-btn>
    </v-footer>
  </v-main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      textInput: null,
      // messages: [],
    };
  },
  computed: {
    ...mapGetters("channel", ["getChannelMessages", "getCurrentChannel"]),
  },
  methods: {
    ...mapActions("channel", ["postMessage"]),
    pushMessage() {
      this.postMessage({
        channelId: this.getCurrentChannel,
        body: this.textInput,
        userId: null,
        date: Date.now(),
      });
    },
  },
};
</script>