<template>
    <div class="login">
        <h1>Login</h1>
        <input type="text" placeholder="E-mail">
        <br>
        <input type="password" placeholder=" Senha">
        <br>
        <div class="btn-login">
            <button>Login</button>
        </div>
        <p>Você não possui conta </p>

    </div>
</template>

<script scoped>
    export default {
        name:"telaLogin",
    }  
</script>

 <style>
    .container {
        background:#f2f2f2;
    
    }
    small{
        color: blue;
    }
    button{
        background-color:#027bff;

    }
    .butaoCriarConta{
        background-color: cadetblue;
    }

    
 </style>