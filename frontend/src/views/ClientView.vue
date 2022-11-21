<template>
    <div v-if="signedIn">
        <h1>Welcome Client</h1>
        <v-btn block>
            Block Button
        </v-btn>
    </div>
  <div v-else>
    <v-container fluid>
        <v-row align="center" justify="center">
            <v-col>
                <p class="text-h1" style="text-align: center; padding-top: 20%">
                Not Signed In
                </p>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'
import { loadGoogle, userSignedIn } from '../js/login.js';

  export default {
    name: 'ClientView',

    components: {
      //HelloWorld,
    },
      data: () => ({
          signedIn: false,
      }),
  async created() {
    await loadGoogle();
    this.signedIn = await userSignedIn(this.$route.params.credential);
  },
  }
</script>
