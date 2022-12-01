<template>
    <v-container fluid fill-height>
        <v-row align="center" justify="center" style="height: 35vh">
            <v-col cols="5">
                <v-card light height="35vh">
                    <v-row align="center" align-content="center" justify="center" style="height: 35vh">
                        <v-col cols="auto" style="margin-right: 20%">
                            <img height="100" src="../views/images/pom.png">
                        </v-col>
                        <v-col cols="auto">
                            <v-container>
                                <v-row>
                                    <v-col>
                                        <h2 style="color: black">Login</h2>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <div id="buttonDiv"></div> 
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { translateAll, langs } from '../js/backend.js'
  import { promptLogin } from '../js/login.js';

export default {
  name: "App",
  components: {
  },

  methods: {
    move() {
      this.$router.push({
        path: 'client',
      })
    },
      signedIn(e) {
          this.$router.push("/server/"+e.credential);
      },
  },
    async mounted() {
        /*await translateAll("es");*/
        await promptLogin(this.signedIn);
    }
};
</script>

<style>

</style>

