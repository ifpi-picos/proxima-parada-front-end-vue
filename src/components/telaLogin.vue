<template>
    
    <div class="login">
        <h1>Faça o login</h1>
        
        <label >Email</label><br>
            <input type="text" placeholder="Email">
        <label for="">Senha
            <a href="#" target="_blank">Esqueceu sua senha </a>
        </label>
        <input  type="password" placeholder="Senha"> <br>
        <button type="button"   class=""> Entrar</button><br>
        <button type="button"   class="butaoCriarConta">Criar Conta</button>



    </div>
</template>

<script scoped>
    export default {
        name:"telaLogin"
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