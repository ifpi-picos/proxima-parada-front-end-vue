<template>
    <div class="login">
        <h1>Faça o login</h1>
        <small>E-mail</small> <br>
        <input type="text" placeholder="joãosilva@gmail.com">
        <br>
        <small>Senha</small> <br>
        <input type="password" placeholder="Digite sua senha">
        <br>
        <button class="btn-login">Entrar</button> <br>
        <button class="btn-cadastrar">Entrar</button>

        <p> <a href="#" target="_blank">Você não possui conta </a> </p>

    </div>
</template>

<script scoped>
    export default {
        name:"telaLogin",
    }  
</script>

 <style>
    .login {
        background:#f2f2f2;
        text-align: center;
    
    }
    
    button{
        background-color:#027bff;

    }
    .btn-cadastrar{
        background-color: cadetblue;
   
    }

    
 </style>