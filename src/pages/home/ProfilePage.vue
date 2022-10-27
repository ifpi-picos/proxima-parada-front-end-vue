<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" xm="8" sm="8" md="8" lg="10">
        <v-card>
          <v-card-content>
            <v-row>
              <v-col cols="12" md="5">
                <v-avatar size="165">
                  <v-img src="../../assets/img/background.jpg" />
                </v-avatar>
              </v-col>
              <v-col cols="12" md="7">
                <v-card-title> {{ userData.name }} </v-card-title>
                <v-card-subtitle>{{ userData.occupation }}</v-card-subtitle>
                <v-card-subtitle>{{ userData.phone_number }}</v-card-subtitle>
                <v-card-subtitle>{{ userData.email }}</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card-content>
          <v-card-actions>
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-btn color="primary" outlined block @click="dialog = true">
                  Editar Perfil
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="800px">
        <v-col cols="12" xm="8" sm="8" md="8" lg="10">
          <v-card>
            <v-form @submit.prevent="auht" v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-row class="pa-2" align="center" justify="center">
                      <v-avatar size="165px" v-if="!url" class="grey">
                        <span>Escolha uma imagem</span>
                      </v-avatar>
                      <v-avatar size="165" v-else>
                        <v-img v-if="url" :src="url" />
                      </v-avatar>
                    </v-row>
                    <v-row class="pa-2" align="center" justify="center">
                      <input
                        hidden
                        id="selectFile"
                        type="file"
                        @change="onFileChange"
                      />
                      <v-btn color="primary" @click="chooseImage()"
                        >Nova Imagen</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="7">
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
                      :rules="[rules.required, rules.minPhone]"
                      v-mask="'(##) # ####-####'"
                      type="phone"
                      v-model="userData.phone_number"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="mail_outline"
                      name="email"
                      label="E-mail"
                      type="text"
                      :rules="[rules.required, rules.email]"
                      v-model="userData.email"
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      prepend-icon="password"
                      name="password"
                      label="Senha"
                      :rules="[rules.required, rules.min]"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                      v-model="userData.CurrentPassword"
                    />
                  </v-col>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          prepend-icon="password"
                          name="password"
                          label="Senha"
                          :rules="[rules.required, rules.min]"
                          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show2 ? 'text' : 'password'"
                          @click:append="show2 = !show2"
                          v-model="userData.password"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          prepend-icon="password"
                          name="password_confirm"
                          label="Comfirmar senha"
                          :rules="[
                            rules.required,
                            rules.min,
                            rules.matchPassword,
                          ]"
                          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show3 ? 'text' : 'password'"
                          @click:append="show3 = !show3"
                          v-model="userData.samePasswords"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-btn
                      :disabled="!valid"
                      color="primary"
                      block
                      type="submit"
                    >
                      Salvar
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn
                      color="primary"
                      outlined
                      block
                      :to="{ name: 'feed' }"
                    >
                      Cancelar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
export default {
  //justify-content: center
  data() {
    return {
      nomeUsuario: "Edivan Dos Santos",
      url: "../../assets/img/logo.png",
      items: ["Aluno(a)", "Professor(a)", "Outro(a)"],
      userData: {
        name: "Roberto Silva",
        occupation: "Professor",
        phone_number: "(87) 9 8888-8888",
        email: "roberto@teste.com",
        CurrentPassword: "",
        password: "",
        samePasswords: "",
      },
      messageError: "Erro ao conetar-se a internet!",
      loading: false,
      erroAlert: false,
      dialog: false,
      show1: false,
      show2: false,
      show3: false,
      valid: false,
      rules: {
        required: (value) => !!value || "Obrigatório.",
        min: (value) => value.length >= 6 || "Mínimo 6 caracteres",
        minPhone: (value) => value.length >= 16 || "Mínimo 16 caracteres",
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
    chooseImage() {
      document.getElementById("selectFile").click();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
  },
};
</script>
<style>
.border {
  border: 1px solid red;
}
</style>
