 <template> 
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card ref="form">
          
          <v-card-text>
            <h1> Bem-Vindo Ao cadastro de Caronas </h1>
            <br><br>
            <h2>Informações Pessoais</h2>

            <v-text-field placeholder="João da silva" ref="name" v-model="name" :rules="[() => !!name || 'Esse Campo e obrigatorio']"
              :error-messages="errorMessages" label="Nome Completo" required/>

              <v-text-field placeholder="(XX)XXXXX-XXXX" ref="number-phone" label="Numero para contato" type="number" :rules="[() => !!name || 'Esse Campo e obrigatorio']"/>
            
              <h2>De onde estou Saindo</h2>
            
            <v-text-field ref="address" v-model="address"  :rules="[
                () => !!address || 'Esse Campo e obrigatorio',]"
                label="Informe o Bairro" placeholder="Bairro Junco "/>

                <v-text-field ref="address"  :rules="[ () => !!address || 'Esse Campo e obrigatorio',]"
                label="Informe a Rua " placeholder="Rua do pcc "/>

                <v-text-field label="Número da Casa " placeholder="288" type="number"/>

                <v-text-field v-model="time" 
                label="Informe Dia Mes e Ano " placeholder=" 01/02/2022" type="date"/>

                <v-text-field v-model="time" 
                label="Informe a Hora exata" placeholder=" 01/02/2022" type="time"/>
                <h2>Pra onde vou</h2>

                <v-text-field ref="address"  
                label="Informe o Bairro " placeholder="Rua do pcc "/>

                <v-text-field ref="address"  
                label="Informe o nome da rua " placeholder="Rua do pcc "/>

                <v-text-field ref="address"  
                label="Informe o numero da casa" placeholder="Rua do pcc "/>

                

            <v-text-field
              ref="state"
              v-model="state"
              :rules="[() => !!state || 'This field is required']"
              label="State/Province/Region"
              required
              placeholder="TX"
            ></v-text-field>
            <v-text-field
              ref="zip"
              v-model="zip"
              :rules="[() => !!zip || 'This field is required']"
              label="ZIP / Postal Code"
              required
              placeholder="79938"
            ></v-text-field>
            <v-autocomplete
              ref="country"
              v-model="country"
              :rules="[() => !!country || 'This field is required']"
              :items="countries"
              label="Country"
              placeholder="Select..."
              required
            ></v-autocomplete>
          </v-card-text>
          
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn text>
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-slide-x-reverse-transition>
              <v-tooltip
                v-if="formHasErrors"
                left
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="my-0"
                    v-bind="attrs"
                    @click="resetForm"
                    v-on="on"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </template>
                <span>Refresh form</span>
              </v-tooltip>
            </v-slide-x-reverse-transition>
            <v-btn
              color="primary"
              text
              @click="submit"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

 </template>

 <script>
 export default {
 data: () => ({
    errorMessages: '',
    name: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    country: null,
    formHasErrors: false,
    time:null
  }),

  computed: {
    form () {
      return {
        name: this.name,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
        country: this.country,
      }
    },
  },

  watch: {
    name () {
      this.errorMessages = ''
    },
  },

  methods: {
    addressCheck () {
      this.errorMessages = this.address && !this.name
        ? `Hey! I'm required`
        : ''

      return true
    },
    resetForm () {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    submit () {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })
    },
  },
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