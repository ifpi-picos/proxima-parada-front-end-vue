<!-- eslint-disable vue/no-unused-components -->
<template>
  <v-app>
    <v-navigation-drawer class="primary" v-model="drawer" dark app temporary>
      <v-list>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <span>Menu</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <template>

            <v-list-item :to="{ name: 'feed' }">
              <v-list-item-action>
                <v-icon light>home</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item  :to="{ name: 'profile' }">
              <v-list-item-action>
                <v-icon light>account_box</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Perfil</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="userLocal.status" :to="{ name: 'ride' }">
              <v-list-item-action>
                <v-icon light>drive_eta</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Caronas</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            
            <v-list-item  :to="{ name: 'dashboard' }">
              <v-list-item-action>
                <v-icon light>dashboard</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Area do Admin</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="primary" dense dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Próxima Parada</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="signup">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
import Auth from "../services/auth";

export default {
  name: "HomeView",
  data() {
    return {
      drawer: false,
      userLocal: {
        status: true
      },
    };
  },
  methods: {
    async signout() {
      sessionStorage.removeItem("userLocal");
      this.$router.push({ name: "authMain" });
      /* try {
        const res = await Auth.logout();
        if (res.status == 200) {
          this.$router.push({ name: "authMain" });
        }
      } catch (error) {
        const response = error.response;
        if (response.data.message) {
          this.messageError = response.data.message;
        }
        this.$router.push({ name: "authMain" });
        console.log(response);
      } */
    },
    async resume() {
      try {
        const res = await Auth.resume();
        sessionStorage.setItem(
          "userLocal",
          JSON.stringify(res.data.userReturn)
        );
      } catch (error) {
        if (error.response.status == 400) {
          this.$router.push({ name: "authMain" });
        }
        const response = error.response;
        if (response.data.message) {
          this.messageError = response.data.message;
        }
        console.log(response);
      }
    },
  },
  components: {},
  created() {
    //this.resume();
    if (sessionStorage.getItem("userLocal")) {
      this.userLocal = JSON.parse(sessionStorage.getItem("userLocal"));
      //console.log("testand o user loca no HomeLayout: ", this.userLocal);
    }
  },
};
</script>

<style></style>
