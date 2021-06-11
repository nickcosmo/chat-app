<template>
  <validation-observer ref="channelObserver">
    <v-form @submit.prevent>
      <v-card class="pa-4" dark>
        <v-card-title>NEW CHANNEL</v-card-title>
        <validation-provider v-slot="{ errors }" rules="required" mode="lazy">
          <v-text-field
            :error-messages="errors"
            class="px-4"
            outlined
            placeholder="Channel Name"
            v-model="newChannelName"
          ></v-text-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }" rules="required" mode="lazy">
          <v-textarea
            :error-messages="errors"
            class="px-4"
            outlined
            placeholder="Channel Description"
            v-model="newChannelDesc"
          ></v-textarea>
        </validation-provider>
        <div class="px-4">
          <v-btn class="blue" @click="postChannel">Save</v-btn>
        </div>
      </v-card>
    </v-form>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  props: ["status"],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  watch: {
    status: function (newString) {
      if (!newString) {
        this.$refs.channelObserver.reset();
      }
    },
  },
  data() {
    return {
      newChannelName: null,
      newChannelDesc: null,
    };
  },
  methods: {
    postChannel() {
      if (this.$refs.channelObserver.validate()) {
        this.$emit("postChannel", [this.newChannelName, this.newChannelDesc]);
      }
    },
  },
};
</script>