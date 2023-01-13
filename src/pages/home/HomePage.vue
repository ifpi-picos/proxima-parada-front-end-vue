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
        <v-card elevation="6" min-width="300px" min-height="161px">
          <v-container>
            <v-expand-transition>
              <div v-if="!publication.expand" @click="expandON(index)">
                <v-row class="mt-0 mb-0">
                  <v-col cols="6" class="pa-0 ma-0" min-width="150px">
                    <v-card-title class="text-title">Origem</v-card-title>
                    <v-card-text class="text-content">
                      <p>Cidade: {{ publication.OriginAddress.city }}</p>
                      <p>
                        Bairro: {{ publication.OriginAddress.neighborhood }}
                      </p>
                    </v-card-text>
                  </v-col>
                  <v-divider vertical class="mt-2"></v-divider>
                  <v-col cols="6" class="pa-0 ma-0" min-width="150px">
                    <v-card-title class="text-title">Destino</v-card-title>
                    <v-card-text class="text-content">
                      <p>Cidade: {{ publication.DestinationAddress.city }}</p>
                      <p>
                        Bairro:
                        {{ publication.DestinationAddress.neighborhood }}
                      </p>
                    </v-card-text>
                  </v-col>
                </v-row>
              </div>
            </v-expand-transition>

            <div @click="expandOFF(index)">
              <v-expand-transition>
                <div v-if="publication.expand">
                  <v-row>
                    <v-col cols="9" class="column-header">
                      <v-card-title class="text-title">
                        {{ publication.User.name }}
                      </v-card-title>
                      <v-card-subtitle class="text-subtitle">
                        {{ publication.User.occupation }}
                      </v-card-subtitle>
                    </v-col>
                    <v-col
                      cols="3"
                      class="d-flex justify-center align-center pa-0"
                    >
                      <v-avatar size="70px">
                        <v-img :src="publication.User.avatar" />
                      </v-avatar>
                    </v-col>
                  </v-row>
                  <v-divider class="mt-3"></v-divider>
                  <v-row class="mt-0 mb-0">
                    <v-col cols="6" class="pa-0 ma-0">
                      <v-card-title class="text-title">Origem</v-card-title>
                      <v-card-text class="text-content">
                        <p>Cidade: {{ publication.OriginAddress.city }}</p>
                        <p>
                          Bairro: {{ publication.OriginAddress.neighborhood }}
                        </p>
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
                          Bairro:
                          {{ publication.DestinationAddress.neighborhood }}
                        </p>
                        <p>Rua: {{ publication.DestinationAddress.street }}</p>
                        <p>Nº: {{ publication.DestinationAddress.number }}</p>
                      </v-card-text>
                    </v-col>
                  </v-row>
                  <v-divider class="mt-2"></v-divider>
                  <v-row class="mt-0 mb-0">
                    <v-card-text class="text-content">
                      <p>
                        Date e hora de saida - {{ publication.departure_date }}
                        {{ publication.departure_hour }}
                      </p>
                      <p>Modalidade - {{ publication.modality }}</p>
                    </v-card-text>
                  </v-row>
                </div>
              </v-expand-transition>
            </div>
            <v-expand-transition>
              <div v-if="publication.expand">
                <v-row>
                  <v-card-actions class="block">
                    <v-btn
                      color="blue darken-2"
                      block
                      elevation="2"
                      outlined
                      rounded
                      @click="callPhone(publication.User.phone_number)"
                    >
                      Conversar com o motorista
                    </v-btn>
                  </v-card-actions>
                </v-row>
              </div>
            </v-expand-transition>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import User from "@/services/user";

