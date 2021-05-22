<template>
  <v-snackbar
    :color="snackbarColor"
    elevation="10"
    top
    timeout="2500"
    v-model="status"
  >
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn v-bind="attrs" @click="showSnackbar"> Close </v-btn>
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
  computed: {
    snackbarColor() {
      return this.success ? "#66BB6A" : "#EF5350";
    },
  },
  methods: {
    showSnackbar() {
      this.status = !this.status;
    },
  },
  created() {
    EventBus.$on("showSnackbar", (payload) => {
      this.message = payload.message;
      this.success = payload.success;
      this.status = !this.status;
    });
  },
};
</script>