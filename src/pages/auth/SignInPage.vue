<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <section class="section-label">
        <div class="div-label">
          <h1>Próxima Parada</h1>
          <p class="descricao">
            O Próxima Parada é um sistema que irá facilitar o deslocamento entre
            sua casa e a instituição de ensino que você frequênta
          </p>
        </div>
      </section>
      <section class="section-form">
        <v-card class="card-form">
          <div class="div-form">
            <v-card-text>
              <v-alert
                :value="erroAlert"
                color="red"
                elevation="3"
                outlined
                type="warning"
              >
                {{ messageError }}
              </v-alert>
              <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                height="6"
              />
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
                />
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
                />
                <v-btn
                  :disabled="!valid"
                  block
                  color="primary"
                  elevation="6"
                  type="submit"
                >
                  Entrar
                </v-btn>
                <br />
                <p class="paragrafo">
                  Novo no Próxima Parada?
                  <a class="link" href="#/signup" rel="noopener noreferrer"
                    >Criar conta</a
                  >
                </p>
              </v-form>
            </v-card-text>
          </div>
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
.section-form {
  height: 103%;
  width: 30%;
  min-width: 450px;
  max-width: 500px;
  margin-right: 200px;
}
.card-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.section-label {
  height: 100%;
  width: 70%;
}
.div-label {
  width: 80%;
  height: 100%;
  margin-left: 200px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-size: 58px;
  color: rgb(0, 89, 255);
}
.descricao {
  font-size: 20px;
  color: #6b7677;
  text-align: left;
  margin: -4px 11px 0px 0px;
}
.paragrafo {
  text-align: center;
}
.link {
  text-decoration: none;
  padding: 4px;
}

@media screen and (max-width: 1400px) {
  .section-form {
    width: 40%;
    min-width: 420px;
    margin-right: 160px;
    margin-left: 200px;
  }
  .section-label {
    width: 60%;
  }
  .div-label {
    margin-left: 100px;
  }

  h1 {
    font-size: 48px;
    color: rgb(0, 89, 255);
  }
  .section-form {
    margin-right: 40px;
  }
  .div-label {
    margin-left: 100px;
  }
  
}
@media screen and (max-width:1333px) {
  .section-form {
    width: 40%;
    min-width: 420px;
    margin-right: 160px;
    margin-left: 200px;
  }
  .section-label {
    width: 63%;
  }
  .div-label {
    margin-left: 100px;
  }

  h1 {
    font-size: 48px;
    color: rgb(0, 89, 255);
  }
  .section-form {
    margin-right: 40px;
  }
  .div-label {
    margin-left: 100px;
  }
  
}
  @media screen and (max-width:1332px) {
  .section-form {
    width: 20%;
    min-width: 420px;
    margin-right: 160px;
    margin-left: 100px;
    
  }
  
  .section-label {
    width: 64%;
  }
  .div-label {
    margin-left: 100px;
  }
  h1 {
    font-size: 48px;
    color: rgb(0, 89, 255);
  }
  .section-form {
    margin-right: 40px;
  }

  .div-label {
    margin-left: 100px;
  }
  h1 {
    font-size: 48px;
    color: rgb(0, 89, 255);
  }
}

@media screen and (max-width: 1230px) {
  .section-form {
    width: 20%;
    min-width: 420px;
    margin-right: 160px;
    margin-left: 100px;
    
  }
  
  .section-label {
    width: 65%;
  }
  .div-label {
    margin-left: 100px;
  }
  h1 {
    font-size: 48px;
    color: rgb(0, 89, 255);
  }
  .section-form {
    margin-right: 40px;
  }

  .div-label {
    margin-left: 100px;
  }
  h1 {
    font-size: 48px;
    color: rgb(0, 89, 255);
  }
}

@media screen and (max-width: 1167px) {
  .section-form {
    width: 20%;
    min-width: 420px;
    margin-right: 160px;
    margin-left: 100px;
    
  }
  
  .section-label {
    width: 64%;
  }
  .div-label {
    margin-left: 100px;
  }
  h1 {
    font-size: 48px;
    color: rgb(0, 89, 255);
  }
  .section-form {
    margin-right: 40px;
  }

  .div-label {
    margin-left: 100px;
  }
  h1 {
    font-size: 48px;
    color: rgb(0, 89, 255);
  }

}

@media screen and (max-width: 1112px) {
  .section-form {
    width: 20%;
    min-width: 420px;
    margin-right: 160px;
    margin-left: 100px;
    
  }
  
  .section-label {
    width: 64%;
  }
  .div-label {
    margin-left: 80px;
  }
  .section-form {
    margin-right: 25px;
  }

  .div-label {
    margin-left: 80px;
  }
  h1 {
    font-size: 48px;
    color: rgb(0, 89, 255);
  }

}
@media screen and (max-width: 1097px) {
  .section-form {
    width: 20%;
    min-width: 420px;
    margin-right: 160px;
    margin-left: 100px;
    
  }
  
  .section-label {
    width: 64%;
  }
  .div-label {
    margin-left: 80px;
  }
  .section-form {
    margin-right: 8px;
  }

  .div-label {
    margin-left: 80px;
  }
  h1 {
    font-size: 48px;
    color: rgb(0, 89, 255);
  }

}

@media screen and (max-width: 1075px) {
  .section-form {
    width: 20%;
    min-width: 420px;
    margin-right: 160px;
    margin-left: 100px;
    
  }
  
  .section-label {
    width: 64%;
  }
  .div-label {
    margin-left: 80px;
  }
  .section-form {
    margin-right: 1px;
  }

  .div-label {
    margin-left: 80px;
  }
  h1 {
    font-size: 48px;
    color: rgb(0, 89, 255);
  }
}
@media screen and (max-width: 685px) {
  .section-form {
    width: 100%;
    min-width: 380px;
    max-width: 500px;
    margin-right: 0;
  }

  .section-label {
    display: none;
  }
}
</style>
