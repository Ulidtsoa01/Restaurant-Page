<template>
  <div>
{{number}}
asd
</div>
  


</template>

<script>
// import HelloWorld from '../components/HelloWorld'

import total from './ClientView.vue'

export default {   
  props: {
    
  },

  data: () => ({
    total : total,
    number : 0,
  }),

  components: {
  },

  comptued: {
    isDisabled() {
      return this.total.total;
    }
  },

  created() {
    this.number = this.$route.query.sub_total
  },

  method: {
    click_proteins() {
      this.click += 1;
      if (this.click  === 1) {
        this.enable = false;
      }
    }
  }
}
</script>
