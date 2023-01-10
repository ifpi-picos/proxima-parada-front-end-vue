<!-- eslint-disable vue/no-unused-components -->
<template>
    <v-app>
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
        }
    },
}
</script>
  
<style>

</style>