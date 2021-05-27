<template>
  <v-main class="grey darken-3 align-center">
    <v-container>
      <v-row>
        <v-col class="col-12 text-center">
          <v-progress-circular
            :size="200"
            :width="10"
            color="#212121"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from "vuex";
import { EventBus } from "@/event-bus";

export default {
  methods: {
    ...mapActions("user", ["gitHubSigninSuccess"]),
    async gitHubSuccess() {
      const response = await this.gitHubSigninSuccess(this.$route.query.code);
      EventBus.$emit("showSnackbar", response);
      if (response.success) this.$router.push({ name: "chat" });
    },
  },
  created() {
    if (this.$route.query.code) {
      this.gitHubSuccess();
    } else {
      this.$router.push({ name: "login" });
    }
  },
};
</script>