<template>
  <v-main class="grey darken-3 align-center">
    <v-container>
      <v-row class="justify-center">
        <v-col class="col-12 col-md-5">
          <v-card outlined dark class="pa-10 mx-auto" max-width="400">
            <v-card-title>Log In Here!</v-card-title>
            <!-- <v-form class="mt-5"> -->
            <v-card-text>
              <v-text-field
                dense
                dark
                prepend-inner-icon="mdi-email"
                outlined
                label="User Name"
              ></v-text-field>
              <v-text-field
                dense
                dark
                prepend-inner-icon="mdi-lock"
                outlined
                label="Password"
              ></v-text-field>
              <v-btn text class="col-12 blue">Submit</v-btn>
            </v-card-text>
            <!-- </v-form> -->
            <v-card-text class="text-center">
              or continue with a social profile
            </v-card-text>
            <v-card-text class="d-flex justify-space-around col-7 mx-auto">
              <v-btn
                icon
                large
                outlined
                id="google_btn"
                @click="initGoogleSignIn"
              >
                <v-icon>mdi-google</v-icon>
              </v-btn>
              <v-btn icon large outlined @click="gitHubSignin">
                <v-icon>mdi-github</v-icon>
              </v-btn>
            </v-card-text>
            <v-card-text class="text-center">
              Not a member? Sign up here
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("user", ["googleSignin", "gitHubSigninSuccess"]),
    async initGoogleSignIn() {
      const elementRef = document.getElementById("google_btn");
      this.googleSignin(elementRef);
    },
    // eslint-disable-next-line no-unused-vars
    gitHubSignin() {
      window.location.href = process.env.VUE_APP_GITHUB_URI;
    },
    async gitHubSuccess() {
      await this.gitHubSigninSuccess(this.$route.query.code);
    },
  },
  created() {
    if (this.$route.query.code) {
      this.gitHubSuccess();
    }
  },
};
</script>