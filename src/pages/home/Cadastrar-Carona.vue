
<template>
  <v-container>
    <v-row justify="center" fluid class="pa-3">
      <v-progress-linear :active="loading" :indeterminate="loading" absolute top
        height="6">
      </v-progress-linear>

      <v-col cols="12" xm="8" sm="8" md="8" lg="10">
        <v-alert :value="alertError" color="red" elevation="3" outlined :type="alertType">{{ alertMessage }}</v-alert>
        <v-card max-width="450px" min-width="400px" class="mx-auto bg pt-10" elevation="2">
        <div>
          <v-card>
            <v-container>
              <v-row>
                <v-col cols="6" >
                  <v-card color="#385F73" dark class="cards" >
                    <v-card-title>
                      <h2>Nome do Usuario</h2>
                    </v-card-title>
                        <p>Status:Professor</p>
                        <p>status da Carona:</p>
                        <p>Quantidade de Vagas</p>
                        <p>Data:12:00 as 14/11/2022</p>
                        <p>Quantidade de Vagas : 3</p>
                      </v-card>
                      </v-col>
                      <v-col cols="6">
                          <v-card color="#385F73" dark class="cards" >
                              <v-card-title>
                                  <h2>Nome do Usuario</h2>
                                  </v-card-title>
                                  <p>Status:Professor</p>
                                  <p>status da Carona:</p>
                                  <p>Quantidade de Vagas</p>
                                  <p>Data:12:00 as 14/11/2022</p>
                                  <p>Quantidade de Vagas : 2</p>
                          </v-card>
                      </v-col>
                      <v-col cols="6">
                          <v-card color="#385F73" dark class="cards" >
                              <v-card-title>
                                  <h2>Nome do Usuario</h2>
                                  </v-card-title>
                                  <p>Status:Professor</p>
                                  <p>status da Carona:</p>
                                  <p>Quantidade de Vagas</p>
                                  <p>Data:12:00 as 14/11/2022</p>
                                  <p>Quantidade de Vagas : 1</p>
                          </v-card>
                      </v-col>
                      <v-col cols="6">
                          <v-card color="#385F73" dark class="cards" >
                              <v-card-title>
                                  <h2>Nome do Usuario</h2>
                            </v-card-title>
                                  <p>Status:Professor</p>
                                  <p>status da Carona:</p>
                                  <p>Quantidade de Vagas</p>
                                  <p>Data:12:00 as 14/11/2022</p>
                                  <p>Quantidade de Vagas : 4</p>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>   
        </div>

          
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-card-subtitle class="pa-0">
                  <b class="ml-2 text-h6">{{ userData.phone_number }}</b>
                </v-card-subtitle>
                <v-card-subtitle class="pa-0">
                  <b class="ml-2 text-h6">{{ userData.email }}</b>
                </v-card-subtitle>
              </v-col>
              <v-col cols="12" md="6">
                <v-card-subtitle v-if="userData.Vehicle[0].brand" class="pa-0">
                  <span class="card-subtitle"
                    ><b>Veículo:</b> {{ userData.Vehicle[0].brand }},
                    {{ userData.Vehicle[0].model }}</span
                  >
                </v-card-subtitle>

                
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions>
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-btn color="primary" block @click="dialog = true">
                  Cadastrar Carona
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
              
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="800px" scrollable>
        <v-col cols="12" xm="12" sm="16" md="16" lg="25">
          <v-card>
            <v-alert
              :value="alertSuccess"
              color="red"
              elevation="3"
              outlined
              :type="alertType"
              >{{ alertMessage }}</v-alert
            >
            <v-form @submit.prevent="auht" v-model="valid">
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
             
            </v-form>
          </v-card>
        </v-col>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import User from "../../services/user";
import Vehicle from "../../services/vehicle";
import Requisition from "../../services/requisition";

