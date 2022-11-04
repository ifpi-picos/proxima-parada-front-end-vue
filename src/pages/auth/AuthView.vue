<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs8 sm6 md4>
        <v-card>
          <v-tabs fixed-tabs background-color="primary">
            <v-tab> Entrar </v-tab>

            <v-tab> Registrar-se </v-tab>

            <v-tab-item>
              <template>
                <sign-in />
              </template>
            </v-tab-item>

            <v-tab-item>
              <template>
                <sign-up />
              </template>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";
export default {
  name: "Auth-main",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SignIn,
    SignUp,
  },
  data() {
    return {};
  },
};
</script>
<style>
.border {
  border: 2px solid red;
}
.flex.xs8, .flex.sm6, .flex.md4 {
    max-width: 400px;
    min-width: 360px;
}

</style>
