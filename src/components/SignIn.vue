<template>
   <v-card>
      <v-card-text>
         <v-img :src="require('../assets/logo.png')" class="my-3" contain height="260" />
         <v-form @submit.prevent="auth">
            <v-text-field prepend-icon="mail_outline" name="userEmail" label="E-mail" type="text"
               v-model="userAuth.email">
            </v-text-field>
            <v-text-field prepend-icon="password" name="encryptedPassword" label="Senha" type="password"
               v-model="userAuth.password">
            </v-text-field>
            <v-btn block color="primary" elevation="6" type="submit">Entrar</v-btn>
         </v-form>
      </v-card-text>
   </v-card>
</template>
  
<script>
import Auth from "../services/auth"

export default {
   name: "SignIn",
   data() {
      return {
         userAuth: {
            email: "",
            password: ""
         }
      }
   },
   methods: {
      auth() {
         Auth.signin(this.userAuth).then(res => {
            console.log(res);
            if (res.status == 200) {
               this.$router.push('/home')
            } else {
               alert(res.statusText);
            }
         })
      }
   }
}
</script>