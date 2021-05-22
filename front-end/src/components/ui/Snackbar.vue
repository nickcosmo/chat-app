<template>
  <v-snackbar top timeout=2500 v-model="status">
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="showSnackbar"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { EventBus } from "@/event-bus";

export default {
  data() {
    return {
      message: null,
      success: false,
      status: false,
    };
  },
  methods: {
    showSnackbar() {
      this.status = !this.status;
    },
  },
  created() {
    EventBus.$on("showSnackbar", (payload) => {
      console.log("bus init");
      this.message = payload.message;
      this.success = payload.success;
      this.status = !this.status;
    });
  },
};
</script>