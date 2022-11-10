<template>
  <v-container>
    <v-row justify="center" fluid class="pa-3">
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        top
        height="6"
      >
      </v-progress-linear>
      <v-col cols="12" xm="8" sm="8" md="8" lg="10">
        <v-alert
          :value="alertError"
          color="red"
          elevation="3"
          outlined
          :type="alertType"
          >{{ alertMessage }}</v-alert
        >
        <v-card
          max-width="450px"
          min-width="400px"
          class="mx-auto bg pt-10"
          elevation="2"
        >
          <v-row justify="center">
            <v-col
              align-self="start"
              class="d-flex justify-center align-center pa-0"
              cols="12"
            >
              <v-avatar size="165px" v-if="!userData.avatar">
                <v-img
                  src="https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
                />
              </v-avatar>
              <v-avatar size="165" v-else>
                <v-img v-if="userData.avatar" :src="userData.avatar" />
              </v-avatar>
            </v-col>
          </v-row>
          <v-list-item class="profile-text-name ml-2 pt-16">
            <v-list-item-content>
              <v-list-item-title class="text-h4">
                {{ userData.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-h6">{{
                userData.occupation
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-spacer></v-spacer>
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

                <v-card-subtitle v-if="!userData.Vehicle[0].brand" class="pa-0">
                  <span class="card-subtitle"
                    ><b>Veículo:</b> Nenhum veículo cadastrado</span
                  >
                </v-card-subtitle>
                <v-card-actions
                  v-if="userData.Vehicle[0].id == null"
                  class="pa-0 mt-2"
                >
                  <v-btn
                    v-if="userData.Requisition[0].exist"
                    color="primary"
                    block
                    @click="dialogDriver = true"
                  >
                    Oferecer caronas
                  </v-btn>

                  <v-card v-if="userData.Requisition[0].id" class="wmp">
                    <v-card-title
                      v-if="!userData.Requisition[0].readed"
                      class="card-result wmp warning"
                      block
                    >
                      Sual solicitação está em processamento.
                    </v-card-title>
                    <div v-if="userData.Requisition[0].readed" class="wmp">
                      <v-card-title
                        v-if="!userData.Requisition[0].status"
                        class="card-result wmp error"
                        block
                      >
                        Sual solicitação foi recusada.
                      </v-card-title>
                      <v-card-title
                        v-if="userData.Requisition[0].status"
                        class="card-result wmp success"
                        block
                      >
                        Voce já é um motorista.
                      </v-card-title>
                    </div>
                  </v-card>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>

          <v-card-actions>
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-btn color="primary" block @click="dialog = true">
                  Editar Perfil
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                  :disabled="userData.Vehicle[0].id == null"
                  color="primary"
                  block
                  outlined
                  @click="dialogCar = true"
                >
                  Cadastrar veiculo
                </v-btn>
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

              <!-- daqui pra baixo são as nova tela -->
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
  <!-- daqui pra baixo são as nova tela -->

             
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="mail_outline"
                      name="email"
                      label="E-mail"
                      type="text"
                      readonly
                      v-model="userData.email"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-btn
                      :loading="updateLoading"
                      :disabled="updateLoading"
                      color="primary"
                      block
                      type="submit"
                      @click="saveChanges"
                    >
                      Salvar
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn
                      color="primary"
                      outlined
                      block
                      @click="dialog = false"
                    >
                      Cancelar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container> -->
            </v-form>
          </v-card>
        </v-col>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialogCar" persistent max-width="800px" scrollable>
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
            <v-form @submit.prevent="car" v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-row class="pa-2" align="center" justify="center">
                      <v-avatar
                        tile
                        size="165px"
                        v-if="!userData.Vehicle[0].image"
                        class="grey"
                      >
                        <span>Escolha uma imagem</span>
                      </v-avatar>
                      <v-avatar tile size="165" v-else>
                        <v-img
                          v-if="userData.Vehicle[0].image"
                          :src="userData.Vehicle[0].image"
                        />
                      </v-avatar>
                    </v-row>
                    <v-row class="pa-2" align="center" justify="center">
                      <input
                        hidden
                        id="selectFileCar"
                        type="file"
                        @change="onFileCarChange"
                      />
                      <v-btn color="primary" @click="chooseImageCar()"
                        >Escolher Imagen</v-btn
                      >
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="7">
                    <v-text-field
                      name="brand"
                      label="Marca"
                      type="text"
                      :rules="[rules.required]"
                      v-model="userData.Vehicle[0].brand"
                    />

                    <v-text-field
                      name="model"
                      label="Modelo"
                      v-model="userData.Vehicle[0].model"
                      :rules="[rules.required]"
                    />
                  </v-col>
                </v-row>
              </v-container>

              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-btn
                      :loading="newCarLoading"
                      :disabled="newCarLoading"
                      color="primary"
                      block
                      type="submit"
                      @click="newVehicle"
                    >
                      Salvar
                    </v-btn>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-btn
                      color="primary"
                      outlined
                      block
                      @click="dialogCar = false"
                    >
                      Cancelar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </v-col>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialogDriver" max-width="290">
        <v-card>
          <v-alert
            :value="alertSuccess"
            color="red"
            elevation="3"
            outlined
            :type="alertType"
            >{{ alertMessage }}</v-alert
          >
          <v-card-title class="text-h5">
            Tem certeza de que desejá a posição de motorisa?
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="red darken-1" text @click="dialogDriver = false">
              Cancelar
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              :loading="driverLoading"
              :disabled="driverLoading"
              @click="requestPositionDriver"
            >
              Aceitar
            </v-btn>
          </v-card-actions>
        </v-card>
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
</script> -->
 
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

