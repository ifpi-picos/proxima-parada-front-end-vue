<template>
    <v-container id="user-profile" fluid tag="section">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <base-material-card>
            <!-- <template v-slot:heading>
              <div class="display-2 font-weight-light">Edit Profile</div>
  
              <div class="subtitle-1 font-weight-light">
                Complete your profile
              </div>
            </template> -->
  
            <v-form>
              <v-container class="py-0">
                <v-row>
                  <!-- <v-col cols="12" md="4">
                    <v-text-field label="Company (disabled)" disabled />
                  </v-col>
   -->
                  <v-col cols="12" md="6" >
                    <v-text-field  label="Nome completo" class="purple-input"  />
                  </v-col>
  
                  <v-col cols="12" md="6">
                    <v-text-field label="Email" class="purple-input" />
                  </v-col>

                  <!-- <v-col cols="12" md="6">
                    <v-text-field label="Last Name" class="purple-input" />
                  </v-col> -->
  
                  <v-col cols="12">
                    <v-text-field label="Endereço" class="purple-input" />
                  </v-col>
  
                  <v-col cols="12" md="4">
                    <v-text-field label="Cidade" class="purple-input" />
                  </v-col>
  
                  <v-col cols="12" md="4">
                    <v-text-field label="Bairro" class="purple-input" />
                  </v-col>
  
                  <!-- <v-col cols="12" md="4">
                    <v-text-field class="purple-input" label="Postal Code" type="number"/>
                  </v-col> -->

                    
                  <v-col cols="12" md="6">
                    <v-text-field label="Senha Atual" class="purple-input" type="password" />
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field label="Nova Senha" class="purple-input" type="password" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Confirmar Nova Senha" class="purple-input" type="password" />
                  </v-col>
   
  
                  <!-- <v-col cols="12">
                    <v-textarea
                        class="purple-input" label="About Me" value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                      />
                  </v-col> -->

                 
                    
                </v-row>
                <v-row cols="12" class="text-right" >
                  <v-col cols="12" class="text-right">
                    <v-btn color="blue" class="mr-0"> Editar Perfil </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </base-material-card>
        </v-col>
  
        <v-col cols="12" md="4">
          <base-material-card
            class="v-card-profile"
            avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
          >
            <!-- <v-card-text class="text-center">
              <h6 class="display-1 mb-1 grey--text">CEO / CO-FOUNDER</h6>
  
              <h4 class="display-2 font-weight-light mb-3 black--text">
                Alec Thompson
              </h4>
  
              <p class="font-weight-light grey--text">
                Don't be scared of the truth because we need to restart the human
                foundation in truth And I love you like Kanye loves Kanye I love
                Rick Owens’ bed design but the back is...
              </p>
  
              <v-btn color="success" rounded class="mr-0"> Follow </v-btn>
            </v-card-text> -->
          </base-material-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script>
  export default {
    //justify-content: center
  };
</script>
<style>
  .purple-input{
    font-size: large;
  }
</style>
  
<!-- <template>

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
                    <v-btn depressed color="primary" type="submit" width="90%" font-size="45px" @click="editar()"> Editar Perfil</v-btn>
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
    },
    
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
</style> -->