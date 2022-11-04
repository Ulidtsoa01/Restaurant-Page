<template>
    <div>
        <h1>Welcome</h1>
    </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'
  import { getItems } from '../js/backend.js'

  export default {
    name: 'LandingView',

    components: {
      //HelloWorld,
    },
    async mounted() {
        console.log(await getItems());
    }
  }
</script>
