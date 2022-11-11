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
      <v-col
        v-for="(requisition, i) in requisitions"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="mx-auto"
          outlined
          @click.stop="openDialoStatusRequest(requisition)"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ requisition.User.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-h5 mb-1">{{
                requisition.User.occupation
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="100" v-if="!requisition.User.avatar">
              <v-img
                src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
              />
            </v-list-item-avatar>
            <v-list-item-avatar v-else size="80">
              <v-img
                v-if="requisition.User.avatar"
                :src="requisition.User.avatar"
              />
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog
        v-model="dialogConfirmStatusRequest"
        persistent
        max-width="800px"
      >
        <v-card>
          <v-container>
            <v-row>
              <v-col cols="12" sm="8" md="8">
                <v-container>
                  <v-card-title class="pa-0 ma-0 mb-6">
                    <span class="text-h4">Informações do usuário</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row class="pa-0 ma-0 pb-0">
                      <v-col cols="12" sm="8" md="8" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.User.name"
                        />
                      </v-col>
                      <v-col cols="12" sm="4" md="4" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.User.occupation"
                        />
                      </v-col>
                    </v-row>
                    <v-row class="pa-0 ma-0">
                      <v-col cols="12" sm="7" md="7" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.User.email"
                        />
                      </v-col>
                      <v-col cols="12" sm="5" md="5" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.User.phone"
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-container>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-container fill-height fluid class="pa-0">
                  <v-row justify="center">
                    <v-avatar size="204" v-if="!selectedItem.User.avatar">
                      <v-img
                        src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                      />
                    </v-avatar>
                    <v-avatar v-else size="156">
                      <v-img
                        v-if="selectedItem.User.avatar"
                        :src="selectedItem.User.avatar"
                      />
                    </v-avatar>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="8" md="8">
                <v-container>
                  <v-card-title class="pa-0 ma-0 mb-6">
                    <span class="text-h4">Informações do Veiculo</span>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          outlined
                          readonly
                          v-model="selectedItem.User.Vehicle[0].brand"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          outlined
                          readonly
                          v-model="selectedItem.User.Vehicle[0].model"
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-container>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-container fill-height fluid class="pa-0">
                  <v-row justify="center">
                    <v-avatar
                      size="204"
                      tile
                      v-if="!selectedItem.User.Vehicle[0].avatar"
                    >
                      <v-img
                        src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                      />
                    </v-avatar>
                    <v-avatar v-else size="204" tile>
                      <v-img
                        v-if="selectedItem.User.Vehicle[0].avatar"
                        :src="selectedItem.User.Vehicle[0].avatar"
                      />
                    </v-avatar>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-card-actions>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    color="error"
                    block
                    @click="dialogConfirmStatusRequest = false"
                  >
                    Close
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    color="success"
                    block
                    @click="dialogConfirmStatusRequest = false"
                  >
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import Requisition from "../../services/requisition";
export default {
  data: () => ({
    requisitions: [
      {
        id: "2610267b-1cfb-4ebf-9ff3-79e001d11164",
        status: true,
        readed: true,
        id_user: "e8458b0b-2b9a-43fd-ae8f-a43f5c5ec610",
        User: {
          id: "e8458b0b-2b9a-43fd-ae8f-a43f5c5ec610",
          name: "Rafhael Gaspar",
          email: "rafhael11@teste.com",
          phone: "(00) 0 0000-0000",
          occupation: "Aluno",
          avatar:
            "https://img.estadao.com.br/thumbs/640/resources/jpg/3/2/1656955836323.jpg",
          status: true,
          Vehicle: [
            {
              id: "42525cb7-bf35-471d-a2c9-0cbc69e66b19",
              avatar:
                "https://i.pinimg.com/564x/98/e5/91/98e591fb0cf22e3695d929298882a0ec.jpg",
              brand: "Nissan",
              model: "Sentra",
            },
          ],
        },
      },
      {
        id: "378a813a-332e-4940-95ef-4d0369b8cbcd",
        status: true,
        readed: true,
        id_user: "7b1367b8-f046-4647-9b44-d607a0a4f497",
        User: {
          id: "7b1367b8-f046-4647-9b44-d607a0a4f497",
          name: "Teste 23 Teste",
          email: "teste23@teste.com",
          occupation: "Aluno",
          phone: "(11) 1 1111-1111",
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Anime_Girl.png/1200px-Anime_Girl.png",
          status: true,
          Vehicle: [
            {
              id: "b4731b8e-01b4-4bd5-afac-0d6cb73210af",
              avatar:
                "https://staticc.sportskeeda.com/editor/2022/06/4da1c-16564430945521-1920.jpg",
              brand: "Volkswagen",
              model: "Gol",
            },
          ],
        },
      },
      {
        id: "37e1edb7-21ed-4fa0-a49a-4dcbd2cbc28a",
        status: false,
        readed: false,
        id_user: "67ab6914-fdd5-49f3-aa60-d32886ce0d1a",
        User: {
          id: "67ab6914-fdd5-49f3-aa60-d32886ce0d1a",
          name: "Teste 2 Teste",
          email: "teste@teste.com",
          occupation: "Aluno",
          phone: "(22) 2 2222-2222",
          avatar:
            "https://www.shutterstock.com/image-illustration/perfect-anime-image-be-used-600w-1968490054.jpg",
          status: false,
          Vehicle: [
            {
              id: "f327cf6c-ad47-40e3-9230-3bae32c0073d",
              avatar:
                "https://dk2dv4ezy246u.cloudfront.net/widgets/sLt1hQlkJkc_large.jpg",
              brand: "Chevrollet",
              model: "Cruise",
            },
          ],
        },
      },
    ],
    messageError: "Erro ao conectar-se ao banco de dados!",
    dialogConfirmStatusRequest: false,
    selectedItem: {
      User: {
        Vehicle: [{}],
      },
    },
    /* selectedItem: {
      id: "2610267b-1cfb-4ebf-9ff3-79e001d11164",
      status: true,
      readed: true,
      id_user: "e8458b0b-2b9a-43fd-ae8f-a43f5c5ec610",
      User: {
        id: "e8458b0b-2b9a-43fd-ae8f-a43f5c5ec610",
        name: "Rafhael Gaspar",
        email: "rafhael11@teste.com",
        phone: "(00) 0 0000-0000",
        occupation: "Aluno",
        avatar:
          "https://img.estadao.com.br/thumbs/640/resources/jpg/3/2/1656955836323.jpg",
        status: true,
        Vehicle: [
          {
            id: "42525cb7-bf35-471d-a2c9-0cbc69e66b19",
            avatar:
              "https://i.pinimg.com/564x/98/e5/91/98e591fb0cf22e3695d929298882a0ec.jpg",
            brand: "Nissan",
            model: "Sentra",
          },
        ],
      },
    }, */
    loading: false,
    erroAlert: false,
  }),
  methods: {
    async getAllRequisition() {
      this.loading = true;
      try {
        const res = await Requisition.getAllRequisitions();
        console.log(res);
        this.requisitions = res.data;
        this.loading = false;
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

    openDialoStatusRequest(item) {
      this.dialogConfirmStatusRequest = true;
      this.selectedItem = item;
    },
  },
  created() {
    //this.getAllRequisition();
  },
};
</script>
<style lang="scss" scoped>
.border {
  border: 1px solid red;
}

.v-input {
  font-size: 20px;
}

.v-input__slot {
  min-height: 40px;
}
</style>
