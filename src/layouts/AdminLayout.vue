<template>
    <v-app>
      <Sidebar />
      <Navbar />
      <Sidebar />
      <Navbar />
      <v-main>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-main>
    </v-app>
  </template>
    
  <script >
  
  import Navbar from '../components/navbar/NavbarAdmin.vue'
  import Sidebar from '../components/sidebar/SidebarAdmin.vue'
  
  export default {
    data() {
      return {
      }
    },
    components: {
      Navbar,
      Sidebar,
    }
  }
  </script>
  
  <style >
  
  </style>
    