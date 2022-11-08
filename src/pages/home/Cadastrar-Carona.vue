<template> 
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">

        <v-card-text>
          <h1> Bem-Vindo Ao cadastro de Caronas </h1>
          <br><br>
          <h2>Informações Pessoais</h2>

          <v-text-field placeholder="João da silva" ref="name" v-model="name" 
          :rules="[() => !!name || 'Esse      Campo  e obrigatorio']"
          :error-messages="errorMessages" label="Nome Completo" required/>

          <v-text-field placeholder="(XX)XXXXX-XXXX" ref="number-phone" label="Numero para contato" type="number" 
          :rules="[() => !!name || 'Esse Campo e Obrigatorio']"/>
        </v-card-text>

        <v-card-text>   
          <h2>De onde estou Saindo</h2>
            
          <v-text-field ref="address" v-model="address"  :rules="[() => !!address || 'Esse Campo e Obrigatorio',]"
          label="Nome do Bairro" placeholder="Bairro Junco "/>

          <v-text-field ref="address"  :rules="[ () => !!address || 'Esse Campo e Obrigatorio',]"
          label="Nome da Rua " placeholder="Rua do pcc "/>

          <v-text-field label="Número da Casa " placeholder="288" type="number"/>

          <v-text-field v-model="time" 
          label="Digite o Dia Mes e Ano " placeholder=" 01/02/2022" type="date"/>

          <v-text-field v-model="time" 
          label="Digite a hora da Saída" placeholder=" 12:00" type="time"/>
        </v-card-text> 

        <v-card-text>
          <h2>Pra onde vou</h2>
          <v-text-field ref="address"  
          label="Digite o nome do Bairro " placeholder="Bairro pantanal"/>

          <v-text-field  
          label="Digite o nome da rua " placeholder="Qudra 04 "/>

          <v-text-field type="number"  
          label="Digite o numero da casa" placeholder=" 265 "/>

        </v-card-text>

        <v-card-text>
          <h2>Dados do Veiculos e Caracteristicas da Carona</h2>
          <v-select ref="veiculos" :items="veiculos" label="Selecione seu Veículos" />

          <v-text-field label="informe a Cor de Seu Veículo"/>

          <v-text-field type="text" 
          label="Digite os numeros da placa de seu veículo" placeholder="xxx-xxxx"/>

          <h2>Modalidade da carona</h2>
          <v-select ref="modalidade" :items="modalidade" placeholder="Selecione a Modalidade da Carona"/>
          <h2>Frequência da Carona</h2>
          <v-select ref="semanas" :items="dias" placeholder="Qual e a frequências dessa carona"/>
          <v-select :items="dias" multiple label="Selecione os dias da semana"/>
          <h2> Frequência das caronas </h2>
          <v-container>
            <v-row>
              <v-col cols="12">
                
                <v-radio-group v-model="type" row >
                <v-radio label="Regular" value="number"></v-radio>
                <v-radio label="Não-Regular" value="selector"/>
                
                </v-radio-group>
                <v-text-field v-if="type === 'selector'" v-model="selector" label="Selector"/>
               
                <v-select :items="naoRegular" multiple v-if="type === 'number'"
                  v-model="number"
                  type="number"
                  label="selecione os dia da semana">
                </v-select>
              </v-col>
            </v-row>
          </v-container>
         
        </v-card-text>
          <v-divider class="mt-12"/>
          <v-card-actions>
            <v-btn text> Cancelar </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue" text @click="submit"> Salvar Carona </v-btn>
          </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  
</template>

<script>
  export default {
    data: () => ({
      veiculos:['Moto','Carro'],
      modalidade:['Colaborativa','Não-Colaborativa'],
      frequencia:['Regular','Não-Regular'],
      dias:['Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','sexta-feira','Sábado','Domingo'],
      
      type: 'number',
      number: 9999,
      regular:['segunda','terça','Quarta','Quinta','sexta',
      'Sábado','Domingo'],
      naoRegular:['segunda','terça','Quarta','Quinta','sexta'],
    }),
    
  } 
</script>
 
 <!-- <template>
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

           <h2>Caracteristica do Veículo</h2>
            <v-container fluid>
                <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="12">
                        <v-select prepend-icon="send" :items="transport" label="Tipo de Veículo"/>
                    </v-col> 
                </v-row>
            </v-container>

          <v-text-field prepend-icon="send" name="name" label="Digite a placa do Veículo" type="text"/>
          <v-text-field prepend-icon="send" name="name" label="Digite a cor de seu transpote" type="text"/>
 
        </v-card> 
        <br>
        <v-card class="veiculo" color="#96b5bb5e" >

            <h2>Modalidade</h2>
            <v-container fluid>
                <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="12">
                        <v-select prepend-icon="send" :items="disponibilidade" label="Tipo da Carona"/>
                    </v-col> 
                </v-row>
                <h2>Frequência da Rotas</h2>
                    <v-col class="d-flex" cols="12" sm="12" >
                        <v-select prepend-icon="send" :items="frequenciaRotas" label="Frequência da Rota" /> 
                        <v-select prepend-icon="send" :items="diaSemanas"  label="Escolha os dias da semanas"/>
                        
                        
                    </v-col>
                <v-row>
                  
                </v-row>   
            </v-container>
        </v-card> <br>

        <v-container>
            <v-row align="center">
                <v-col cols="12" sm="12">
                <div class="text-center">
                    <div class="my-2">
                        <v-btn x-large color="primary" type="submit">Cadastrar Carona</v-btn>
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

    data: () => ({
    transport: ['Carro','Moto'],
    disponibilidade:['Colaborativa','Não-Colaborativa'],
    diaSemanas:['Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado','Domingo'],
    frequenciaRotas:['Regular','Não-Regular'],
    regular:true,
    naoregular:false

  }),
      
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
  
</style> -->

