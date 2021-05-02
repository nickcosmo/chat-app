<template>
  <div>
    <v-navigation-drawer
      v-if="!selectChannel"
      v-model="drawer"
      app
      dark
      class="grey darken-4"
    >
      <v-app-bar flat class="grey darken-4">
        <v-toolbar-title>Channels</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="grey darken-3"><v-icon color="white">mdi-plus</v-icon></v-btn>
      </v-app-bar>

      <v-list>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title @click="selectChannel = !selectChannel"
              >Back-End</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Back-End</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Back-End</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-if="selectChannel"
      v-model="drawer"
      app
      dark
      class="grey darken-4"
    >
      <v-app-bar flat class="grey darken-4">
        <v-toolbar-title>A Channel!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="grey darken-3" @click="selectChannel = !selectChannel"
          ><v-icon color="white">mdi-arrow-left</v-icon></v-btn
        >
      </v-app-bar>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectChannel: false,
    };
  },
};
</script>