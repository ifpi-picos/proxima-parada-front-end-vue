<!-- eslint-disable vue/no-unused-components -->
<template>
    <v-app>
        <v-main>
            <v-fade-transition mode="out-in">
                <AuthView></AuthView>
            </v-fade-transition>
        </v-main>
    </v-app>
</template>
<script>
import AuthView from '@/pages/auth/AuthView.vue';
export default {
    name: 'HomeView',
    data() {
        return {
        }
    },
    components: {
        AuthView
    }
}
</script>
  
<style>

</style>