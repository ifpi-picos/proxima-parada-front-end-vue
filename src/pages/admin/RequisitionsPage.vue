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
        v-for="(requesition, i) in requisitions"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ requesition.user.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                requesition.user.occupation
              }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{
                requesition.user.email
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="100" v-if="!requesition.user.avatar">
              <v-img
                src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
              />
            </v-list-item-avatar>
            <v-list-item-avatar v-else size="80">
              <v-img
                v-if="requesition.user.avatar"
                :src="requesition.user.avatar"
              />
            </v-list-item-avatar>
          </v-list-item>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Requisition from "../../services/requisition";
export default {
  data: () => ({
    requisitions: [],
    messageError: "Erro ao conectar-se ao banco de dados!",
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
  },
  created() {
    this.getAllRequisition();
  },
};
</script>
<style>
.card-users {
  min-width: 300px;
}

.border {
  border: 1px solid red;
}
</style>
