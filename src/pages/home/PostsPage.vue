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
      :value="erroAlert"
      color="red"
      elevation="3"
      outlined
      type="warning"
      >{{ messageError }}</v-alert
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

    <v-row dense>
      <v-col
        v-for="(publication, index) in publications"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card color="#67f5ffb2">
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-card-title>Origem</v-card-title>
                <v-card-text>
                  <p>
                    {{ publication.OriginAddress.city }} -
                    {{ publication.OriginAddress.district }}
                  </p>
                  <p>
                    {{ publication.OriginAddress.road }} -
                    {{ publication.OriginAddress.number }}
                  </p>
                </v-card-text>
              </v-col>
              <v-col cols="6">
                <v-card-title>Destino</v-card-title>
                <v-card-text>
                  <p>
                    {{ publication.DestinationAddress.city }} -
                    {{ publication.DestinationAddress.district }}
                  </p>
                  <p>
                    {{ publication.DestinationAddress.road }} -
                    {{ publication.DestinationAddress.number }}
                  </p>
                </v-card-text>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-card-text>
                <p>Hora de saida - {{ publication.departure_date }}</p>
                <p>Disponibilidade - {{ publication.vacancies }}</p>
              </v-card-text>
            </v-row>
            <v-row>
              <v-card-actions>
                <v-btn outlined small> Conversar com o motorista </v-btn>
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
            <v-alert
              :value="false"
              color="red"
              elevation="3"
              outlined
              :type="alertType"
              >{{ alertMessage }}</v-alert
            >
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
                        v-model="publication.origin_district"
                        :rules="[rules.required]"
                        label="Nome do Bairro"
                      />

                      <v-text-field
                        v-model="publication.origin_road"
                        :rules="[rules.required]"
                        label="Nome da Rua "
                      />

                      <v-text-field
                        v-model="publication.origin_number"
                        :rules="[rules.required]"
                        label="Nº"
                        type="number"
                      />

                      <v-text-field
                        v-model="publication.departure_date"
                        :rules="[rules.required]"
                        label="Digite o Dia Mes e Ano "
                        type="date"
                      />
                    </v-card-text>

                    <v-card-text>
                      <h2>Pra onde estou indo</h2>

                      <v-text-field
                        v-model="publication.destination_city"
                        :rules="[rules.required]"
                        label="Noma da cidade"
                      />

                      <v-text-field
                        v-model="publication.destination_district"
                        :rules="[rules.required]"
                        label="Nome do Bairro"
                      />

                      <v-text-field
                        v-model="publication.destination_road"
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
                      <v-select
                        v-model="publication.modality"
                        :items="modalidade"
                        placeholder="Selecione a Modalidade da Carona"
                      />
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6" sm="6" xm="6">
                    <v-btn color="primary" block type="submit">
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
      messageError: "Erro ao conectar-se ao banco de dados!",
      loading: false,
      erroAlert: false,
      publication: {
        id_user: "1",
        origin_city: "Picos",
        origin_district: "",
        origin_road: "",
        origin_number: "",
        origin_longitude: "0000",
        origin_latitude: "0000",
        departure_date: "",
        destination_city: "Picos",
        destination_district: "",
        destination_road: "",
        destination_number: "",
        destination_longitude: "0000",
        destination_latitude: "0000",
        regular: false,
        vacancies: "há vagas",
        modality: "Livre",
      },
      userData: {
        id: "1",
        Vehicle: [{ id_user: "", avatar: "", brand: "", model: "" }],
        StatusRequest: [{ id_user: "" }],
      },
      dialogNewPost: false,
      rules: {
        required: (value) => !!value || "Obrigatório.",
      },
    };
  },
  methods: {
    async postForm() {
      this.publication.id_user = this.userData.id;
      try {
        const res = await User.createNewPost(this.publication);
        console.log(res);
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async getAllPosts(idUser) {
      this.loading = true;
      try {
        const res = await User.getAllPostsByIdUser(idUser);
        this.publications = res.data;
        this.loading = false;
      } catch (error) {
        this.erroAlert = true;
        this.loading = false;
        this.messageError = error.response.data.message;
        this.loading = false;
        console.log(error.response.message);
      }
    },
  },
  created() {
    if (sessionStorage.getItem("userLocal")) {
      this.userData = JSON.parse(sessionStorage.getItem("userLocal"));
      this.getAllPosts(this.userData.id)
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
</style>
