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
          :type="alertType"
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
                <v-card-subtitle v-if="userData.Vehicle[0].brand" class="pa-0">
                  <span class="card-subtitle"
                    ><b>Veículo:</b> {{ userData.Vehicle[0].brand }},
                    {{ userData.Vehicle[0].model }}</span
                  >
                </v-card-subtitle>

                <v-card-subtitle v-if="!userData.Vehicle[0].brand" class="pa-0">
                  <span class="card-subtitle"
                    ><b>Veículo:</b> Nenhum veículo cadastrado</span
                  >
                </v-card-subtitle>
                <v-card-actions
                  v-if="userData.Vehicle[0].id == null"
                  class="pa-0 mt-2"
                >
                  <v-btn
                    v-if="userData.Requisition[0].exist"
                    color="primary"
                    block
                    @click="dialogDriver = true"
                  >
                    Oferecer caronas
                  </v-btn>

                  <v-card v-if="userData.Requisition[0].id" class="wmp">
                    <v-card-title
                      v-if="!userData.Requisition[0].readed"
                      class="card-result wmp warning"
                      block
                    >
                      Sual solicitação está em processamento.
                    </v-card-title>
                    <div v-if="userData.Requisition[0].readed" class="wmp">
                      <v-card-title
                        v-if="!userData.Requisition[0].status"
                        class="card-result wmp error"
                        block
                      >
                        Sual solicitação foi recusada.
                      </v-card-title>
                      <v-card-title
                        v-if="userData.Requisition[0].status"
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
                <v-btn
                  :disabled="userData.Vehicle[0].id == ''"
                  color="primary"
                  block
                  outlined
                  @click="dialogCar = true"
                >
                  Cadastrar veiculo
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="450px" scrollable>
        <v-col cols="12" xm="12" sm="16" md="16" lg="25">
          <v-card>
            <v-alert
              :value="alertSuccess"
              color="red"
              elevation="3"
              outlined
              :type="alertType"
              >{{ alertMessage }}</v-alert
            >
            <v-form @submit.prevent="auht" v-model="valid">
              <v-container>
                <v-row>
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
                      @click="updateData('user')"
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
            <v-alert
              :value="alertSuccess"
              color="red"
              elevation="3"
              outlined
              :type="alertType"
              >{{ alertMessage }}</v-alert
            >
            <v-form @submit.prevent="car" v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-row class="pa-2" align="center" justify="center">
                      <v-avatar
                        tile
                        size="165px"
                        v-if="!userData.Vehicle[0].avatar"
                        class="grey"
                      >
                        <span>Escolha uma imagem</span>
                      </v-avatar>
                      <v-avatar tile size="165" v-else>
                        <v-img
                          v-if="userData.Vehicle[0].avatar"
                          :src="userData.Vehicle[0].avatar"
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
                  <v-col cols="12" md="7">
                    <v-text-field
                      name="brand"
                      label="Marca"
                      type="text"
                      :rules="[rules.required]"
                      v-model="userData.Vehicle[0].brand"
                    />

                    <v-text-field
                      name="model"
                      label="Modelo"
                      v-model="userData.Vehicle[0].model"
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
                      @click="updateData('vehicle')"
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
            color="red"
            elevation="3"
            outlined
            :type="alertType"
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
              @click="requestPositionDriver"
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
import UploadImage from "../../services/upload";

export default {
  data() {
    return {
      items: ["Aluno(a)", "Professor(a)", "Outro(a)"],
      userFile: "",
      vehicleFile: "",
      userFileChanged: false,
      vehicleFileChanged: false,
      userData: {
        avatar: "",
        Vehicle: [{ id_user: "", avatar: "", brand: "", model: "" }],
        Requisition: [{ id_user: "" }],
      },
      alertMessage: "Erro ao conectar-se ao banco de dados!",
      loading: false,
      updateLoading: false,
      newCarLoading: false,
      driverLoading: false,
      loader: null,
      alertError: false,
      alertSuccess: false,
      alertType: "",
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
            /^(([^<script>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido.";
        },
        matchPassword: () =>
          this.userData.password === this.userData.samePasswords ||
          `Senhas diferentes`,
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
      this.userData.Vehicle[0].image = URL.createObjectURL(this.vehicleFile);
    },

    async uploadImageUser() {
      let formData = new FormData();
      formData.append("file", this.userFile);
      // eslint-disable-next-line no-unused-vars
      const res = await UploadImage.uploadImage(formData);
    },

    async saveDataUser() {
      this.updateLoading = true;
      this.loader = this.updateLoading;
      try {
        const res = await User.updateUserData(this.userData);
        this.userData = res.data;
        this.showSuccesAlert(
          true,
          "Informações aletradas com Sucesso!!!",
          "warning"
        );
      } catch (error) {
        this.finishLoading();
        this.showErrorAlert(true, error.response.data.message, "warning");
        //console.log(response.data);
      }
    },

    async saveDataVehicle() {
      this.newCarLoading = true;
      this.loader = this.newCarLoading;
      this.userData.Vehicle[0].id_user = this.userData.id;
      try {
        const res = await Vehicle.createNewVehicle(this.userData.Vehicle[0]);
        this.userData.Vehicle[0] = res.data;
        sessionStorage.setItem("userLocal", JSON.stringify(this.userData));
        this.showSuccesAlert(
          true,
          "Veiculo cadastrado com Sucesso.",
          "warning"
        );
      } catch (error) {
        this.finishLoading();
        this.showErrorAlert(true, error.response.data.message, "warning");
        //console.log(response.data);
      }
    },

    async requestPositionDriver() {
      this.driverLoading = true;
      this.loader = this.driverLoading;
      try {
        const res = await Requisition.createNewRequisition({
          id: this.userData.id,
        });
        this.userData.Requisition[0] = res.data;
        sessionStorage.setItem("userLocal", JSON.stringify(this.userData));
        this.showSuccesAlert(
          true,
          "Requisição solicitada com Sucesso.",
          "warning"
        );
      } catch (error) {
        this.finishLoading();
        this.showErrorAlert(true, error.response.data.message, "warning");
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
    showErrorAlert(status, message, type) {
      this.alertError = status;
      this.alertType = type;
      this.messageError = message;
    },

    showSuccesAlert(status, message, type) {
      this.alertSuccess = status;
      this.alertType = type;
      this.messageError = message;
      setTimeout(() => (this.alertSuccess = false), 3000);
      this.finishLoading();
      this.refresh();
    },

    refresh() {
      this.$router.go();
    },
  },
  created() {
    if (sessionStorage.getItem("userLocal")) {
      this.userData = JSON.parse(sessionStorage.getItem("userLocal"));
      //this.userData.Requisition[0].id_user = this.userData.id;
      if (!this.userData.Vehicle[0]) {
        this.userData.Vehicle[0] = {
          id: "",
          id_user: "",
          avatar: "",
          brand: "",
          model: "",
        };
      }
      if (!this.userData.Requisition[0]) {
        this.userData.Requisition[0] = {
          id: "",
          exist: true,
          status: false,
          readed: false,
        };
      }
      console.log("testand o user loca no Profile: ", this.userData);
    }
  },
  watch: {
    alertError(val) {
      if (!val) return;
      setTimeout(() => (this.alertError = false), 3000);
    },
  },
  comments: {
    UploadImage,
  },
};
</script>
<style lang="css" scoped>
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
