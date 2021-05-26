<template>
  <v-footer class="justify-center align-center white--text" height="62">
    <v-avatar rounded color="red" size="42" class="mr-5">
      {{ getUser.name | abbreviation }}
    </v-avatar>
    {{ getUser.name }}
    <v-spacer></v-spacer>

    <v-menu offset-y left top rounded="lg">
      <template v-slot:activator="{ on, attrs }">
        <v-btn plain icon v-bind="attrs" v-on="on">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list dense color="grey" class="darken-3">
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="red">mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="pr-4 red--text"> Logout </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";
import utilMixin from "@/mixins/util";

export default {
  mixins: [utilMixin],
  computed: {
    ...mapGetters("user", ["getUser"]),
  },
};
</script>