export default {
  data() {
    return {
      items: ["Aluno(a)", "Professor(a)", "Outro(a)"],
      userData: {
        Vehicle: [{ id_user: "", image: "", brand: "", model: "" }],
        Requisition: [{ id_user: "" }],
      },
      alertMessage: "Erro ao conectar-se ao banco de dados!",
      loading: false,
      updateLoading: false,
      newCarLoading: false,
      driverLoading: false,
      loader: null,
      alertError: false,
      alertSuccess: false,
      alertType: "",
      dialog: false,
      dialogCar: false,
      dialogDriver: false,
      show1: false,
      show2: false,
      show3: false,
      valid: false,
      rules: {
        required: (value) => !!value || "Obrigatório.",
        min: (value) => value.length >= 6 || "Mínimo 6 caracteres",
        minPhone: (value) => value.length >= 16 || "Mínimo 16 caracteres",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido.";
        },
        matchPassword: () =>
          this.userData.password === this.userData.samePasswords ||
          `Senhas diferentes`,
      },
    };
  },
  methods: {
    chooseImage() {
      document.getElementById("selectFile").click();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.userData.avatar = URL.createObjectURL(file);
    },
    chooseImageCar() {
      document.getElementById("selectFileCar").click();
    },
    onFileCarChange(e) {
      const file = e.target.files[0];
      this.userData.Vehicle[0].image = URL.createObjectURL(file);
    },

    async uploadImage() {},

    async saveChanges() {
      this.updateLoading = true;
      this.loader = this.updateLoading;
      try {
        const res = await User.updateUserData(this.userData);
        this.userData = res.data;
        this.showSuccesAlert(
          true,
          "Informações aletradas com Sucesso!!!",
          "warning"
        );
      } catch (error) {
        this.finishLoading();
        this.showErrorAlert(true, error.response.data.message, "warning");
        //console.log(response.data);
      }
    },

    async requestPositionDriver() {
      this.driverLoading = true;
      this.loader = this.driverLoading;
      try {
        const res = await Requisition.createNewRequisition({
          id: this.userData.id,
        });
        this.userData.Requisition[0] = res.data;
        sessionStorage.setItem("userLocal", JSON.stringify(this.userData));
        this.showSuccesAlert(
          true,
          "Requisição solicitada com Sucesso.",
          "warning"
        );
      } catch (error) {
        this.finishLoading();
        this.showErrorAlert(true, error.response.data.message, "warning");
      }
    },

    async newVehicle() {
      this.newCarLoading = true;
      this.loader = this.newCarLoading;
      this.userData.Vehicle[0].id_user = this.userData.id;
      try {
        const res = await Vehicle.createNewVehicle(this.userData.Vehicle[0]);
        this.userData.Vehicle[0] = res.data;
        sessionStorage.setItem("userLocal", JSON.stringify(this.userData));
        this.showSuccesAlert(
          true,
          "Veiculo cadastrado com Sucesso.",
          "warning"
        );
      } catch (error) {
        this.finishLoading();
        this.showErrorAlert(true, error.response.data.message, "warning");
        //console.log(response.data);
      }
    },

    finishLoading() {
      this.loader = null;
      this.dialog = false;
      this.dialogCar = false;
      this.dialogDriver = false;
      this.updateLoading = false;
      this.newCarLoading = false;
      this.loading = false;
    },
    showErrorAlert(status, message, type) {
      this.alertError = status;
      this.alertType = type;
      this.messageError = message;
    },

    showSuccesAlert(status, message, type) {
      this.alertSuccess = status;
      this.alertType = type;
      this.messageError = message;
      setTimeout(() => (this.alertSuccess = false), 3000);
      this.finishLoading();
      this.refresh();
    },

    refresh() {
      this.$router.go();
    },
  },
  created() {
    if (sessionStorage.getItem("userLocal")) {
      this.userData = JSON.parse(sessionStorage.getItem("userLocal"));
      //this.userData.Requisition[0].id_user = this.userData.id;
      if (!this.userData.Vehicle[0]) {
        this.userData.Vehicle[0] = {
          id: "",
          id_user: "",
          image: "",
          brand: "",
          model: "",
        };
      }
      if (!this.userData.Requisition[0]) {
        this.userData.Requisition[0] = {
          id: "",
          exist: true,
          status: false,
          readed: false,
        };
      }
      console.log("testand o user loca no Profile: ", this.userData);
    }
  },
  watch: {
    alertError(val) {
      if (!val) return;
      setTimeout(() => (this.alertError = false), 3000);
    },
  },
};
</script>
<style lang="css" scoped>
.border {
  border: 1px red solid;
}

.card-subtitle {
  font-size: 1.35em;
}

.card-result {
  font-size: 0.875rem;
  color: #ffffff;
  height: 36px;
  padding: 0 16px;

  align-items: center;
  letter-spacing: 0.0892857143em;
  justify-content: center;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}

.wmp {
  min-width: 100% !important;
  max-width: none;

  display: flex;
  flex: 1 0 auto;

  margin: 0;
  padding: 0;
}

.border1 {
  width: 95vw;
  height: 95vh;
  align-items: center;
}

.border4 {
  text-align: center;
  border: 2px solid rgba(63, 62, 62, 0.342);
  width: 85%;
  height: 85%;
  background: #fff;
  margin: auto;
}
h4 {
  text-align: center;
}
body {
  margin: 0;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>


<!-- <template> 
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
 
  -->