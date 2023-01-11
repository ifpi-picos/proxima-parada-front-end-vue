<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center >
      <v-flex xs8 sm4 md4>
        <section class="teste">
            <h1>Próxima Parada</h1>
            <p class="descricao">O Próxima Parada é um sistema que irá facilitar o deslocamento entre sua casa e a instituição de ensino que você frequênta</p>
        </section> 
      </v-flex>
      
      <v-flex xs8 sm6 md5 class="divfinal">
        <v-card >
          <v-card-text>
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              top
              height="6"
            >
            </v-progress-linear>
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
              <v-form @submit.prevent="auhtUser" v-model="valid">
                <v-text-field
                  prepend-icon="perm_identity"
                  name="name"
                  label="Nome Completo"
                  type="text"
                  :rules="[rules.required]"
                  password
                  v-model="userData.name"
                >
                </v-text-field>

                <v-select
                  prepend-icon="work_outline"
                  name="occupation"
                  label="Ocupação no IFPI"
                  :items="items"
                  v-model="userData.occupation"
                  :rules="[rules.required]"
                >
                </v-select>
                <v-text-field
                  prepend-icon="perm_device_information"
                  name="phone_number"
                  label="Número de Whatsapp"
                  v-mask="'(##) # ####-####'"
                  type="phone"
                  v-model="userData.phone_number"
                >
                </v-text-field>
                <v-text-field
                  prepend-icon="mail_outline"
                  name="email"
                  label="E-mail"
                  type="text"
                  :rules="[rules.required, rules.email]"
                  v-model="userData.email"
                >
                </v-text-field>

                <v-text-field
                  prepend-icon="password"
                  name="password"
                  label="Senha"
                  :rules="[rules.required, rules.min]"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  v-model="userData.password"
                >
                </v-text-field>
                <v-text-field
                  prepend-icon="password"
                  name="password_confirm"
                  label="Comfirmar senha"
                  :rules="[rules.required, rules.min, rules.matchPassword]"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  v-model="userData.samePasswords"
                >
                </v-text-field>
                <v-btn
                  :disabled="!valid"
                  block
                  color="primary"
                  elevation="6"
                  type="submit"
                  >Cadastrar</v-btn
                >
                <br />
               
                  <p class="deslink">Já tenho Conta <a class="link" href="/signin"> Fazer Login</a></p>
                
              </v-form>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Auth from "../../services/auth";

export default {
  name: "SignUp",
  data() {
    return {
      items: ["Aluno(a)", "Professor(a)", "Outro(a)"],
      userData: {
        name: "",
        occupation: "",
        phone_number: "",
        email: "",
        password: "",
        samePasswords: "",
      },
      messageError: "Erro ao conetar-se a internet!",
      loading: false,
      erroAlert: false,
      show1: false,
      show2: false,
      valid: false,
      rules: {
        required: (value) => !!value || "Obrigatório.",
        min: (value) => value.length >= 6 || "Mínimo 6 caracteres",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido.";
        },
        matchPassword: () =>
          this.userData.password === this.userData.samePasswords ||
          `Senhas diferentes`,
      },
    };
  },
  methods: {
    async auhtUser() {
      this.loading = true;
      try {
        const res = await Auth.signupUser(this.userData);
        this.loading = false;
        sessionStorage.setItem("userLocal", JSON.stringify(res.data));
        this.$router.push({ name: "feed" });
      } catch (error) {
        const response = error.response;
        this.loading = false;
        this.erroAlert = true;
        if (response.data.message) {
          this.messageError = response.data.message;
        }
        console.log(response.data);
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
}
.link{
  text-decoration: none;
  text-align: center;
}
/* .descricao{1146
  text-align: center;

} */
h1{
  font-size: 58px;
  color: rgb(0, 89, 255);
  margin-left: -145px;

}
.descricao{
  font-size: 18px;
    color: #6b7677;
    text-align:left;
    margin: -4px 11px 0px 0px;
    margin-left: -145px;
   

}
.deslink{
  font-size: 14px;
    color: #6b7677;
    text-align:center;
    margin: -4px 11px 0px 0px;
}

/* .teste{
    display: flexbox;
    flex-direction: row;
    padding: 40px;
  
  } */
@media screen and (max-width: 1144px) {
  .teste{
    display: flexbox;
    flex-direction: row;
    padding: 35px;
  
  }
    h1{
    font-size: 48px;
    color: rgb(0, 89, 255); 
    margin-left: -125px;
  }
  .descricao{
  font-size: 16px;
    color: #6b7677;
    text-align:left;
    margin: -4px 11px 0px 0px;
    margin-left: -125px;
   

}
}

@media screen and (max-width: 975px) {
  .teste{
    display: flexbox;
    flex-direction: row;
    padding: 20px;
  
  }
    h1{
    font-size: 38px;
    color: rgb(0, 89, 255); 
    margin-left: -125px;
  }
  .descricao{
  font-size: 18px;
    color: #6b7677;
    text-align:left;
    margin: -4px 11px 0px 0px;
    margin-left: -125px;
   

  }
}
@media screen and (max-width: 959px) {
  .teste{
    display: flexbox;
    flex-direction: row;
    padding: 20px;
  
  }
    h1{
    font-size: 34px;
    color: rgb(0, 89, 255); 
    margin-left: -45px;
  }
  .descricao{
  font-size: 14px;
    color: #6b7677;
    text-align:left;
    margin: -4px 11px 0px 0px;
    margin-left: -45px;
   

  }
}
 @media screen and (max-width: 738px) {
  .teste{
    display: none;
  }
    h1{
   display: none;
  }
  .descricao{
  display: none ;
  }
  .divfinal{
    text-align: center;
    margin-left: -155px;
  }
 
} 
</style>
