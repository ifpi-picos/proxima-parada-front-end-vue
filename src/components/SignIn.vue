<template>
    <v-card>
       <v-card-text>
         <v-img :src="require('../assets/logo.png')" class="my-3" contain height="260" />
          <v-form>
             <v-text-field prepend-icon="mail_outline" name="login" label="E-mail" type="text">
             </v-text-field>
             <v-text-field id="password" prepend-icon="password" name="password" label="Senha" type="password">
             </v-text-field>
          </v-form>
       </v-card-text>
       <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn block color="primary" elevation="6" to="/home">Entrar</v-btn>
       </v-card-actions>
    </v-card>
 </template>
  
 <script>
 export default {
    name: "SignIn",
    data() {
        return {}
    },
 }
 </script>