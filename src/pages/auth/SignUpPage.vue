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
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              top
              height="6"
            />
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
              />
              <v-form @submit.prevent="auhtUser" v-model="valid">
                <v-text-field
                  prepend-icon="perm_identity"
                  name="name"
                  label="Nome Completo"
                  type="text"
                  :rules="[rules.required]"
                  password
                  v-model="userData.name"
                />

                <v-select
                  prepend-icon="work_outline"
                  name="occupation"
                  label="Ocupação no IFPI"
                  :items="items"
                  v-model="userData.occupation"
                  :rules="[rules.required]"
                />
                <v-text-field
                  prepend-icon="perm_device_information"
                  name="phone_number"
                  label="Número de Whatsapp"
                  v-mask="'(##) # ####-####'"
                  type="phone"
                  v-model="userData.phone_number"
                />
                <v-text-field
                  prepend-icon="mail_outline"
                  name="email"
                  label="E-mail"
                  type="text"
                  :rules="[rules.required, rules.email]"
                  v-model="userData.email"
                />

                <v-text-field
                  prepend-icon="password"
                  name="password"
                  label="Senha"
                  :rules="[rules.required, rules.min]"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  v-model="userData.password"
                />

                <v-text-field
                  prepend-icon="password"
                  name="password_confirm"
                  label="Comfirmar senha"
                  :rules="[rules.required, rules.min, rules.matchPassword]"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  v-model="userData.samePasswords"
                />

                <v-btn
                  :disabled="!valid"
                  block
                  color="primary"
                  elevation="6"
                  type="submit"
                >
                  Cadastrar </v-btn
                ><br />
                <p class="deslink">
                  Já tenho Conta <a class="link" href="/signin"> Fazer Login</a>
                </p>
              </v-form>
            </v-card-text>
          </v-card-text>
          </div>
        </v-card>
      </section>
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
}

@media screen and (max-width: 1266px) {
  .section-form {
    margin-right: 140px;
  }

  .div-label {
    margin-left: 100px;
  }
  h1 {
    font-size: 48px;
    color: rgb(0, 89, 255);
  }
}

@media screen and (max-width: 1166px) {
  .section-form {
    margin-right: 120px;
  }
  .div-label {
    margin-left: 80px;
  }
}

@media screen and (max-width: 1052px) {
  .section-form {
    margin-right: 100px;
  }

  .div-label {
    margin-left: 80px;
  }
  .descricao {
    font-size: 16px;
    color: #6b7677;
    text-align: left;
    margin: -4px 11px 0px 0px;
  }

  h1 {
    font-size: 38px;
    color: rgb(0, 89, 255);
  }
}

@media screen and (max-width: 838px) {
  .section-form {
    width: 50%;
    min-width: 380px;
    margin-right: 80px;
  }

  .section-label {
    width: 50%;
  }
  .div-label {
    margin-left: 40px;
    padding: 40px;
  }

  .descricao {
    color: #6b7677;
    text-align: left;
    margin: -4px 11px 0px 0px;
  }

  h1 {
    font-size: 28px;
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
