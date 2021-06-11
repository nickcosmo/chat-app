<template>
  <v-main class="grey darken-3 align-center">
    <v-container>
      <v-row class="justify-center">
        <v-col class="col-12 col-md-5">
          <validation-observer ref="signUpObserver">
            <v-form @submit.prevent>
              <v-card outlined dark class="pa-10 mx-auto" max-width="400">
                <v-card-title>Sign Up Here!</v-card-title>
                <v-card-text>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    mode="lazy"
                  >
                    <v-text-field
                      :error-messages="errors"
                      dense
                      dark
                      prepend-inner-icon="mdi-account-cowboy-hat"
                      outlined
                      label="name"
                      v-model="user.name"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|email"
                    mode="lazy"
                  >
                    <v-text-field
                      :error-messages="errors"
                      dense
                      dark
                      prepend-inner-icon="mdi-email"
                      outlined
                      label="email"
                      v-model="user.email"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required|min:5"
                    mode="lazy"
                  >
                    <v-text-field
                      :error-messages="errors"
                      dense
                      dark
                      prepend-inner-icon="mdi-lock"
                      outlined
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                      label="Password"
                      v-model="user.password"
                    ></v-text-field>
                  </validation-provider>
                  <v-btn text class="col-12 blue" @click="submit">Submit</v-btn>
                </v-card-text>
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
                  Already a member?
                  <router-link to="login">Log in here</router-link>
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
        name: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapActions("user", ["googleSignin", "gitHubSigninSuccess", "signup"]),
    async initGoogleSignIn() {
      const elementRef = document.getElementById("google_btn");
      this.googleSignin(elementRef);
    },
    gitHubSignin() {
      window.location.href = process.env.VUE_APP_GITHUB_URI;
    },
    async submit() {
      if (await this.$refs.signUpObserver.validate()) {
        const response = await this.signup(this.user);
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