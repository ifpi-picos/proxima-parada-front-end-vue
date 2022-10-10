<template>
    <div class="vue-tempalte">
        <form class="inner-block">
            <h3>Faça o login</h3>
            <div class="form-group">
                <label>E-mail</label>
                <input type="email" class="form-control form-control-lg"/>

            </div>

            <div class="form-group">
                <label>Senha</label>
                <input type="password" class="form-control form-control-lg"/>
            </div>
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Esqueceu sua senha ?</router-link>
            </p>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Entrar</button>

           

           
        </form>

    </div>
</template>

<script>

    export default {
        name:'TelaLogin',
        data() {
            return {}
        }
    }
</script>