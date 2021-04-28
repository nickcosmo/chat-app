<template>
  <div>
    <v-navigation-drawer
      v-if="!selectChannel"
      v-model="drawer"
      app
      dark
      class="lighten-3"
    >
      <v-app-bar flat>
        <v-toolbar-title>Channels</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="grey"><v-icon>mdi-plus</v-icon></v-btn>
      </v-app-bar>

      <v-list shaped>
        <v-list-item-group>
          <v-list-item-content>
            <v-list-item @click="selectChannel = !selectChannel"
              >Back-End</v-list-item
            >
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item>Back-End</v-list-item>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item>Back-End</v-list-item>
          </v-list-item-content>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-if="selectChannel"
      v-model="drawer"
      app
      dark
      class="lighten-3"
    >
      <v-app-bar flat>
        <v-toolbar-title>A Channel!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="grey" @click="selectChannel = !selectChannel"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
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