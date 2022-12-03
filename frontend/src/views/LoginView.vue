<template>
    <v-container>
      <br><br><br><br>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-10 mt-10">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card-text class="mt-12">
                      <br><br><br><br>
                      <h1 class="text-center">Login in to Your Account</h1>
                      <h5 class="text-center  grey--text ">Log in to your account so you can use Pom & Honey
                        POS system
                      </h5>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <br><br><br><br><br>
                          <center>
                            <div id="buttonDiv"></div>
                          </center>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="6" class="white rounded-bl-xl">
                    <div style="  text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text">
                        <img height="200" src="../views/images/pom.png">
                      </v-card-text>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { translateAll, langs } from '../js/backend.js'
  import { promptLogin } from '../js/login.js';
  
  export default {
    data: () => ({
      step: 1
    }),
    props: {
      source: String
    },
  
    methods: {
      move() {
        this.$router.push({
          path: 'client',
        })
      },
      signedIn(e) {
        this.$router.push("/server/" + e.credential);
      },
    },
    async mounted() {
      /*await translateAll("es");*/
      await promptLogin(this.signedIn);
    }
  
  }
  </script>
  <style scoped>
  .v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
  }
  
  .v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
  }
  </style>