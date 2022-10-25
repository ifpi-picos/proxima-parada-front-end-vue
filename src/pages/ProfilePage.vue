<template>

    <v-card>

        <v-card-text>
            <div class="imagem">
                <v-img src="../../src/assets/stite.jpg" class="img" />
                <figcaption> {{userData.name}}</figcaption>
            </div>
            <div class="status">
                <h3 >Ocupação no Campus: {{userData.occupation}} </h3>
                <h3>E-mail: {{userData.email}}</h3>
                <h3>status: {{userData.status}}</h3>
            </div> <br>

            <v-form  v-model="valid">
                <v-row>
                    <v-btn depressed color="primary" type="submit" width="100vw" font-size="45px"> Editar Perfil</v-btn>
                </v-row>
            </v-form>

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
    padding: 5px;
}

</style>