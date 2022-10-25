<!-- eslint-disable vue/no-unused-components -->
<template>

  <v-app>
    <v-navigation-drawer class="primary" v-model="drawer" dark app temporary>
      <v-list>
        <v-list-item-group >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <span>Menu</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <div v-for="(item, index) in items"  :key="index" >
              <v-list-item :href="item.href" :to="{name: item.href}">
                <v-list-item-action>
                  <v-icon light v-html="item.icon"></v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>

          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="['AuthMain'].indexOf($route.name) === -1" class="primary" dense dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{nomeUsuario}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout()" icon >
        <v-icon>logout</v-icon>
      </v-btn >
    </v-app-bar>

    <v-main>

      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-main>
  </v-app>

</template>

<script>


export default {
  name: 'HomeView',
  data() {
    return {
      drawer: false,
      currentPage: "HomePage",
      items: [{
        href: 'home',
        title: 'Home',
        icon: 'home',
      }, {
        href: 'profile',
        title: 'Profile',
        icon: 'account_box',
      },],
    }
  },
  computed: {
    nomeUsuario(){
      if (this.$route.query.usuario) {
        return this.$route.query.usuario;
      }
      return ''
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('userData');
      this.$router.push('/')
    }

  },
}
  
</script>
<style>
</style>

<!-- <template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
  }),
};
</script> -->