<template>
  <div>
    <validation-observer ref="searchObserver">
      <validation-provider v-slot="{ errors }" rules="required">
        <v-text-field
          :error-messages="errors"
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
      </validation-provider>
    </validation-observer>

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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import utilMixin from "@/mixins/util";
import { EventBus } from "@/event-bus";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  props: ["status"],
  mixins: [utilMixin],
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      searchString: null,
    };
  },
  watch: {
    searchString: function (newString) {
      if (newString == "" || newString == null) {
        this.$store.commit("channel/CLEAR_SEARCH_CHANNELS");
        this.resetForm();
      }
    },
    status: function (newString) {
      if (!newString) {
        this.resetForm();
      }
    },
  },
  computed: {
    ...mapGetters("channel", ["getSearchChannels"]),
    ...mapGetters("user", ["getUser"]),
  },
  methods: {
    ...mapActions("channel", ["searchChannels"]),
    ...mapActions("user", ["addChannel"]),
    async pushSearchChannels() {
      if (await this.$refs.searchObserver.validate()) {
        await this.searchChannels({ string: this.searchString });
      }
    },
    async pushAddChannel(channelId, channelName) {
      const userName = this.getUser.name;
      const userId = this.getUser._id;
      const payload = {
        userName: userName,
        userId: userId,
        channelName: channelName,
        channelId: channelId,
      };
      const response = await this.addChannel(payload);
      EventBus.$emit("showSnackbar", response);
      this.searchString = null;
    },
    async resetForm() {
      await this.$refs.searchObserver.reset();
    },
  },
};
</script>