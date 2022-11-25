<template>
  <v-container fluid>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      height="6"
    >
    </v-progress-linear>
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
    <v-hover v-slot:default="{ hover }" open-delay="200">
      <v-btn
        color="primary"
        elevation="2"
        rounded
        class="fab-new-post ma-2"
        @click="dialogNewPost = true"
      >
        <v-icon>mdi-plus</v-icon>
        <v-expand-x-transition>
          <span v-if="hover" class="ml-2">Cadastrar nova carona</span>
        </v-expand-x-transition>
      </v-btn>
    </v-hover>

    <!--  <v-card>
      <h2>Card-01</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        assumenda consectetur corrupti numquam, eligendi consequatur!
        Repellendus quas necessitatibus praesentium non et amet dicta aperiam
        dolorem, ullam neque. Placeat, suscipit voluptates.
      </p>
    </v-card>

    <v-card>
      <h2>Card-02</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        assumenda consectetur corrupti numquam, eligendi consequatur!
        Repellendus quas necessitatibus praesentium non et amet dicta aperiam
        dolorem, ullam neque. Placeat, suscipit voluptates.
      </p>
    </v-card>

    <v-card>
      <h2>Card-03</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        assumenda consectetur corrupti numquam, eligendi consequatur!
        Repellendus quas necessitatibus praesentium non et amet dicta aperiam
        dolorem, ullam neque. Placeat, suscipit voluptates.
      </p>
    </v-card> -->

    <v-row dense>
      <v-alert
        :value="alertInfo"
        color="blue"
        width="100%"
        elevation="3"
        outlined
        dismissible
        type="info"
        ref="cardPostWidth"
        >Nenhuma carona encontrada</v-alert
      >
      <v-col
        v-for="(publication, index) in publications"
        :key="index"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="4"
      >
        <v-card
          elevation="6"
          name="cardPostUser"
          class="cardPostUser"
          min-width="280px"
        >
          <v-container>
            <v-row>
              <v-card-title class="text-title text-h5">
                Informacções da carona
              </v-card-title>
            </v-row>
            <v-divider class="mt-3"></v-divider>
            <v-row class="mt-0 mb-0">
              <v-col cols="6" class="pa-0 ma-0">
                <v-card-title class="text-title">Origem</v-card-title>
                <v-card-text class="text-content">
                  <p>Cidade: {{ publication.OriginAddress.city }}</p>
                  <p>Bairro: {{ publication.OriginAddress.neighborhood }}</p>
                  <p>Rua: {{ publication.OriginAddress.street }}</p>
                  <p>Nº: {{ publication.OriginAddress.number }}</p>
                </v-card-text>
              </v-col>
              <v-divider vertical class="mt-2"></v-divider>
              <v-col cols="6" class="pa-0 ma-0">
                <v-card-title class="text-title">Destino</v-card-title>
                <v-card-text class="text-content">
                  <p>Cidade: {{ publication.DestinationAddress.city }}</p>
                  <p>
                    Bairro: {{ publication.DestinationAddress.neighborhood }}
                  </p>
                  <p>Rua: {{ publication.DestinationAddress.street }}</p>
                  <p>Nº: {{ publication.DestinationAddress.number }}</p>
                </v-card-text>
              </v-col>
            </v-row>
            <v-divider class="mt-2"></v-divider>
            <v-row class="mt-0 mb-0">
              <v-card-text class="text-content">
                <p>Hora de saida - {{ publication.departure_hour }}</p>
                <p>Modalidade - {{ publication.modality }}</p>
              </v-card-text>
            </v-row>
            <v-container class="pa-0 ma-0">
              <v-card-actions class="pa-0 ma-0">
                <v-row class="pa-0 ma-0">
                  <v-col cols="4" class="pa-0 ma-0">
                    <v-btn
                      color="blue darken-2"
                      elevation="2"
                      block
                      outlined
                      rounded
                      @click="prepareEditPost(index)"
                    >
                      <v-icon v-if="cardIcon">edit</v-icon>
                      <span v-else>Editar</span>
                    </v-btn>
                  </v-col>
                  <v-col cols="4" class="pa-0 ma-0">
                    <v-btn
                      :disabled="!publication.vacancies"
                      color="yellow accent-2"
                      elevation="2"
                      block
                      outlined
                      rounded
                      @click="finishPost(index)"
                    >
                      <v-icon v-if="cardIcon">check_circle_outline</v-icon>
                      <span v-else>Encerrar</span>
                    </v-btn>
                  </v-col>
                  <v-col cols="4" class="pa-0 ma-0">
                    <v-btn
                      :disabled="!publication.statusPublication"
                      color="red darken-2"
                      elevation="2"
                      block
                      outlined
                      rounded
                      @click="cancelPost(index)"
                    >
                      <v-icon v-if="cardIcon">cancel</v-icon>
                      <span v-else>Cancelar</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-container>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialogNewPost" persistent max-width="450px" scrollable>
        <v-col>
          <v-card>
            <v-form @submit.prevent="postForm" v-model="valid">
              <v-container>
                <v-row>
                  <v-col>
                    <v-card-text>
                      <h1>Cadastrar nova Carona</h1>
                    </v-card-text>

                    <v-card-text>
                      <h2>De onde estou Saindo</h2>

                      <v-text-field
                        v-model="publication.origin_city"
                        :rules="[rules.required]"
                        label="Nome da cidade"
                      />

                      <v-text-field
                        v-model="publication.origin_neighborhood"
                        :rules="[rules.required]"
                        label="Nome do Bairro"
                      />

                      <v-text-field
                        v-model="publication.origin_street"
                        :rules="[rules.required]"
                        label="Nome da Rua "
                      />

                      <v-text-field
                        v-model="publication.origin_number"
                        :rules="[rules.required]"
                        label="Nº"
                        type="number"
                      />

                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="publication.departure_date"
                            :rules="[rules.required]"
                            label="Data da carona"
                            type="datetime-local"
                          />
                        </v-col>
                      </v-row>
                    </v-card-text>

                    <v-card-text>
                      <h2>Pra onde estou Indo</h2>

                      <v-text-field
                        v-model="publication.destination_city"
                        :rules="[rules.required]"
                        label="Noma da cidade"
                      />

                      <v-text-field
                        v-model="publication.destination_neighborhood"
                        :rules="[rules.required]"
                        label="Nome do Bairro"
                      />

                      <v-text-field
                        v-model="publication.destination_street"
                        :rules="[rules.required]"
                        label="Nome da Rua"
                      />

                      <v-text-field
                        v-model="publication.destination_number"
                        :rules="[rules.required]"
                        label="Nº"
                        type="number"
                      />
                    </v-card-text>

                    <v-card-text>
                      <h2>Caracteristicas da carona</h2>
                      <v-row>
                        <v-col cols="6">
                          <v-select
                            v-model="publication.modality"
                            :items="modalidade"
                            placeholder="Selecione a Modalidade da Carona"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-row class="regularity-group pa-0">
                            <v-col class="regularity-label-col" cols="9">
                              <span>Carona regular?: </span>
                            </v-col>
                            <v-col class="regularity-switch-col" cols="3">
                              <v-switch
                                class="regularity-switch"
                                v-model="publication.regular"
                              ></v-switch>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6" sm="6" xm="6">
                    <v-btn
                      v-if="editablePost"
                      :loading="saveLoading"
                      :disabled="!valid"
                      color="primary"
                      block
                      @click="saveUpdateOnPost"
                    >
                      Salvar
                    </v-btn>
                    <v-btn
                      v-else
                      :loading="saveLoading"
                      :disabled="!valid"
                      color="primary"
                      block
                      type="submit"
                    >
                      Salvar Carona
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="6" sm="6" xm="6">
                    <v-btn
                      color="error"
                      outlined
                      block
                      @click="(dialogNewPost = false), (editablePost = false)"
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
      <v-dialog v-model="dialogFinishVacancies" max-width="300">
        <v-card>
          <v-card-title class="text-h5">
            Tem certeza de que deseja as vagas desta carona?
          </v-card-title>
          <v-card-actions>
            <v-row class="pa-0 ma-0">
              <v-col cols="6">
                <v-btn
                  color="green darken-1"
                  :loading="finishVacanciesLoading"
                  elevation="2"
                  block
                  outlined
                  rounded
                  @click="ConfirmedFinishPost()"
                >
                  Sim
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  color="red darken-1"
                  elevation="2"
                  block
                  outlined
                  rounded
                  @click="dialogFinishVacancies = false"
                >
                  Não
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialogCancelRide" max-width="300">
        <v-card>
          <v-card-title class="text-h5">
            Tem certeza de que deseja cancelar carona?
          </v-card-title>
          <v-card-actions>
            <v-row class="pa-0 ma-0">
              <v-col cols="6">
                <v-btn
                  color="green darken-1"
                  :loading="cancelRideLoading"
                  elevation="2"
                  block
                  outlined
                  rounded
                  @click="ConfirmedCancelPost()"
                >
                  Sim
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  color="red darken-1"
                  elevation="2"
                  block
                  outlined
                  rounded
                  @click="dialogCancelRide = false"
                >
                  Não
                </v-btn>
              </v-col>
            </v-row>
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
      modalidade: ["Livre", "Contribuitiva"],
      cardWidth2: 1,
      cardWidth: 1,
      publications: [
        /* {
          date_original: "2022-12-23T18:45:00.000Z",
          departure_hour: "15:45 PM",
          departure_date: "23/12/2022",
          id: "2e66431c-f0fb-405b-97c6-89d3340f1c72",
          id_user: "41b2c605-1f7d-4f41-baeb-b3a6c8808ca4",
          modality: "Livre",
          regular: true,
          statusPublication: true,
          vacancies: true,
          DestinationAddress: {
            id: "8a0ca4a6-9121-4061-adc4-e4ba154fdbd4",
            city: "Cidade 2",
            neighborhood: "Bairro 2",
            street: "Rua 2",
            number: "2",
          },
          OriginAddress: {
            id: "97aaecea-d1d5-4711-ac81-0993aa74b73f",
            city: "Cidade 2",
            neighborhood: "Bairro 1",
            street: "Rua 1",
            number: "1",
          },
        }, */
      ],
      publication: {
        id_user: "1",
        departure_date: "",
        origin_city: "",
        origin_neighborhood: "",
        origin_street: "",
        origin_number: "",
        destination_city: "",
        destination_neighborhood: "",
        destination_street: "",
        destination_number: "",
        regular: false,
        modality: "Livre",
      },
      userData: {
        id: "1",
        Vehicle: [{ id_user: "", avatar: "", brand: "", model: "" }],
        StatusRequest: [{ id_user: "" }],
      },
      alertMessage: "Erro ao conectar-se ao banco de dados!",
      dialogNewPost: false,
      dialogFinishVacancies: false,
      dialogCancelRide: false,
      saveLoading: false,
      finishVacanciesLoading: false,
      cancelRideLoading: false,
      alertInfo: false,
      alertError: false,
      alertSuccess: false,
      loading: false,
      loader: null,
      valid: true,
      cardIcon: false,
      editablePost: false,
      indexPub: "",
      rules: {
        required: (value) => !!value || "Obrigatório.",
      },
    };
  },
  methods: {
    async postForm() {
      this.saveLoading = true;
      this.loader = this.saveLoading;
      this.publication.id_user = this.userData.id;
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await User.createNewPost(this.publication);
        this.loader = null;
        this.saveLoading = false;
        this.dialogNewPost = false;
        this.showSuccessAlert(true, "Carona criada com Sucesso.");
        this.getAllPosts(this.userData.id);
      } catch (error) {
        this.loader = null;
        this.saveLoading = false;
        console.log(error.response);
        this.dialogNewPost = false;
        this.showErrorAlert(true, error.response.data.message);
      }
    },

    async getAllPosts(idUser) {
      this.loading = true;
      try {
        const res = await User.getAllPostsByIdUser(idUser);
        //console.log(res);
        if (res.data.length == 0) {
          this.alertInfo = true;
        } else {
          this.publications = res.data;
        }
        this.loading = false;
      } catch (error) {
        this.erroAlert = true;
        this.loading = false;
        this.messageError = error.response.data.message;
        this.loading = false;
        console.log(error.response);
      }
    },

    async saveUpdateOnPost() {
      this.saveLoading = true;
      this.loader = this.saveLoading;
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await User.editPost(this.publication);
        this.loader = null;
        this.saveLoading = false;
        this.dialogNewPost = false;
        this.showSuccessAlert(true, "Carona alterada com Sucesso.");
        this.getAllPosts(this.userData.id);
      } catch (error) {
        this.loader = null;
        this.saveLoading = false;
        console.log(error.response);
        this.dialogNewPost = false;
        this.showErrorAlert(true, error.response.data.message);
      }
    },

    finishPost(index) {
      this.indexPub = index;
      this.dialogFinishVacancies = true;
    },

    cancelPost(index) {
      this.indexPub = index;
      this.dialogCancelRide = true;
    },

    async ConfirmedFinishPost() {
      this.finishVacanciesLoading = true;
      this.loader = this.finishVacanciesLoading;
      let data = {
        id: this.publications[this.indexPub].id,
        vacancies: false,
      };
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await User.finishVacanciesPost(this.userData.id, data);
        this.loader = null;
        this.finishVacanciesLoading = false;
        this.showSuccessAlert(true, "Vagas da carona encerradas com Sucesso.");
        this.dialogFinishVacancies = false;
        this.getAllPosts(this.userData.id);
      } catch (error) {
        this.loader = null;
        this.finishVacanciesLoading = false;
        this.dialogFinishVacancies = false;
        console.log(error.response);
        this.showErrorAlert(true, error.response.data.message);
      }
    },

    async ConfirmedCancelPost() {
      this.cancelRideLoading = true;
      this.loader = this.cancelRideLoading;
      let data = {
        id: this.publications[this.indexPub].id,
        statusPublication: false,
      };
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await User.cancelPost(this.userData.id, data);
        this.loader = null;
        this.cancelRideLoading = false;
        this.showSuccessAlert(true, "Carona cancelada com Sucesso.");
        this.dialogCancelRide = false;
        this.getAllPosts(this.userData.id);
      } catch (error) {
        this.loader = null;
        this.cancelRideLoading = false;
        this.dialogCancelRide = false;
        console.log(error.response);
        this.showErrorAlert(true, error.response.data.message);
      }
    },

    prepareEditPost(index) {
      this.editablePost = true;
      this.publication = {
        id: this.publications[index].id,
        id_user: this.publications[index].id_user,
        departure_date: this.publications[index].departure_date,
        origin_city: this.publications[index].OriginAddress.city,
        origin_neighborhood:
          this.publications[index].OriginAddress.neighborhood,
        origin_street: this.publications[index].OriginAddress.street,
        origin_number: this.publications[index].OriginAddress.number,
        destination_city: this.publications[index].DestinationAddress.city,
        destination_neighborhood:
          this.publications[index].DestinationAddress.neighborhood,
        destination_street: this.publications[index].DestinationAddress.street,
        destination_number: this.publications[index].DestinationAddress.number,
        regular: this.publications[index].regular,
        modality: this.publications[index].modality,
      };
      this.dialogNewPost = true;
      console.log(this.publication);
    },

    showErrorAlert(status, message) {
      this.alertError = status;
      this.alertMessage = message;
    },

    showSuccessAlert(status, message) {
      this.alertMessage = message;
      this.alertSuccess = status;
      setTimeout(() => {
        this.finishiProcess();
      }, 3000);
    },

    finishiProcess() {
      this.alertSuccess = false;
    },

    widthListener(value) {
      if ((value <= 800 && value >= 600) || value <= 430) {
        this.cardIcon = true;
      } else {
        this.cardIcon = false;
      }
    },
  },
  created() {
    if (sessionStorage.getItem("userLocal")) {
      this.userData = JSON.parse(sessionStorage.getItem("userLocal"));
      this.getAllPosts(this.userData.id);
    }
    this.widthListener(window.innerWidth)
  },
  mounted() {
    window.onresize = () => {
      this.widthListener(window.innerWidth)
    };
  },
};
</script>
<style lang="css" scoped>
.border {
  border: 1px red solid;
}

.fab-new-post {
  z-index: 4;
  position: fixed;
  bottom: 16px;
  right: 16px;
}

.text-title {
  margin: 5px 5px 5px 16px;
  padding: 0;
  font-size: 1.5rem !important;
  font-weight: 400;
}

.text-content {
  margin: 5px 5px 5px 16px;
  padding: 0;
  width: auto;
  font-size: 1rem !important;
}

.text-content p {
  margin-bottom: 2px;
}

.regularity-group {
  margin-top: 22px;
  padding: 0;
}

.regularity-group span {
  font-size: 1.3em;
}

.regularity-label-col {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}
.regularity-switch-col {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  min-height: 0;
}

.regularity-switch {
  padding: 0;
  margin: 0;
  max-height: 24px;
}

.v-messages {
  min-height: 0;
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

.t1,
.t2,
.t3 {
  margin: 5px;
  font-size: 12px;
}
</style>
