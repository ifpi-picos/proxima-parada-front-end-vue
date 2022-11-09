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

          <v-text-field type="text" 
          label="Digite os numeros da placa de seu veículo" placeholder="xxx-xxxx"/>

          <h2> Frequência das caronas </h2>
          <v-container>
            <v-row>
              <v-col cols="12">
                
                <v-radio-group v-model="type" row >
                  <v-radio label="Regular" value="number"></v-radio>
                  <v-radio label="Não-Regular" value="selector"/>
                  
                </v-radio-group>
                <v-select :items="naoRegular" v-if="type === 'selector'" v-model="selector" label="Selecione os dia da Semana"/>  
                
                <v-select :items="regular"  v-if="type === 'number'" v-model="number" type="number"
                  label="selecione o dias Regulares da Semana ">
                </v-select>
                
              </v-col>
            </v-row>
          </v-container >
          <v-card-text>
            <h2>Quantidade de vagas Disponivel</h2>
            <v-select :items="vagas"></v-select>

          </v-card-text>
         
        </v-card-text>
          <v-divider class="mt-12"/>
          <v-card-actions>
            <v-btn text> Cancelar </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="submit"> Salvar Carona </v-btn>
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
      type: 'number',
      number: 0,
      test:'seletor',
      regular:['segunda','terça','Quarta','Quinta','sexta','Sábado','Domingo'],
      naoRegular:['segunda','terça','Quarta','Quinta','sexta'],
      vagas:[1,2,3,4,5]
    }),
    
  } 
</script>
<style>
h1{
  text-align: center;
}

</style>
 
