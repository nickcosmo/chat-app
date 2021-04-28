<template>
  <v-main class="d-flex align-end grey darken-4">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div v-for="message in messages" :key="message.message">
            <v-divider dark></v-divider>
            <v-card class="py-5 px-2" dark flat>
              <div class="d-flex flex-row align-center">
                <v-avatar color="red" size="45" class="mr-5"
                  >{{ message.user }}
                </v-avatar>
                {{ message.message }}
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-footer dark app inset height="82">
      <v-text-field
        background-color="grey lighten-1"
        flat
        hide-details
        solo
        placeholder="type message"
        v-model="textInput"
      ></v-text-field>
      <v-btn large class="ml-3 blue" @click="pushMessage">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-footer>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      textInput: null,
      messages: [
        {
          user: "NL",
          message:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque eius praesentium rerum quisquam amet, mollitia eum dicta at harum ipsum neque, reiciendis est minima aperiam tempora, incidunt consequatur laborum nisi?",
        },
        {
          user: "NL",
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, libero excepturi a vero iusto expedita. Dignissimos nesciunt amet itaque sed, corrupti ipsa nulla distinctio modi repellat fugit hic odit eum.",
        },
        {
          user: "NL",
          message:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ex debitis minima facilis ea, laudantium quae dignissimos tempore autem repudiandae soluta doloribus blanditiis eius aspernatur assumenda molestiae ullam quasi et.",
        },
      ],
    };
  },
  methods: {
    pushMessage() {
      this.messages.push({
        user: "NL",
        message: this.textInput,
      });
      // getData() {
      //   axios.get("localhost:3000/get")
      // }
    },
  },
};
</script>