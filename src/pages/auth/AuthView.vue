<template>
  <v-container fluid fill-height>

    <v-hover v-slot:default="{ hover }" open-delay="200">
      <v-btn
        color="primary"
        elevation="2"
        rounded
        class="fab-new-post ma-2"
        @click="dialogSigninAdmin = true"
      >
        <v-icon>admin_panel_settings</v-icon>
        <v-expand-x-transition>
          <span v-if="hover" class="ml-2">Entrar com Administrador</span>
        </v-expand-x-transition>
      </v-btn>
    </v-hover>
    <v-row justify="center">
      <v-dialog v-model="dialogSigninAdmin" persistent max-width="400px">
        <v-card class="pa-2">
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
            <v-img
              :src="require('../../assets/images/admin.png')"
              class="my-3"
              contain
              height="260"
            />
            <v-form @submit.prevent="authAdmin" v-model="valid">
              <v-text-field
                prepend-icon="mail_outline"
                name="email"
                label="E-mail"
                type="text"
                :rules="[rules.required, rules.email]"
                v-model="adminAuth.email"
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
                v-model="adminAuth.password"
              >
              </v-text-field>
              <v-btn
                :disabled="!valid"
                block
                color="primary"
                elevation="6"
                type="submit"
                >Login</v-btn
              >
              <v-btn
                class="mt-2"
                color="red darken-1"
                outlined
                block
                elevation="6"
                @click="dialogSigninAdmin = false"
              >
                Cancelar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <v-layout align-center justify-center>
      <v-flex xs8 sm6 md4>
        <v-card>
          <v-tabs fixed-tabs background-color="primary">
            <v-tab> Entrar </v-tab>

            <v-tab> Registrar-se </v-tab>

            <v-tab-item>
              <template>
                <sign-in />
              </template>
            </v-tab-item>

            <v-tab-item>
              <template>
                <sign-up />
              </template>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";
import Auth from "../../services/auth";

export default {
  name: "Auth-main",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SignIn,
    SignUp,
  },
  data() {
    return {
      adminAuth: {
        email: "",
        password: "",
      },
      messageError: "Erro ao conetar-se a internet!",
      loading: false,
      erroAlert: false,
      show1: false,
      valid: false,
      dialogSigninAdmin: false,
      rules: {
        required: (value) => !!value || "Obrigat??rio.",
        min: (value) => value.length >= 6 || "M??nimo 6 caracteres",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inv??lido.";
        },
      },
    };
  },
  methods: {
    async authAdmin() {
      this.loading = true;
      try {
        const res = await Auth.signinAdmin(this.adminAuth);
        this.userLocal = res.data;
        sessionStorage.setItem("userLocal", JSON.stringify(this.userLocal));
        this.loading = false;
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        const response = error.response;
        this.loading = false;
        this.erroAlert = true;
        this.messageError = response.data.message;
        console.log(response);
      }
    },
  },
};
</script>
<style lang="css" scoped>
.border {
  border: 2px solid red;
}
.flex.xs8,
.flex.sm6,
.flex.md4 {
  max-width: 400px;
  min-width: 360px;
}

.btn-signin-admin {
  right: 5px;
  top: 5px;
}

.fab-new-post {
  z-index: 4;
  position: fixed;
  top: 16px;
  right: 16px;
}
</style>
