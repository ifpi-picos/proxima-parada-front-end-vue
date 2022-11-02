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
        v-for="(user, i) in usuarios"
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
                {{ user.name }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ user.occupation }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="100" v-if="!user.avatar">
              <img
                src="https://lh3.googleusercontent.com/-Gvq8ieRFxvU/U-wQMDsuoJI/AAAAAAAADVs/-3qBKC1CFIQ/s250/Avatar7.png"
              />
            </v-list-item-avatar>
            <v-list-item-avatar v-else size="80">
              <v-img v-if="user.avatar" :src="user.avatar" />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn color="primary" text> Exibir perfil completo </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Admin from "../../services/admin";
export default {
  data: () => ({
    usuarios: [],
    messageError: "Erro ao conectar-se ao banco de dados!",
    loading: false,
    erroAlert: false,
  }),
  methods: {
    async getAllUsers() {
      this.loading = true;
      try {
        const res = await Admin.getAllUsers();
        if (res.status == 200) {
          console.log(res);
          this.loading = false;
          this.usuarios = res.data;
        }
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
    this.getAllUsers();
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
