<template>
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
      <v-img
        :src="require('../../assets/logo.png')"
        class="my-3"
        contain
        height="260"
      />
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
          >Login</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
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
