<template>
  <v-app>
    <router-view/>
  </v-app>
</template>
<script>
export default {
  components: {
    name: 'App',
  },
  data: () => ({
    //
  }),
  mounted(){
    localStorage.setItem("selectedAppointment",null)
  }
}
</script>
<style lang="scss" scoped>
body {
  font-family: 'Open Sans', sans-serif;
}
.v-application {
   font-family: 'Open Sans', sans-serif !important;
    .title { // To pin point specific classes of some components
       font-family: 'Open Sans', sans-serif !important;
    }
 }
</style>
