<template>
    <v-card >
        <div class="title">
            <h2>Cadastramento de Caronas</h2>
        </div> 
        <v-card class="destino" color="#96b5bb5e">
           <h2>Informações Pessoais</h2>
           <v-text-field prepend-icon="mdi-map-marker" name="name" label="Digite seu nome Completo" type="text"/>
            <v-text-field prepend-icon="mdi-map-marker" name="name" label="Número para Contato" type="number"/>
            <v-text-field prepend-icon="home" name="name" label="Ocupação no Campus" type="text"/>
            
    
        </v-card> <br>

        <v-card class="origin" color="#96b5bb5e">
           <h2>Origem da Carona</h2>
            <v-text-field prepend-icon="mdi-map-marker" name="name" label="Bairro" type="text"/>
            <v-text-field prepend-icon="home" name="name" label="Nome da Rua" type="text"/>
            <v-text-field prepend-icon="home" name="name" label="Número/Casa" type="number"/>
            <v-text-field prepend-icon="event" name="name" label="Data da Saída" type="Date"/>
            <v-text-field prepend-icon="mdi-history" name="name" label="Horaria da Saída" type="Time"/>
         
        </v-card>  
        <br>
        <v-card class="destino" color="#96b5bb5e">
           <h2>Destino Da Carona</h2>
           <v-text-field prepend-icon="mdi-map-marker" name="name" label="Bairro" type="text"/>
            <v-text-field prepend-icon="mdi-map-marker" name="name" label="Nome da Rua" type="text"/>
            <v-text-field prepend-icon="home" name="name" label="Número/Casa" type="number"/>
    
        </v-card> 
        <br>
        
        <v-card class="veiculo" color="#96b5bb5e">
           <h2>Cadastrar Veículo</h2>
          <v-select prepend-icon="send" name="Qual é seu transport" label="Selecione seu veiculo" :items="items"/>
          <v-text-field  name="name" label="Digite a placa do Veículo" type="text"/>
        </v-card> 
        <br>

        <v-card class="veiculo" color="#96b5bb5e">
           <h2>Modalidade</h2>
          <v-select  :item="item"/>
        </v-card> 

        <v-container>
            <v-row align="center">
                <v-col cols="12" sm="12">
                <div class="text-center">
                    <div class="my-2">
                        <v-btn x-large color="primary">
                            Extra large Button
                        </v-btn>
                    </div>
                </div>
                </v-col>
            </v-row>
        </v-container>
     
    
    </v-card>

    
 
 
</template>

<script>

export default {
    name: "Cadastrar-Carona",
    data(){
        return {
            items:['Moto','Carro'],
            select:{'Colaborativa':'Não coloborativa'},
     
        }
        
    }
       
}
</script>

<style>
    
    .origin, .destino{
        width: 100px;
        text-align: center;
        border: 3px solid rgba(63, 62, 62, 0.438);
        width: 85%;
        height: 85%;
        background: #fff;
        margin: auto;
    }
    .veiculo{
        width: 200px;
        height: 300px;
        text-align: center;
        border: 3px solid rgba(63, 62, 62, 0.438);
        width: 85%;
        height: 85%;
        background: #fff;
        margin: auto;
    }
   
    .title {
        text-align: center;
        padding: 23px;
      
    }
    h2{
        font-family: 'Muli';
    }
    button{
        color:red
    }
    
</style>