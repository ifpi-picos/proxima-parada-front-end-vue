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
          :value="alertError"
          color="red"
          elevation="3"
          outlined
          type="warning"
          >{{ alertMessage }}</v-alert
        >
        <v-alert
          :value="alertSuccess"
          color="green"
          elevation="3"
          outlined
          type="success"
          >{{ alertMessage }}</v-alert
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
              <v-avatar size="165px">
                <v-img v-if="userData.avatar" :src="userData.avatar" />
                <v-img
                  v-else
                  src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                />
              </v-avatar>
              <input
                hidden
                id="selectFileUser"
                type="file"
                @change="onFileChangedUser"
              />
              <v-btn class="upload-btn" x-large icon @click="chooseImageUser()">
                <v-icon> mdi-camera </v-icon>
              </v-btn>
            </v-col>
            <v-btn
              v-if="userFileChanged"
              color="primary"
              class="save-image-btn"
              @click="uploadImageUser()"
              >Salvar Imagen</v-btn
            >
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
                <v-card-subtitle v-if="userData.Vehicle[0].id" class="pa-0">
                  <span class="card-subtitle"
                    ><b>Veículo:</b> {{ userData.Vehicle[0].brand }},
                    {{ userData.Vehicle[0].model }}</span
                  >
                </v-card-subtitle>

                <v-card-subtitle v-if="!userData.Vehicle[0].id" class="pa-0">
                  <span class="card-subtitle"
                    ><b>Veículo:</b> Nenhum veículo cadastrado</span
                  >
                </v-card-subtitle>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card-actions v-if="userData.Vehicle[0].id" class="pa-0 mt-2">
                  <v-btn
                    v-if="!userData.StatusRequest[0].id"
                    color="primary"
                    block
                    @click="dialogDriver = true"
                  >
                    Oferecer caronas
                  </v-btn>

                  <v-card v-if="userData.StatusRequest[0].id" class="wmp" style="box-shadow: none;">
                    <v-card-title
                      v-if="!userData.StatusRequest[0].readed"
                      class="card-result wmp warning"
                      block
                    >
                      Sual solicitação está em processamento.
                    </v-card-title>
                    <div v-if="userData.StatusRequest[0].readed" class="wmp">
                      <v-col class="refuse" v-if="!userData.StatusRequest[0].status">
                        <v-card-title
                          v-if="!userData.StatusRequest[0].status"
                          class="card-result wmp error"
                          block
                        >
                          Sual solicitação foi recusada.
                        </v-card-title>
                        <v-card-title style="color: red;">
                          {{ userData.StatusRequest[0].statusDescriptionDenied }}
                        </v-card-title>
                        <v-btn
                          color="primary"
                          block
                          @click="dialogDriver = true"
                        >
                          Solicitar Novamente Status de motorista
                        </v-btn>
                      </v-col>

                      <v-card-title
                        v-if="userData.StatusRequest[0].status"
                        class="card-result wmp success"
                        block
                      >
                        Voce já é um motorista.
                      </v-card-title>
                    </div>
                  </v-card>
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
                  <span v-if="userData.Vehicle[0].id == false"
                    >Cadastrar veiculo</span
                  >
                  <span v-else>Editar veiculo</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="450px" scrollable>
        <v-col>
          <v-card>
            <v-alert
              :value="alertSuccess"
              color="green"
              elevation="3"
              outlined
              type="success"
              >{{ alertMessage }}</v-alert
            >
            <v-form @submit.prevent="userForm">
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      prepend-icon="perm_identity"
                      label="Nome Completo"
                      type="text"
                      :rules="[rules.required]"
                      v-model="userData.name"
                    />

                    <v-select
                      prepend-icon="work_outline"
                      label="Ocupação no IFPI"
                      :items="items"
                      v-model="userData.occupation"
                      :rules="[rules.required]"
                    />

                    <v-text-field
                      prepend-icon="perm_device_information"
                      label="Número de Whatsapp"
                      :rules="[rules.minPhone]"
                      v-mask="'(##) # ####-####'"
                      type="phone"
                      v-model="userData.phone_number"
                    />
                    <v-text-field
                      prepend-icon="mail_outline"
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
                    <v-btn :loading="updateLoading" color="primary" block type="submint">
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
      <v-dialog v-model="dialogCar" persistent scrollable>
        <v-col>
          <v-card min-width="360px">
            <v-alert
              :value="alertSuccess"
              color="green"
              elevation="3"
              outlined
              type="success"
              >{{ alertMessage }}</v-alert
            >
            <v-form @submit.prevent="carForm" v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" xs="12" sm="12" md="4" lg="4">
                    <v-row class="pa-2" align="center" justify="center">
                      <v-avatar size="190px" tile>
                        <v-img
                          v-if="userData.Vehicle[0].avatar"
                          :src="userData.Vehicle[0].avatar"
                        />
                        <v-img
                          v-else
                          src="https://cdn-icons-png.flaticon.com/512/70/70310.png"
                        />
                      </v-avatar>
                    </v-row>
                    <v-row class="pa-2" align="center" justify="center">
                      <input
                        hidden
                        id="selectFileCar"
                        type="file"
                        @change="onFileChangedCar"
                      />
                      <v-btn color="primary" @click="chooseImageCar()"
                        >Escolher Imagen</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="12" xs="12" sm="12" md="8" lg="8">
                    <v-row class="car-specification">
                      <h1>Especificações do veículo</h1>
                      <v-radio-group
                        v-model="userData.Vehicle[0].vehicle_type"
                        row
                        class="car-radio-group"
                      >
                        <v-radio class="car-radio" value="Carro">
                          <template v-slot:label>
                            <div><p>Carro</p></div>
                          </template>
                        </v-radio>
                        <v-radio class="car-radio" value="Moto">
                          <template v-slot:label>
                            <div><p>Moto</p></div>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          class="pt-0"
                          label="Marca"
                          type="text"
                          :rules="[rules.required]"
                          v-model="userData.Vehicle[0].brand"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          class="pt-0"
                          label="Modelo"
                          v-model="userData.Vehicle[0].model"
                          :rules="[rules.required]"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          class="pt-0"
                          label="Cor"
                          type="text"
                          :rules="[rules.required]"
                          v-model="userData.Vehicle[0].vehicle_color"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          class="pt-0"
                          label="Placa"
                          v-model="userData.Vehicle[0].license_plate"
                          :rules="[rules.required]"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-btn
                      :disabled="!valid"
                      :loading="newCarLoading"
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
          <v-alert
            :value="alertSuccess"
            color="green"
            elevation="3"
            outlined
            type="success"
            >{{ alertMessage }}</v-alert
          >
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
              @click="statusRequestPositionDriver()"
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

