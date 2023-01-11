<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center >
      <v-flex xs8 sm4 md4 class="divfinal">
        <section>
            <h1>Próxima Parada</h1>
            <p class="descricao">O Próxima Parada é um sistema que irá facilitar o deslocamento entre sua casa e a instituição de ensino que você frequênta</p>
        </section> 
      </v-flex>
      <section class="teste">
        
        <v-card>
          <v-card-text>
            <v-alert
              :value="erroAlert"
              color="red"
              elevation="3"
              outlined
              type="warning"
              >{{ messageError }}</v-alert
            >
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              top
              height="6"
            >
            
            </v-progress-linear>
            <!-- <v-img
              :src="require('../../assets/logo.png')"
              class="my-3"
              contain
              height="260"
            /> -->
            <v-form @submit.prevent="authUser" v-model="valid">
              <v-text-field
                prepend-icon="mail_outline"
                name="email"
                label="E-mail"
                type="text"
                :rules="[rules.required, rules.email]"
                v-model="userAuth.email"
              >
              </v-text-field>
              <v-text-field
                class="password"
                prepend-icon="password"
                name="password"
                label="Senha"
                :rules="[rules.required, rules.min]"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                v-model="userAuth.password"
              >
          
              </v-text-field>
              <v-btn
                :disabled="!valid"
                block
                color="primary"
                elevation="6"
                type="submit"
                >Entrar</v-btn
              >
              <br />
             
                <p class="paragrafo">
                  Novo no Próxima Parada?
                  <a class="link" href="/signup" rel="noopener noreferrer">Criar conta</a>
                </p>
             
              
            </v-form>
          </v-card-text>
        </v-card>
      </section>
      <!-- <v-flex xs8 sm4 md4>
      <section>
          <p><a  class="link admin" href="/signinadmin" rel="">Entrar como Adminstrador</a></p>
      </section> 
      </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
import Auth from "../../services/auth";

export default {
  data() {
    return {
      userLocal: {},
      userAuth: {
        email: "",
        password: "",
      },
      messageError: "Erro ao conetar-se a internet!",
      loading: false,
      erroAlert: false,
      show1: false,
      valid: false,
      rules: {
        required: (value) => !!value || "Obrigatório.",
        min: (value) => value.length >= 6 || "Mínimo 6 caracteres",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido.";
        },
      },
    };
  },
  methods: {
    async authUser() {
      this.loading = true;
      try {
        const res = await Auth.signinUser(this.userAuth);
        this.userLocal = res.data;
        sessionStorage.setItem("userLocal", JSON.stringify(this.userLocal));
        this.loading = false;
        this.$router.push({ name: "feed" });
      } catch (error) {
        const response = error.response;
        this.loading = false;
        this.erroAlert = true;
        if (response.data.message) {
          this.messageError = response.data.message;
        }
        console.log(response);
      }
    },
  },
  watch: {
    erroAlert(val) {
      if (!val) return;
      setTimeout(() => (this.erroAlert = false), 3000);
    },
  },
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap");
.btn {
  color: #fff;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
}
.form {
  font-family: "Open Sans", sans-serif;
}
.password {
  font-family: "Open Sans", sans-serif;
} */
.teste{
  display: flexbox;
  flex-direction: row;
  padding: 120px;
  
 
}
.teste2{
  display: flexbox;
  flex-direction: row;
  
}
h1{
  font-size: 58px;
  color: rgb(0, 89, 255);
  
  
}
.descricao{
  font-size: 20px;
    color: #6b7677;
    text-align:left;
    margin: -4px 11px 0px 0px;

}
.paragrafo{
  text-align: center;
}
.link{
  text-decoration: none;
  padding: 4px;
}
.admin{
  padding: 24px;
}

@media screen and (max-width: 1266px) {
  .teste{
    display: flexbox;
    flex-direction: row;
    padding: 80px;
  
  
  }
    h1{
    font-size: 48px;
    color: rgb(0, 89, 255); 
  }
}
@media screen and (max-width: 1052px) {
  .teste{
    display: flexbox;
    flex-direction: row;
    padding: 40px;
  }
  .descricao{
    font-size: 16px;
    color: #6b7677;
    text-align:left;
    margin: -4px 11px 0px 0px;
  }

  h1{
    font-size: 38px;
    color: rgb(0, 89, 255); 
  }
}
@media screen and (max-width: 838px) {
  .teste{
    display: flexbox;
    flex-direction: row;
    padding: 20px;
  }
  .descricao{
    font-size: 10px;
    color: #6b7677;
    text-align:left;
    margin: -4px 11px 0px 0px;
  }

  h1{
    font-size: 28px;
    color: rgb(0, 89, 255); 
  }
}
@media screen and (max-width: 685px) {

  h1{
    display: none;
  }
  .descricao{
    display: none;
  }
  .divfinal{
    
    text-align: center;
    margin-left: -155px;
  }
}
@media screen and (max-width: 560px){
.divfinal{
  
  text-align: center;
  margin-left: -125px;
  }
}
/* @media screen and (max-width: 585px){
.divfinal{

  margin-left: -9px;
  }
} */
</style>
