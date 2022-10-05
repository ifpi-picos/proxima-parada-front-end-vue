<template>
    <div class="login">
        <div class="box">
            <h1>Faça o login</h1>
            <small>E-mail</small> <br>
            <input type="text" placeholder="joãosilva@gmail.com">
            <br>
            <small>Senha</small> <br>
            <input type="password" placeholder="Digite sua senha">
            <br>
            <br>
            
            <button class="btn-login">Entrar</button> <br><br>
            <button class="btn-cadastrar">Entrar</button>

            <p> <a href="#" target="_blank">Você não possui conta </a> </p>

        </div>
       

    </div>
</template>

<script scoped>
    export default {
        name:"telaLogin",
    }  
</script>

 <style>
    .login {
        background:#d3d0d0;
        text-align: center;
        display: flex;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center

    }
    .box{
        width: 95%;
        height: 95%;
        background: #fff;
    }
   

    .btn-login{
        background-color:#027bff;
    }
    .btn-cadastrar{
        background-color: cadetblue;
   
    }

    
 </style>