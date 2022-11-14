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
                {{ requisition.user.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-h5 mb-1">{{
                requisition.user.occupation
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="100" v-if="!requisition.user.avatar">
              <v-img
                src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
              />
            </v-list-item-avatar>
            <v-list-item-avatar v-else size="80">
              <v-img
                v-if="requisition.user.avatar"
                :src="requisition.user.avatar"
              />
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialogConfirmStatusRequest" max-width="800px">
        <v-card>
          <v-progress-linear
            :active="statusLoading"
            :indeterminate="statusLoading"
            absolute
            top
            height="6"
          ></v-progress-linear>
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
                          v-model="selectedItem.user.name"
                        />
                      </v-col>
                      <v-col cols="12" sm="4" md="4" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.user.occupation"
                        />
                      </v-col>
                    </v-row>
                    <v-row class="pa-0 ma-0">
                      <v-col cols="12" sm="7" md="7" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.user.email"
                        />
                      </v-col>
                      <v-col cols="12" sm="5" md="5" class="ma-0 pa-1">
                        <v-text-field
                          class="pa-0 ma-0"
                          outlined
                          readonly
                          v-model="selectedItem.user.phone_number"
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-container>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-container fill-height fluid class="pa-0">
                  <v-row justify="center">
                    <v-avatar size="204" v-if="!selectedItem.user.avatar">
                      <v-img
                        src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                      />
                    </v-avatar>
                    <v-avatar v-else size="156">
                      <v-img
                        v-if="selectedItem.user.avatar"
                        :src="selectedItem.user.avatar"
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
                          v-model="selectedItem.user.Vehicle[0].brand"
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          outlined
                          readonly
                          v-model="selectedItem.user.Vehicle[0].model"
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
                      v-if="!selectedItem.user.Vehicle[0].avatar"
                    >
                      <v-img
                        src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                      />
                    </v-avatar>
                    <v-avatar v-else size="204" tile>
                      <v-img
                        v-if="selectedItem.user.Vehicle[0].avatar"
                        :src="selectedItem.user.Vehicle[0].avatar"
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
                    @click="updateStatusRequest(false)"
                  >
                    Rejeitar
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-btn
                    color="success"
                    block
                    @click="updateStatusRequest(true)"
                  >
                    Aceitar
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
import Admin from "../../services/admin";
export default {
  data: () => ({
    requisitions: [],
    messageError: "Erro ao conectar-se ao banco de dados!",
    dialogConfirmStatusRequest: false,
    selectedItem: {
      user: {
        Vehicle: [{}],
      },
    },
    loading: false,
    statusLoading: false,
    erroAlert: false,
  }),
  methods: {
    async getAllStatusRequest() {
      this.loading = true;
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await Admin.getAllStatusRequest();
        console.log(res);
        this.requisitions = res.data;
        this.loading = false;
      } catch (error) {
        //const response = error.response;
        this.erroAlert = true;
        this.loading = false;
        this.messageError = error.response.data.message;

        console.log(error.response.data);
      }
    },

    async updateStatusRequest(status) {
      this.statusLoading = true;
      let data = {
        id: this.selectedItem.id,
        id_user: this.selectedItem.id_user,
        status: status,
      };
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await Admin.updateStatusRequest(data);
        console.log(res);
        this.statusLoading = false;
        this.$router.go();
      } catch (error) {
        //const response = error.response;
        this.statusLoading = false;
        this.messageError = error.response.data.message;
        console.log(error.response.data);
      }
    },

    openDialoStatusRequest(item) {
      this.dialogConfirmStatusRequest = true;
      this.selectedItem = item;
    },
  },
  created() {
    this.getAllStatusRequest();
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
