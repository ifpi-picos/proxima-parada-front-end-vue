<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="(publication, index) in publications" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="9" class="pb-0 pt-0">
                <v-card-title
                  class="text-h5"
                  v-text="publication.User.name"
                ></v-card-title>
                <v-card-subtitle
                  v-text="publication.User.occupation"
                ></v-card-subtitle>
              </v-col>
              <v-col cols="3" class="d-flex justify-center align-center pa-0">
                <v-avatar size="70px">
                  <v-img :src="publication.User.avatar" />
                </v-avatar>
              </v-col>
            </v-row>
            <v-divider></v-divider>
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
      <!-- <v-col v-for="(item, i) in items" :key="i" cols="12" sm="6" md="4" lg="3">
        <v-card :color="item.color" dark>
          <v-card-title class="text-h5" v-text="item.bairro"></v-card-title>
          <v-card-subtitle v-text="item.driver"></v-card-subtitle>
          <v-card-actions>
            <v-btn outlined small> Conversar com o motorista </v-btn>
          </v-card-actions>
        </v-card>
      </v-col> -->
    </v-row>
  </v-container>
</template>
<script>
import User from "@/services/user";

export default {
  data: () => ({
    publications: [],

    items: [
      {
        color: "#a8a8a8",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        bairro: "Centro",
        driver: "Afonso",
      },
      {
        color: "#a8a8a8",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        bairro: "Pantanal",
        driver: "Roberto",
      },
      {
        color: "#a8a8a8",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        bairro: "Balao",
        driver: "CArlos",
      },
      {
        color: "#a8a8a8",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        bairro: "Morrinhos",
        driver: "Amanda",
      },
      {
        color: "#a8a8a8",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        bairro: "Catavento",
        driver: "Maria",
      },
      {
        color: "#a8a8a8",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        bairro: "Cohab",
        driver: "Pedro",
      },
    ],

    userData: {
      id: "1",
      Vehicle: [{ id_user: "", avatar: "", brand: "", model: "" }],
      StatusRequest: [{ id_user: "" }],
    },
  }),
  methods: {
    async getAllPosts() {
      try {
        const res = await User.getAllPosts();
        this.publications = res.data;
      } catch (error) {
        console.log(error.response.message);
      }
    },
  },
  created() {
    if (sessionStorage.getItem("userLocal")) {
      this.userData = JSON.parse(sessionStorage.getItem("userLocal"));
    }
    this.getAllPosts();
  },
};
</script>
<style>
.border {
  border: 1px solid red;
}

.container {
  min-width: 360px;
}
</style>
