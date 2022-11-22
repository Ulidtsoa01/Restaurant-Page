<template>
    <div>
        <h1>Welcome</h1>
        <div id="buttonDiv"></div> 
    </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'LandingView',

    components: {
      //HelloWorld,
    },
    methods: {

    },
    async mounted() {
        await promptLogin();
    }
  }
</script>