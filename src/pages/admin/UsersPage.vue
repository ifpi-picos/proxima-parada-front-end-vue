<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="(user, i) in usuarios"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ user.nome }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ user.ocupacao }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="80">
              <img alt="user" :src="user.foto" />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn color="primary" rounded text> Exibir perfil completo </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    usuarios: [
      {
        nome: "Alberto Basrbosa",
        email: "alberto@barbosa.com",
        ocupacao: "Professor",
        foto: "https://randomuser.me/api/portraits/men/90.jpg",
      },
      {
        nome: "Aline Santos",
        email: "aline@santos.com",
        ocupacao: "Aluna",
        foto: "https://randomuser.me/api/portraits/women/82.jpg",
      },
      {
        nome: "Bruno Ferreira",
        email: "bruno@Ferreira.com",
        ocupacao: "Aluno",
        foto: "https://randomuser.me/api/portraits/men/89.jpg",
      },
      {
        nome: "Jaqueçine Cavalcante",
        email: "jaqueline@cavalcante.com",
        ocupacao: "Professora",
        foto: "https://randomuser.me/api/portraits/women/53.jpg",
      },
    ],
  }),
};
</script>
<style>
.card-user {
  min-width: 300px;
}

.border {
  border: 1px solid red;
}
</style>
