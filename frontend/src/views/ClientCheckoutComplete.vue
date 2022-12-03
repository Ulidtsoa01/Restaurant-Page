<template>
    <center>
    <div>
        <h1>Thank you for your order!</h1>
        <div id="buttonDiv"></div> 
    </div>
</center>
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