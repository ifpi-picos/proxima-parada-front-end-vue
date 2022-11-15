<template>
  <v-container fluid>
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
      <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" md="4" lg="3">
        <v-card :color="item.color" dark>
          <v-card-title class="text-h5" v-text="item.bairro"></v-card-title>
          <v-card-subtitle v-text="item.driver"></v-card-subtitle>
          <v-card-actions>
            <v-btn outlined small> Editar carona </v-btn>
            <v-btn outlined small> Encerrar carona </v-btn>
          </v-card-actions>
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
                      <h1>Cadastrar no carona</h1>
                    </v-card-text>

                    <v-card-text>
                      <h2>De onde estou Saindo</h2>

                      <v-text-field
                        v-model="publication.origin_district"
                        :rules="[rules.required]"
                        label="Nome do Bairro"
                        placeholder="Bairro Junco "
                      />

                      <v-text-field
                        v-model="publication.origin_road"
                        :rules="[rules.required]"
                        label="Nome da Rua "
                        placeholder="Rua do pcc"
                      />

                      <v-text-field
                        v-model="publication.origin_number"
                        placeholder="288"
                        type="number"
                      />

                      <v-text-field
                        v-model="publication.departure_date"
                        label="Digite o Dia Mes e Ano "
                        placeholder=" 01/02/2022"
                        type="date"
                      />

                      <!-- <v-text-field
                        v-model="time"
                        label="Digite a hora da Saída"
                        placeholder=" 12:00"
                        type="time"
                      /> -->
                    </v-card-text>

                    <v-card-text>
                      <h2>Pra onde vou</h2>
                      <v-text-field
                        ref="address"
                        v-model="publication.destination_district"
                        label="Digite o nome do Bairro "
                        placeholder="Bairro pantanal"
                      />

                      <v-text-field
                        v-model="publication.destination_road"
                        label="Digite o nome da rua "
                        placeholder="Qudra 04 "
                      />

                      <v-text-field
                        v-model="publication.destination_number"
                        type="number"
                        label="Digite o numero da casa"
                        placeholder=" 265 "
                      />
                    </v-card-text>

                    <v-card-text>
                      <h2>Dados do Veiculos e Caracteristicas da Carona</h2>
                      <v-select
                        ref="veiculos"
                        :items="veiculos"
                        label="Selecione seu Veículos"
                      />

                      <v-text-field label="informe a Cor de Seu Veículo" />

                      <h2>Modalidade da carona</h2>
                      <v-select
                        ref="modalidade"
                        :items="modalidade"
                        placeholder="Selecione a Modalidade da Carona"
                      />
                      <h2>Frequência da Carona</h2>
                      <v-select
                        ref="semanas"
                        :items="dias"
                        placeholder="Qual e a frequências dessa carona"
                      />
                      <v-select
                        :items="dias"
                        multiple
                        label="Selecione os dias da semana"
                      />
                      <h2>Frequência das caronas</h2>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-radio-group v-model="type" row>
                              <v-radio label="Regular" value="number"></v-radio>
                              <v-radio label="Não-Regular" value="selector" />
                            </v-radio-group>
                            <v-text-field
                              v-if="type === 'selector'"
                              v-model="selector"
                              label="Selector"
                            />

                            <v-select
                              :items="naoRegular"
                              multiple
                              v-if="type === 'number'"
                              v-model="number"
                              type="number"
                              label="selecione os dia da semana"
                            >
                            </v-select>
                          </v-col>
                        </v-row>
                      </v-container>
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
      items: [
        {
          color: "#7cc1cb",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          bairro: "Centro",
          driver: "Afonso",
        },
        {
          color: "#7cc1cb",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          bairro: "Pantanal",
          driver: "Roberto",
        },
        {
          color: "#7cc1cb",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          bairro: "Balao",
          driver: "CArlos",
        },
        {
          color: "#7cc1cb",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          bairro: "Morrinhos",
          driver: "Amanda",
        },
        {
          color: "#7cc1cb",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          bairro: "Catavento",
          driver: "Maria",
        },
        {
          color: "#7cc1cb",
          src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
          bairro: "Cohab",
          driver: "Pedro",
        },
      ],
      publications: [],
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
  },
  created() {
    if (sessionStorage.getItem("userLocal")) {
      this.userData = JSON.parse(sessionStorage.getItem("userLocal"));
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
