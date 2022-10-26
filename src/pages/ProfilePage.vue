<template>

    <v-card class="container ">

        <v-card-text class="box">
            <div class="imagem">
                <v-img src="../../src/assets/stite.jpg" class="img" />
                <figcaption> {{userData.name}}</figcaption>
            </div>
            <div class="status">
                <p >Ocupação no Campus:  <strong>{{userData.occupation}}</strong> </p>
                <p>E-mail: <strong>{{userData.email}}</strong></p>
                <p>status: <strong>{{userData.status}}</strong> </p> <br>
                
                <v-form  v-model="valid">
                <v-row>
                    <v-btn depressed color="primary" type="submit" width="90%" font-size="45px"> Editar Perfil</v-btn>
                </v-row>
            </v-form>
            </div> <br>

         

        </v-card-text>
    </v-card>
</template>
<script>

export default {
    name: "ProfileEscreen",
    data(){
        return{
            userData:{}
        }
    },
    created(){
        
        this.userData = JSON.parse(localStorage.getItem('userData')) 
    }
}
</script>

<style scoped>
    .img {
        border-radius: 50%;
        border: 2px solid rgba(0, 0, 0, 0.575);
        width: 150px;
        display: block;
        margin-left: auto;
        margin-right: auto;

    }
    figcaption{
        text-align: center;
        font-size: 18px;
        padding: 15px;
    }
    .container {
        width: 400px;
        height: 500px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .box {
        width: 300px;
        height: 400px;
        background: #fff;
    }
    p{
    
        font-size: 18px;
    }
</style>