export default {
  data() {
    return {
      items: ["Aluno(a)", "Professor(a)", "Outro(a)"],
      userFile: "",
      vehicleFile: "",
      userFileChanged: false,
      vehicleFileChanged: false,
      vehicleType: "Carro",
      /* userData: {
        id: "41b2c605-1f7d-4f41-baeb-b3a6c8808ca4",
        name: "Teste 1 Teste",
        email: "1teste@gmail.com",
        phone_number: "(34) 5 3453-4534",
        occupation: "Aluno(a)",
        avatar:
          "https://storage.googleapis.com/proxima-parada-storage.appspot.com/users%2F41b2c605-1f7d-4f41-baeb-b3a6c8808ca4.jpg",
        status: true,
        level: false,
        Vehicle: [
          {
            id: "e64e2550-d2f6-4fe3-9ee8-0e36248417c3",
            brand: "Volkswagen",
            model: "Goll",
            avatar:
              "https://storage.googleapis.com/proxima-parada-storage.appspot.com/vehicles%2Fe64e2550-d2f6-4fe3-9ee8-0e36248417c3.jpg",
            vehicle_type: "Carro",
            vehicle_color: "Azull",
            license_plate: "234234234",
          },
        ],
        StatusRequest: [
          {
            id: "0b39f204-2402-4866-941b-4c0bb5f589d4",
            status: false,
            readed: true,
            id_user: "41b2c605-1f7d-4f41-baeb-b3a6c8808ca4",
            statusDescriptionDenied: "Imagem do veiculo muito borrada",
          },
        ],
      }, */

      userData: {
        Vehicle: [
          {
            id_user: "",
            avatar: "",
            brand: "",
            model: "",
            statusDescriptionDenied: "",
            vehicle_type: "Carro",
            vehicle_color: "",
            license_plate: "",
          },
        ],
        StatusRequest: [{ id_user: "" }],
      },
      vehicleAvatar: null,
      loading: false,
      updateLoading: false,
      newCarLoading: false,
      driverLoading: false,
      loader: null,
      alertError: false,
      alertSuccess: false,
      alertMessage: "Erro ao conectar-se ao banco de dados!",
      dialog: false,
      dialogCar: false,
      dialogDriver: false,
      show1: false,
      show2: false,
      show3: false,
      valid: false,
      rules: {
        required: (value) => !!value || "Obrigatório.",
        minPhone: (value) => value.length >= 16 || "Mínimo 16 caracteres",
      },
    };
  },
  methods: {
    chooseImageUser() {
      document.getElementById("selectFileUser").click();
    },
    onFileChangedUser(e) {
      this.userFile = e.target.files[0];
      this.userData.avatar = URL.createObjectURL(this.userFile);
      this.userFileChanged = true;
    },
    chooseImageCar() {
      document.getElementById("selectFileCar").click();
    },
    onFileChangedCar(e) {
      this.vehicleFile = e.target.files[0];
      this.userData.Vehicle[0].avatar = URL.createObjectURL(this.vehicleFile);
      this.vehicleFileChanged = true;
    },

    async uploadImageUser() {
      this.loading = true;
      let formData = new FormData();
      //formData.append("id", this.userData.id);
      formData.append("userAvatarFileName", this.userFile);
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await User.uploadImageUser(formData);
        this.setItemLocalStorage(res.data);
        console.log(res.data);
        this.finishLoading();
        this.showSuccessAlert(true, "Image salva com Sucesso!!!");
      } catch (error) {
        this.finishLoading();
        this.showErrorAlert(true, error.response.data.message);
        //console.log(error.response.data);
      }
    },

    async userForm() {
      this.updateLoading = true;
      this.loader = this.updateLoading;
      /* console.log(
        "testando o userData antes de enviar para api: ",
        this.userData
      ); */
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await User.updateUserData(this.userData);
        console.log(res);
        this.finishLoading();
        this.showSuccessAlert(true, "Informações aletradas com Sucesso!!!");
      } catch (error) {
        this.finishLoading();
        this.showErrorAlert(true, error.response.data.message);
        console.log(error.response.data);
      }
    },

    async uploadImageCar(message) {
      this.loading = true;
      let formData = new FormData();
      formData.append("vehicleAvatarFileName", this.vehicleFile);
      try {
        const res = await User.uploadImageCar(
          this.userData.Vehicle[0].id,
          formData
        );
        this.userData.Vehicle[0] = res.data;
        this.setItemLocalStorage(this.userData);
        this.finishLoading();
        this.showSuccessAlert(true, message);
      } catch (error) {
        this.finishLoading();
        this.showErrorAlert(true, error.response.data.message);
        //console.log(error.response.data);
      }
    },

    async carForm() {
      if (this.userData.Vehicle[0].id == false) {
        //console.log("Cadastrando informações do carro");
        this.newCarLoading = true;
        this.loader = this.newCarLoading;
        this.userData.Vehicle[0].id_user = this.userData.id;
        try {
          const res = await User.createNewVehicle(this.userData.Vehicle[0]);
          //console.log(res.data);
          this.userData.Vehicle[0] = res.data;
          //console.log("Testando a resposta do carForm ", res.data);
          if (this.vehicleFileChanged) {
            this.uploadImageCar("Veiculo cadastrado com Sucesso.");
          } else {
            this.setItemLocalStorage(this.userData);
            this.finishLoading();
            this.showSuccessAlert(true, "Veiculo cadastrado com Sucesso.");
          }
        } catch (error) {
          this.finishLoading();
          this.showErrorAlert(true, error.response.data.message);
          //console.log(response.data);
        }
      } else {
        //console.log("Atualizando informações do carro");
        this.newCarLoading = true;
        this.loader = this.newCarLoading;
        this.userData.Vehicle[0].id_user = this.userData.id;
        try {
          const res = await User.updateVehicle(this.userData.Vehicle[0]);
          //console.log(res.data);
          this.userData.Vehicle[0] = res.data;
          //console.log("Testando a resposta do carForm ", res.data);
          if (this.vehicleFileChanged) {
            this.uploadImageCar("Veiculo alterado com Sucesso.");
          } else {
            this.setItemLocalStorage(this.userData);
            this.finishLoading();
            this.showSuccessAlert(true, "Veiculo alterado com Sucesso.");
          }
        } catch (error) {
          this.finishLoading();
          this.showErrorAlert(true, error.response.data.message);
          //console.log(response.data);
        }
      }
    },

    async statusRequestPositionDriver() {
      this.driverLoading = true;
      this.loader = this.driverLoading;
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await User.createNewStatusRequest(this.userData.id);
        this.userData.StatusRequest[0] = res.data;
        this.setItemLocalStorage(this.userData);
        this.dialogDriver = false;
        this.showSuccessAlert(true, "Requisição solicitada com Sucesso.");
      } catch (error) {
        this.finishLoading();
        this.showErrorAlert(true, error.response.data.message);
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

    showErrorAlert(status, message) {
      this.alertError = status;
      this.alertMessage = message;
    },

    showSuccessAlert(status, message) {
      this.alertMessage = message;
      this.alertSuccess = status;
      this.userFileChanged = false;
      setTimeout(() => {
        this.finishiProcess();
      }, 3000);
    },

    finishiProcess() {
      this.finishLoading();
      this.alertSuccess = false;
      //this.refresh();
    },

    prepareData(data) {
      this.userData = data;
      if (!this.userData.Vehicle[0]) {
        this.userData.Vehicle[0] = {
          id: false,
          id_user: false,
          avatar: null,
          brand: "",
          model: "",
          vehicle_type: "Carro",
          vehicle_color: "",
          license_plate: "",
        };
      }
      if (!this.userData.StatusRequest[0]) {
        this.userData.StatusRequest[0] = {
          id: false,
          status: false,
          readed: false,
        };
      }
      /* if (!this.userData.phone_number) {
        this.userData.phone_number = " ";
      } */
      //console.log("testand o user loca no Profile: ", this.userData);
    },

    setItemLocalStorage(data) {
      sessionStorage.setItem("userLocal", JSON.stringify(data));
    },

    refresh() {
      this.$router.go();
    },
  },

  created() {
    //console.log("testand o user loca no Profile: ", this.userData);
    if (sessionStorage.getItem("userLocal")) {
      this.prepareData(JSON.parse(sessionStorage.getItem("userLocal")));
    }
    //console.log("testand o user loca no Profile: ", this.userData);
  },
  watch: {
    alertError(val) {
      if (!val) return;
      setTimeout(() => (this.alertError = false), 3000);
    },
  },
};
</script>
<style lang="css" scoped>

.refuse{
  padding: 0;
}
.border {
  border: 1px red solid;
}

.upload-btn {
  position: absolute !important;
  z-index: 1;
  top: 165px;
  background: #1976d2;
}

.save-image-btn {
  top: 35px;
  z-index: 1;
}

.theme--light.v-btn.v-btn--icon {
  color: #ffffff;
}

.card-subtitle {
  font-size: 1.35em;
}

.car-specification h1 {
  padding: 4px;
  width: 100%;
  text-align: center;
}

.car-radio-group {
  padding: 4px;
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
}

.car-radio {
  padding: 12px;
  width: 30%;
}

.car-radio p {
  font-size: 1.5em;
  margin-bottom: 0px;
}

.card-result {
  font-size: 0.875rem;
  color: #ffffff;
  height: 36px;
  padding: 0 16px;

  align-items: center;
  letter-spacing: 0.0892857143em;
  justify-content: center;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}

.wmp {
  min-width: 100% !important;
  max-width: none;

  display: flex;
  flex: 1 0 auto;

  margin: 0;
  padding: 0;
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
