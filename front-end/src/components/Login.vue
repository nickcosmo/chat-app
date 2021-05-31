<template>
  <v-main class="grey darken-3 align-center">
    <v-container>
      <v-row class="justify-center">
        <v-col class="col-12 col-md-5">
          <validation-observer ref="loginObserver">
            <v-form ref="form">
              <v-card outlined dark class="pa-10 mx-auto" max-width="400">
                <v-card-title>Log In Here!</v-card-title>
                <v-card-text>
                  <validation-provider
                    name="Email"
                    v-slot="{ errors }"
                    rules="required|email"
                  >
                    <v-text-field
                      :error-messages="errors"
                      dense
                      dark
                      prepend-inner-icon="mdi-email"
                      outlined
                      label="Email"
                      v-model="user.email"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    name="Password"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      :error-messages="errors"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      dense
                      dark
                      prepend-inner-icon="mdi-lock"
                      outlined
                      label="Password"
                      v-model="user.password"
                      @click:append="showPassword = !showPassword"
                    ></v-text-field>
                  </validation-provider>

                  <v-btn text class="col-12 blue" @click="submit">Submit</v-btn>
                </v-card-text>
                <v-card-text class="text-center">
                  or continue with a social profile
                </v-card-text>
                <v-card-text class="d-flex justify-space-around col-7 mx-auto">
                  <v-btn icon large outlined id="google_btn">
                    <v-icon>mdi-google</v-icon>
                  </v-btn>
                  <v-btn icon large outlined @click="gitHubSignin">
                    <v-icon>mdi-github</v-icon>
                  </v-btn>
                </v-card-text>
                <v-card-text class="text-center">
                  Not a member?
                  <router-link to="signup">Sign up here</router-link>
                </v-card-text>
              </v-card>
            </v-form>
          </validation-observer>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from "vuex";
import { EventBus } from "@/event-bus";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      showPassword: false,
      user: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapActions("user", ["googleSignin", "gitHubSigninSuccess", "login"]),
    async initGoogleSignIn() {
      const elementRef = document.getElementById("google_btn");
      await this.googleSignin(elementRef);
    },
    gitHubSignin() {
      window.location.href = process.env.VUE_APP_GITHUB_URI;
    },
    async submit() {
      if (await this.$refs.loginObserver.validate()) {
        const response = await this.login(this.user);
        EventBus.$emit("showSnackbar", response);
        if (response.success) this.$router.push({ name: "chat" });
      }
    },
  },
  async mounted() {
    await this.initGoogleSignIn();
  },
};
</script>