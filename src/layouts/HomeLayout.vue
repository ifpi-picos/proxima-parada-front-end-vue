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
              <v-list-item href="dashboard" :to="{ name: 'dashboard' }">
                <v-list-item-action>
                  <v-icon light>dashboard</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>DashBoard</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
  
            <template v-for="(item, index) in items">
              <v-list-item :href="item.href" :to="{ name: item.href }" :key="index">
                <v-list-item-action>
                  <v-icon light v-html="item.icon"></v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
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
        <v-btn icon to="/">
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
  
  
  export default {
    name: 'HomeView',
    data() {
      return {
        drawer: false,
        items: [{
          href: 'feed',
          title: 'Home',
          icon: 'home',
        }, {
          href: 'profile',
          title: 'Profile',
          icon: 'account_box',
        },],
      }
    },
    components: {
    }
  }
  </script>
  
  <style>
  
  </style>