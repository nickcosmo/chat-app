<template>
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
</template>

<script>
export default {
  data() {
    return {
      newChannelName: null,
      newChannelDesc: null,
    };
  },
  methods: {
    postChannel() {
      this.$emit("postChannel", [this.newChannelName, this.newChannelDesc]);
    },
  },
};
</script>