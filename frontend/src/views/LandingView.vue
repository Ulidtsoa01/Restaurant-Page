<template>
    <div>
        <h1>Welcome</h1>
    </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'
  import { translate } from '../js/translate.js'
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
