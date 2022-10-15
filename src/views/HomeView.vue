<template>
  <div>
    <v-app-bar color="primary" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Próxima Parada  -  <strong>{{nomeUsuario}}</strong></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon to="/">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
  <!-- <hello-world /> -->
</template>
  
<script>
/* import HelloWorld from '../components/HelloWorld' */

export default {
  name: 'Homeview',
  data() {
    return {
      nomeUsuario: ""
    }
  },
  created() {
    if (this.$route.query.usuario) {
      this.nomeUsuario = this.$route.query.usuario;
    }
  }

  /* components: {
    HelloWorld,
  }, */
}
</script>