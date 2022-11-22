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
        <v-card elevation="6" min-width="360px">
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
                  <p>Bairro: {{ publication.OriginAddress.district }}</p>
                  <p>Rua: {{ publication.OriginAddress.road }}</p>
                  <p>Nº: {{ publication.OriginAddress.number }}</p>
                </v-card-text>
              </v-col>
              <v-divider vertical class="mt-2"></v-divider>
              <v-col cols="6" class="pa-0 ma-0">
                <v-card-title class="text-title">Destino</v-card-title>
                <v-card-text class="text-content">
                  <p>Cidade: {{ publication.DestinationAddress.city }}</p>
                  <p>Bairro: {{ publication.DestinationAddress.district }}</p>
                  <p>Rua: {{ publication.DestinationAddress.road }}</p>
                  <p>Nº: {{ publication.DestinationAddress.number }}</p>
                </v-card-text>
              </v-col>
            </v-row>
            <v-divider class="mt-2"></v-divider>
            <v-row class="mt-0 mb-0">
              <v-card-text class="text-content">
                <p>Hora de saida - {{ publication.departure_date }}</p>
                <p>Modalidade - {{ publication.modality }}</p>
              </v-card-text>
            </v-row>
            <v-row>
              <v-card-actions>
                <v-btn
                  color="blue darken-2"
                  block
                  elevation="2"
                  outlined
                  rounded
                >
                  Editar
                </v-btn>
                <v-btn
                  color="red darken-2"
                  block
                  elevation="2"
                  outlined
                  rounded
                >
                  Encerrar
                </v-btn>
              </v-card-actions>
            </v-row>
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
                      <h1>Cadastrar nova carona</h1>
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
                            type="date"
                          />
                        </v-col>
                        <!-- <v-col cols="6">
                          <v-text-field
                            v-model="publication.departure_hour"
                            :rules="[rules.required]"
                            label="Hora da carona"
                            type="time"
                          />
                        </v-col> -->
                      </v-row>
                    </v-card-text>

                    <v-card-text>
                      <h2>Pra onde estou indo</h2>

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
                      @click="dialogNewPost = false"
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
      modalidade: ["Livre", "Contribuitiva"],
      publications: [],
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
      saveLoading: false,
      alertInfo: false,
      alertError: false,
      alertSuccess: false,
      loading: false,
      loader: null,
      valid: false,
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
        
        console.log(this.publication);
        // eslint-disable-next-line no-unused-vars
        const res = await User.createNewPost(this.publication);
        this.loader = null;
        this.dialogNewPost = false;
        this.showSuccessAlert(true, "Carona criada com Sucesso.");
      } catch (error) {
        this.loader = null;
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
        if (res.data) {
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
      //this.$router.go();
    },
  },
  created() {
    if (sessionStorage.getItem("userLocal")) {
      this.userData = JSON.parse(sessionStorage.getItem("userLocal"));
      this.getAllPosts(this.userData.id);
    }
  },
  watch: {},
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
</style>
