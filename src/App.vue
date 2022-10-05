<template>
    <telaLogin/>
    <forms-usuario/>

</template>

<script>

import telaLogin from './components/telaLogin.vue'
import FormsUsuario from './components/formsUsuario.vue'

    export default{
        name:'App',
        components:{
            telaLogin,
            FormsUsuario,
                
        }

        
    }
</script>

<style scoped>
    


</style>
