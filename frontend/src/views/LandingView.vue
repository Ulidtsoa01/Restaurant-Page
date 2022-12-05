<template>
  <div>
    <div v-bind:style="heroImage">
      <v-container fluid>
        <v-row justify="end">
            <v-col cols="auto">
                <v-btn outline @click="$router.push('login')">Log In</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="auto">
                <router-link
                  :key="$route.path"
                  :to="{ path: '/' }"
                  style="text-decoration: none; color: inherit"
                >
                  <v-img id="logo" src="./images/pom.png" width="250"></v-img>
                </router-link>
            </v-col>
        </v-row>
        <v-row justify="center" style="margin-top: 100px">
            <v-col cols="auto">
                <v-btn outline large @click="$router.push('client')">Order Now</v-btn>
            </v-col>


            <!--ColorBlind Mode Button-->
            <!--
            <v-btn elevation="2" class="ma-2" color="green">Colorblind Mode</v-btn>
            -->
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'LandingView',

    components: {
    },
      computed: {
        heroImage() {
          return {
            backgroundImage: `url${require('./background.jpg')}`
          };
        }
      },
  }
  
</script>

<style>
main{
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgb(42, 53, 117)), url(./background.jpg);
  background-size: cover;
}

#logo {
  margin-top: 3em;
}
</style>


<script>
// import HelloWorld from '../components/HelloWorld'
import { loadGoogle, promptLogin, userSignedIn } from '../js/login.js'
export default {
  name: 'LandingView',
  components: {
    //HelloWorld,
  },
  methods: {
      async signIn(e) {
          console.log(e);
          console.log(await userSignedIn(e.credential));
          await translate('test','es', e.credential);
      }
  },
  async mounted() {
      await loadGoogle();
      await promptLogin(this.signIn);
  }
}
</script>