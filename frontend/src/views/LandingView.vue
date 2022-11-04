<template>
    <div>
        <h1>Welcome</h1>
    </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'
  import {countItem} from '../js/backend.js'

  export default {
    name: 'LandingView',

    components: {
      //HelloWorld,
    },
    async mounted() {
        console.log(await countItem('2022-10-01','2022-10-20',2));
    }
  }
</script>
