<template>
  <v-app>
    <!-- <v-system-bar app dark height="75">
      <v-toolbar-title class="display-1">CHAPPIE</v-toolbar-title>
    </v-system-bar> -->

    <v-app-bar app dark flat>
      <v-app-bar-nav-icon
        class="d-flex d-lg-none"
        v-on:click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>This Channel!</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app dark class="lighten-3">
      <v-app-bar flat>
        <v-toolbar-title>Channels</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="grey"><v-icon>mdi-plus</v-icon></v-btn>
      </v-app-bar>

      <v-list shaped>
        <!-- <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item-group>
          <v-list-item-content>
            <v-list-item>Back-End</v-list-item>
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

    <v-main class="d-flex align-end grey">
      <v-container class="px-10">
        <v-card class="my-5 pa-5" dark shaped>
          <div class="d-flex flex-row align-center">
            <v-avatar color="red" size="45" class="mr-5">NL</v-avatar>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            accusantium nobis, corporis, nam aspernatur saepe, a blanditiis
            dolores eius provident magni. Nihil odit consectetur reiciendis
            veritatis accusantium aut sint quo.
          </div>
        </v-card>
        <v-divider></v-divider>
        <v-card class="my-5 pa-5" dark shaped>
          <div class="d-flex flex-row align-center">
            <v-avatar color="red" size="45" class="mr-5">NL</v-avatar>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
            architecto fugit distinctio eius minima similique reiciendis
            expedita quam odit, ipsam tempore sapiente facere beatae ea possimus
            officiis nesciunt in sint?
          </div>
        </v-card>
        <v-divider></v-divider>
        <v-card class="my-5 pa-5" dark shaped>
          <div class="d-flex flex-row align-center">
            <v-avatar color="red" size="45" class="mr-5">NL</v-avatar>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
            eius praesentium rerum quisquam amet, mollitia eum dicta at harum
            ipsum neque, reiciendis est minima aperiam tempora, incidunt
            consequatur laborum nisi?
          </div>
        </v-card>
        <v-divider></v-divider>
      </v-container>
    </v-main>

    <v-footer dark app inset height="82">
      <v-text-field
        background-color="grey lighten-1"
        dense
        flat
        hide-details
        rounded
        solo
        placeholder="type message"
      ></v-text-field>
      <v-btn right class="ml-5 blue">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
    };
  },
};
</script>

<style scoped>
</style>