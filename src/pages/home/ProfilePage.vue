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
        <v-card
          max-width="450px"
          min-width="400px"
          class="mx-auto bg pt-10"
          elevation="2"
        >
          <v-row justify="center">
            <v-col
              align-self="start"
              class="d-flex justify-center align-center pa-0"
              cols="12"
            >
              <v-avatar size="165px" v-if="!userData.avatar">
                <v-img
                  src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
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
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-card-subtitle class="pa-0">
                  <b class="ml-2 text-h6">{{ userData.phone_number }}</b>
                </v-card-subtitle>
                <v-card-subtitle class="pa-0">
                  <b class="ml-2 text-h6">{{ userData.email }}</b>
                </v-card-subtitle>
              </v-col>
              <v-col cols="12" md="6">
                <v-card-subtitle v-if="carData.brand" class="pa-0">
                  <span class="card-subtitle"
                    ><b>Veículo:</b> {{ carData.brand }},
                    {{ carData.model }}</span
                  >
                </v-card-subtitle>

                <v-card-subtitle v-if="!carData.brand" class="pa-0">
                  <span class="card-subtitle"
                    ><b>Veículo:</b> Nenhum veículo cadastrado</span
                  >
                </v-card-subtitle>
                <v-card-actions v-if="carData.brand" class="pa-0 mt-2">
                  <v-btn color="primary" block @click="dialogDriver = true">
                    Oferecer caronas
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>

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
      <v-dialog v-model="dialog" persistent max-width="800px" scrollable>
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
      <v-dialog v-model="dialogCar" persistent max-width="800px" scrollable>
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
                      name="brand"
                      label="Marca"
                      type="text"
                      :rules="[rules.required]"
                      v-model="carData.brand"
                    />

                    <v-text-field
                      name="model"
                      label="Modelo"
                      v-model="carData.model"
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
                      @click="newVehicle"
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

    <v-row justify="center">
      <v-dialog v-model="dialogDriver" max-width="290">
        <v-card>
          <v-card-title class="text-h5">
            Tem certeza de que desejá a posição de motorisa?
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="red darken-1" text @click="dialogDriver = false">
              Cancelar
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              :loading="driverLoading"
              :disabled="driverLoading"
              @click="requesrPositionDriver"
            >
              Aceitar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import User from "../../services/user";
import Vehicle from "../../services/vehicle";
import Requisition from "../../services/requisition";

export default {
  data() {
    return {
      items: ["Aluno(a)", "Professor(a)", "Outro(a)"],
      userData: {},
      requisition:{
        id_user: "",
      },
      carData: {
        brand: "",
        model: "",
        image: "",
        id_user: "",
      },
      messageError: "Erro ao conectar-se ao banco de dados!",
      loading: false,
      updateLoading: false,
      newCarLoading: false,
      driverLoading: false,
      loader: null,
      erroAlert: false,
      dialog: false,
      dialogCar: false,
      dialogDriver: false,
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
          this.finishLoading();
          this.userData = res.data;
        }
      } catch (error) {
        this.finishLoading();
        this.showErroAlert(true, error.response.data.message);
        //console.log(response.data);
      }
    },

    async requesrPositionDriver() {
      this.driverLoading = true;
      this.loader = this.driverLoading;
      this.requisition.id_user = this.userData.id;
      try {
        const res = await Requisition.createNewRequisition(this.requisition);
        if (res.status == 201) {
          this.finishLoading();
          this.requisition = res.data;
        }
      } catch (error) {
        this.finishLoading();
        this.showErroAlert(true, error.response.data.message);
        //console.log(response.data);
      }
    },

    async getDataVehicle(idUser) {
      this.loading = true;
      try {
        console.log("entrando na função get veiculo: " + idUser);
        const res = await Vehicle.getVehicleByIdUser(idUser);
        if (res.status == 201) {
          console.log("entrando na função get veiculo: deu certo");
          this.carData = res.data;
          console.log(this.carData);
          this.finishLoading();
        }
      } catch (error) {
        console.log("entrando na função get veiculo: deu errado");
        this.finishLoading();
        this.showErroAlert(true, error.response.data.message);
        console.log(error.response.data.message);
      }
    },

    async newVehicle() {
      this.newCarLoading = true;
      this.loader = this.newCarLoading;
      this.carData.id_user = this.userData.id;
      try {
        console.log("entrando na função");
        const res = await Vehicle.createNewVehicle(this.carData);
        if (res.status == 200) {
          console.log("entrando na função: deu certo");
          this.finishLoading();
          this.carData = res.data;
        }
      } catch (error) {
        console.log("entrando na função: deu errado");
        this.finishLoading();
        this.showErroAlert(true, error.response.data.message);
        //console.log(response.data);
      }
    },

    finishLoading() {
      this.loader = null;
      this.dialog = false;
      this.dialogCar = false;
      this.dialogDriver = false;
      this.updateLoading = false;
      this.newCarLoading = false;
      this.loading = false;
    },
    showErroAlert(status, message) {
      this.erroAlert = status;
      if (message) {
        this.messageError = message;
      }
    },
  },
  created() {
    if (sessionStorage.getItem("userLocal")) {
      this.userData = JSON.parse(sessionStorage.getItem("userLocal"));
      //console.log("testand o user loca no Profile: ", this.userData);
      this.getDataVehicle(this.userData.id);
    }
  },
  watch: {
    erroAlert(val) {
      if (!val) return;
      setTimeout(() => (this.erroAlert = false), 3000);
    },
  },
};
</script>
<style lang="css" scoped>
.border {
  border: 1px red solid;
}

.card-subtitle {
  font-size: 1.35em;
}

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
