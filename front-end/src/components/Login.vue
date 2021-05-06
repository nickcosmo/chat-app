<template>
  <v-main class="grey darken-3 align-center">
    <v-container>
      <v-row class="justify-center">
        <v-col class="col-5">
          <v-card outlined dark class="pa-10">
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
              <v-btn flat class="col-12 blue">Submit</v-btn>
            </v-card-text>
            <!-- </v-form> -->
            <v-card-text class="text-center">
              or continue with a social profile
            </v-card-text>
            <v-cart-text class="d-flex justify-space-around col-12">
              <v-btn icon outlined><v-icon>mdi-google</v-icon></v-btn>
              <v-btn icon outlined><v-icon>mdi-facebook</v-icon></v-btn>
              <v-btn icon outlined><v-icon>mdi-twitter</v-icon></v-btn>
              <v-btn icon outlined><v-icon>mdi-github</v-icon></v-btn>
            </v-cart-text>
            <v-card-text class="text-center">
              Already a member? Log in
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>