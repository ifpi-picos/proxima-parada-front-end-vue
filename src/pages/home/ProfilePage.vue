<template>
  <v-container>
    <v-row justify="center" fluid class="pa-3">
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        height="6"
      >
      </v-progress-linear>
      <v-col cols="12" xm="8" sm="8" md="8" lg="10">
        <v-alert
          :value="erroAlert"
          color="red"
          elevation="3"
          outlined
          type="warning"
          >{{ messageError }}</v-alert
        >
        <v-card max-width="450px" class="mx-auto bg pt-10" elevation="2">
          <v-row justify="center">
            <v-col
              align-self="start"
              class="d-flex justify-center align-center pa-0"
              cols="12"
            >
              <v-avatar size="165px" v-if="!userData.avatar">
                <v-img
                  src="https://lh3.googleusercontent.com/-Gvq8ieRFxvU/U-wQMDsuoJI/AAAAAAAADVs/-3qBKC1CFIQ/s250/Avatar7.png"
                />
              </v-avatar>
              <v-avatar size="165" v-else>
                <v-img v-if="userData.avatar" :src="userData.avatar" />
              </v-avatar>
            </v-col>
          </v-row>
          <v-list-item class="profile-text-name ml-2 pt-16">
            <v-list-item-content>
              <v-list-item-title class="text-h4">
                {{ userData.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-h6">{{
                userData.occupation
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-spacer></v-spacer>
          <v-card-subtitle>
            <b class="ml-2 text-h6">{{ userData.phone_number }}</b>
          </v-card-subtitle>
          <v-card-subtitle>
            <b class="ml-2 text-h6">{{ userData.email }}</b>
          </v-card-subtitle>
          <v-card-actions>
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-btn color="primary" block @click="dialog = true">
                  Editar Perfil
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="primary" block outlined @click="dialogCar = true">
                  Cadastrar veiculo
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="800px" scrollable="true">
        <v-col cols="12" xm="12" sm="16" md="16" lg="25">
          <v-card>
            <v-form @submit.prevent="auht" v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-row class="pa-2" align="center" justify="center">
                      <v-avatar
                        size="165px"
                        v-if="!userData.avatar"
                        class="grey"
                      >
                        <span>Escolha uma imagem</span>
                      </v-avatar>
                      <v-avatar size="165" v-else>
                        <v-img v-if="userData.avatar" :src="userData.avatar" />
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
                      readonly
                      v-model="userData.email"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-btn
                      :loading="updateLoading"
                      :disabled="updateLoading"
                      color="primary"
                      block
                      type="submit"
                      @click="saveChanges"
                    >
                      Salvar
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn
                      color="primary"
                      outlined
                      block
                      @click="dialog = false"
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

    <v-row justify="center">
      <v-dialog
        v-model="dialogCar"
        persistent
        max-width="800px"
        scrollable="true"
      >
        <v-col cols="12" xm="12" sm="16" md="16" lg="25">
          <v-card>
            <v-form @submit.prevent="car" v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-row class="pa-2" align="center" justify="center">
                      <v-avatar
                        tile
                        size="165px"
                        v-if="!carData.image"
                        class="grey"
                      >
                        <span>Escolha uma imagem</span>
                      </v-avatar>
                      <v-avatar tile size="165" v-else>
                        <v-img v-if="carData.image" :src="carData.image" />
                      </v-avatar>
                    </v-row>
                    <v-row class="pa-2" align="center" justify="center">
                      <input
                        hidden
                        id="selectFileCar"
                        type="file"
                        @change="onFileCarChange"
                      />
                      <v-btn color="primary" @click="chooseImageCar()"
                        >Escolher Imagen</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="7">
                    <v-text-field
                      name="modelo"
                      label="Modelo"
                      type="text"
                      :rules="[rules.required]"
                      v-model="carData.modelo"
                    />

                    <v-text-field
                      name="marca"
                      label="Marca"
                      v-model="carData.marca"
                      :rules="[rules.required]"
                    />
                  </v-col>
                </v-row>
              </v-container>

              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-btn
                      :loading="newCarLoading"
                      :disabled="newCarLoading"
                      color="primary"
                      block
                      type="submit"
                      @click="newCar"
                    >
                      Salvar
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn
                      color="primary"
                      outlined
                      block
                      @click="dialogCar = false"
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
import User from "../../services/user";
export default {
  data() {
    return {
      items: ["Aluno(a)", "Professor(a)", "Outro(a)"],
      userData: {
        name: "",
        occupation: "",
        phone_number: "",
        email: "",
        avatar: "",
        CurrentPassword: "",
        password: "",
        samePasswords: "",
      },
      carData: {
        modelo: "",
        marcar: "",
        image: "",
      },
      messageError: "Erro ao conectar-se ao banco de dados!",
      loading: false,
      updateLoading: false,
      newCarLoading: false,
      loader: null,
      erroAlert: false,
      dialog: false,
      dialogCar: false,
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
      this.userData.avatar = URL.createObjectURL(file);
    },
    chooseImageCar() {
      document.getElementById("selectFileCar").click();
    },
    onFileCarChange(e) {
      const file = e.target.files[0];
      this.carData.image = URL.createObjectURL(file);
    },

    async saveChanges() {
      this.updateLoading = true;
      this.loader = this.updateLoading;
      try {
        const res = await User.updateUserData(this.userData);
        if (res.status == 200) {
          console.log(res);
          this.updateLoading = false;
          this.loader = null;
          this.dialog = false;
          this.userData = res.data;
        }
      } catch (error) {
        const response = error.response;
        this.erroAlert = true;
        this.updateLoading = false;
        this.dialog = false;
        this.loader = null;
        if (response.data.message) {
          this.messageError = response.data.message;
        }
        console.log(response.data);
      }
    },

    async getUserData() {
      this.loading = true;
      try {
        const res = await User.getUserData();
        if (res.status == 200) {
          console.log(res);
          this.loading = false;
          this.userData = res.data;
        }
      } catch (error) {
        const response = error.response;
        this.erroAlert = true;
        this.loading = false;
        if (response.data.message) {
          this.messageError = response.data.message;
        }
        console.log(response.data);
      }
    },

    async newCar() {
      this.newCarLoading = true;
      this.loader = this.newCarLoading;
      try {
        const res = await User.newCar(this.carData);
        if (res.status == 200) {
          console.log(res);
          this.newCarLoading = false;
          this.loader = null;
          this.dialog = false;
          this.carData = res.data;
        }
      } catch (error) {
        const response = error.response;
        this.erroAlert = true;
        this.newCarLoading = false;
        this.dialog = false;
        this.loader = null;
        if (response.data.message) {
          this.messageError = response.data.message;
        }
        console.log(response.data);
      }
    },
  },
  created() {
    this.getUserData();
  },
  watch: {
    erroAlert(val) {
      if (!val) return;
      setTimeout(() => (this.erroAlert = false), 3000);
    },
  },
};
</script>
<style>
.border1 {
  width: 95vw;
  height: 95vh;
  align-items: center;
}

.border4 {
  text-align: center;
  border: 2px solid rgba(63, 62, 62, 0.342);
  width: 85%;
  height: 85%;
  background: #fff;
  margin: auto;
}
h4 {
  text-align: center;
}
body {
  margin: 0;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
