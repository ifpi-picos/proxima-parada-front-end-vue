<template>
    <div>
      <v-app-bar color="primary" dense dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
  
        <v-toolbar-title>Próxima Parada</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon to="/auth">
          <v-icon>logout</v-icon>
        </v-btn>
      </v-app-bar>
      <SignUp2/>
    </div>
    <!-- <hello-world /> -->
  </template>
  
  <script>
import SignUp2 from "../components/SignUp2.vue";
    /* import HelloWorld from '../components/HelloWorld' */
  
    export default {
    name: "Home-view",
    data() {
        return {};
    },
    components: { SignUp2 }
}
  </script>