export default {
  data: () => ({
    publications: [
      /* {
        User: {
          name: "Teste 1 Teste",
          avatar:
            "https://storage.googleapis.com/proxima-parada-storage.appspot.com/users%2F41b2c605-1f7d-4f41-baeb-b3a6c8808ca4.jpg",
          occupation: "Aluno(a)",
          Vehicle: [
            {
              vehicle_type: "Carro",
              brand: "Volkswagen",
              model: "Goll",
              vehicle_color: "Azull",
              license_plate: "234234234",
            },
          ],
        },
        departure_hour: "03:35 AM",
        departure_date: "23/11/2022",
        id: "c6c469be-c838-466a-b360-1836054a4488",
        id_user: "41b2c605-1f7d-4f41-baeb-b3a6c8808ca4",
        modality: "Livre",
        regular: false,
        statusPublication: true,
        vacancies: true,
        DestinationAddress: {
          id: "577fc3ba-0a6d-449a-a3a5-6327ebb8f749",
          city: "teste hora 03:35 AM",
          neighborhood: "teste hora 03:35 AM",
          street: "teste hora 03:35 AM",
          number: "35",
        },
        OriginAddress: {
          id: "1b68aff2-4c17-46b4-873d-b04b741de917",
          city: "teste hora 03:35 AM",
          neighborhood: "teste hora 03:35 AM",
          street: "teste hora 03:35 AM",
          number: "03",
        },
        expand: false,
      },
      {
        User: {
          name: "Teste 1 Teste",
          avatar:
            "https://storage.googleapis.com/proxima-parada-storage.appspot.com/users%2F41b2c605-1f7d-4f41-baeb-b3a6c8808ca4.jpg",
          occupation: "Aluno(a)",
          Vehicle: [
            {
              vehicle_type: "Carro",
              brand: "Volkswagen",
              model: "Goll",
              vehicle_color: "Azull",
              license_plate: "234234234",
            },
          ],
        },
        departure_hour: "03:55 AM",
        departure_date: "23/11/2022",
        id: "7cc3b799-223b-4500-be19-9067061a620d",
        id_user: "41b2c605-1f7d-4f41-baeb-b3a6c8808ca4",
        modality: "Livre",
        regular: false,
        statusPublication: true,
        vacancies: true,
        DestinationAddress: {
          id: "7d24fca2-861c-4a9b-ae4b-c53ea4e9413a",
          city: "teste hora 03:55 AM",
          neighborhood: "teste hora 03:55 AM",
          street: "teste hora 03:55 AM",
          number: "55",
        },
        OriginAddress: {
          id: "8faae428-76d4-44f3-b9e9-01d65fcb4098",
          city: "teste hora 03:55 AM",
          neighborhood: "teste hora 03:55 AM",
          street: "teste hora 03:55 AM",
          number: "03",
        },
        expand: false,
      },
      {
        User: {
          name: "Teste 1 Teste",
          avatar:
            "https://storage.googleapis.com/proxima-parada-storage.appspot.com/users%2F41b2c605-1f7d-4f41-baeb-b3a6c8808ca4.jpg",
          occupation: "Aluno(a)",
          Vehicle: [
            {
              vehicle_type: "Carro",
              brand: "Volkswagen",
              model: "Goll",
              vehicle_color: "Azull",
              license_plate: "234234234",
            },
          ],
        },
        departure_hour: "05:15 AM",
        departure_date: "23/11/2022",
        id: "1e46858e-627c-4dfd-acf8-3c57be014754",
        id_user: "41b2c605-1f7d-4f41-baeb-b3a6c8808ca4",
        modality: "Livre",
        regular: true,
        statusPublication: true,
        vacancies: true,
        DestinationAddress: {
          id: "e3888aaa-9ba8-495a-9987-5e96b762c382",
          city: "teste hora 05:15 Am",
          neighborhood: "Bairro 1",
          street: "Rua 1",
          number: "1",
        },
        OriginAddress: {
          id: "64696b3a-3c13-4d6e-a7b4-88dec6d1a9d9",
          city: "teste hora 05:15 Am",
          neighborhood: "Bairro 2",
          street: "Rua 2",
          number: "2",
        },
        expand: false,
      }, */
    ],
    messageError: "Erro ao conectar-se ao banco de dados!",
    loading: false,
    expand: false,
    alertInfo: false,
    erroAlert: false,
    userData: {
      id: "1",
      Vehicle: [{ id_user: "", avatar: "", brand: "", model: "" }],
      StatusRequest: [{ id_user: "" }],
    },
  }),
  methods: {
    async getAllPosts() {
      this.loading = true;
      this.publications = [];
      try {
        const res = await User.getAllPosts();
        if (res.data.length == 0) {
          this.alertInfo = true;
        } else {
          this.publications = res.data.map((element) => {
            return { ...element, expand: false };
          });
        }
        this.loading = false;
      } catch (error) {
        this.erroAlert = true;
        this.loading = false;
        this.messageError = error.response.data.message;
        this.loading = false;
        console.log(error.response.message);
      }
    },

    callPhone(phone) {
      phone = phone.replace(/\D/gim, "");
      window.open("https://wa.me/55" + phone, "_blank");
    },

    expandON(index) {
      this.publications[index].expand = true;
    },

    expandOFF(index) {
      this.publications[index].expand = false;
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
<style lang="scss" scoped>
.border-red {
  border: 1px solid red;
}

.btn-talk {
  z-index: 4;
}
.border-black {
  border: 1px solid black;
}

.block {
  width: 100%;
}

.border-blue {
  border: 1px solid blue;
}

.column-header {
  padding: 0;
  min-height: 80px;
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

.text-content-expand-in {
  margin: 5px 5px 5px 16px;
  padding: 0;
  font-size: 1rem !important;
}
.text-content p {
  margin-bottom: 2px;
}

.text-subtitle {
  margin: 5px 5px 5px 16px;
  padding: 0;
  font-size: 1.2rem !important;
}

.container {
  min-width: 360px;
}
</style>
